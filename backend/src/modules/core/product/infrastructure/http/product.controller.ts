import { GetProductByCustomIdUseCase } from "../../application/use-cases/get-product-by-custom-id.usecase";
import { GetProductByBarcodeUseCase } from "../../application/use-cases/get-product-by-barcode.usecase";
import { GetProductBySkuIdUseCase } from "../../application/use-cases/get-product-by-sku.usecase";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { GetProductByIdUseCase } from "../../application/use-cases/get-product-by-id.usecase";
import { GetProductByNameCase } from "../../application/use-cases/get-product-by-name.usecase";
import { GetAllProductsUseCase } from "../../application/use-cases/get-all-product.usecase";
import { CreateProductUseCase } from "../../application/use-cases/create-product.usecase";
import { DeleteProductUseCase } from "../../application/use-cases/delete-product.usecase";
import { UpdateProductUseCase } from "../../application/use-cases/update-product.usecase";
import { LocalFileCleanupService } from "@shared/files/local-file-cleanup.service";
import { ProductResponseDto } from "../../application/dto/product.model.schema";
import { ProductRepository } from "../repository/producto.repository";
import { ProductProps } from "../../domain/product.types"
import {
    DeleteProductSchema, GetAllProductsSchema, GetByBarcodeProductSchema,
    GetByCustomIdProductSchema, GetByIdProductSchema, CreateProductSchema,
    GetByNameProductSchema, GetBySkuProductSchema, UpdateProductSchema
} from "../../application/dto/product.endpoint.schema";
import ImageHandler from "@helpers/imageHandlerClass";

/**
 * Controller (Infrastructure / HTTP)
 * ------------------------------------------------------------------
 * Define un controlador HTTP tipado que actúa como adaptador entre
 * el mundo externo (Express, HTTP requests/responses) y la aplicación.
 * Su propósito es recibir peticiones, extraer parámetros, ejecutar
 * casos de uso y devolver respuestas formateadas, manteniendo la
 * separación entre dominio e infraestructura.
 *
 * Diferencia con otras capas:
 * - Entity: representa conceptos del negocio con identidad, reglas e invariantes.
 * - UseCase: encapsula operaciones del sistema aplicando reglas de negocio.
 * - Repository: implementa acceso a datos y persistencia.
 * - Controller: orquesta casos de uso en respuesta a peticiones externas,
 *   pero no contiene lógica de negocio ni persistencia.
 *
 * Responsabilidades técnicas:
 * - Recibir y tipar requests mediante `ApiRequest` y `ApiResponse`.
 * - Invocar casos de uso (`GetAll`, `GetById`, `Create`, `Update`, `Delete`).
 * - Formatear respuestas (ej. convertir fechas a ISO).
 * - Manejar respuestas estándar (200 OK, 201 Created, 204 No Content).
 * - Encapsular lógica repetida en helpers privados para mantener el código limpio.
 *
 * Qué hace:
 * - Controla el flujo de entrada/salida de la aplicación vía HTTP.
 * - Orquesta casos de uso y devuelve DTOs formateados.
 * - Asegura tipado estricto en endpoints mediante schemas.
 * - Centraliza lógica repetida como formateo de fechas y manejo de "no found".
 *
 * Qué no hace:
 * - No representa entidades del dominio ni objetos de negocio.
 * - No contiene reglas de negocio ni invariantes.
 * - No implementa persistencia ni interactúa directamente con infraestructura.
 * - No sustituye a los casos de uso; su rol es coordinar su ejecución.
 *
 * Convención de nombres:
 * - Se nombra con el sufijo `Controller` porque su responsabilidad es
 *   controlar el flujo de entrada/salida HTTP. A diferencia de las `Entity`,
 *   que modelan conceptos del negocio, los `Controller` son adaptadores
 *   externos que conectan la aplicación con el mundo exterior.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: entidades y casos de uso.
 * - Features: repositorios y servicios de infraestructura.
 * - Controller: capa de infraestructura HTTP que recibe requests y
 *   orquesta casos de uso.
 * - Orchestrators: pueden agrupar controladores y exponer endpoints
 *   de forma coherente hacia productes externos.
 */

/** Formatea un Location para convertir fechas a ISO */
const mapProductDomainToDto = async (product: ProductProps): Promise<ProductResponseDto> => {
    return {
        ...product,
        photo: product.photo ? await ImageHandler.convertToBase64(product.photo) : null,
        sale_price: product.sale_price ? product.sale_price?.toString() : null,
        production_cost: product.production_cost ? product.production_cost?.toString() : null,
        created_at: product.created_at.toISOString(),
        updated_at: product.updated_at.toISOString()
    };
};

export class ProductController {

    private readonly repo: ProductRepository;
    private readonly fileCleanup: LocalFileCleanupService;
    private readonly getAllUseCase: GetAllProductsUseCase;
    private readonly getByIdUseCase: GetProductByIdUseCase;
    private readonly getByNameUseCase: GetProductByNameCase;
    private readonly getByBarcodeUseCase: GetProductByBarcodeUseCase;
    private readonly getBySkuUseCase: GetProductBySkuIdUseCase;
    private readonly getByCustomIdUseCase: GetProductByCustomIdUseCase;
    private readonly createUseCase: CreateProductUseCase;
    private readonly updateUseCase: UpdateProductUseCase;
    private readonly deleteUseCase: DeleteProductUseCase;

    constructor() {
        this.repo = new ProductRepository();
        this.fileCleanup = new LocalFileCleanupService();

        this.getAllUseCase = new GetAllProductsUseCase(this.repo);
        this.getByIdUseCase = new GetProductByIdUseCase(this.repo);
        this.getByNameUseCase = new GetProductByNameCase(this.repo);
        this.getByBarcodeUseCase = new GetProductByBarcodeUseCase(this.repo);
        this.getBySkuUseCase = new GetProductBySkuIdUseCase(this.repo);
        this.getByCustomIdUseCase = new GetProductByCustomIdUseCase(this.repo);
        this.createUseCase = new CreateProductUseCase(this.repo);
        this.updateUseCase = new UpdateProductUseCase(this.repo);
        this.deleteUseCase = new DeleteProductUseCase(
            this.repo,
            this.fileCleanup
        );
    }

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req: ApiRequest<GetAllProductsSchema>, res: ApiResponse<GetAllProductsSchema>) => {
        const query: GetAllProductsSchema["query"] = req.query;
        const result: ProductProps[] = await this.getAllUseCase.execute(query)
        const formatted: ProductResponseDto[] = await Promise.all(
            result.map(p => mapProductDomainToDto(p))
        );
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdProductSchema>, res: ApiResponse<GetByIdProductSchema>) => {
        const { id }: GetByIdProductSchema["params"] = req.params;
        const result: ProductProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: ProductResponseDto = await mapProductDomainToDto(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY CustomID
    // ============================================================
    getByCustomId = async (req: ApiRequest<GetByCustomIdProductSchema>, res: ApiResponse<GetByCustomIdProductSchema>) => {
        const { custom_id }: GetByCustomIdProductSchema["params"] = req.params
        const result: ProductProps | null = await this.getByCustomIdUseCase.execute(custom_id);
        if (!result) return res.status(204).send(null);
        const formatted: ProductResponseDto = await mapProductDomainToDto(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY SKU
    // ============================================================
    getBySku = async (req: ApiRequest<GetBySkuProductSchema>, res: ApiResponse<GetBySkuProductSchema>) => {
        const { sku }: GetBySkuProductSchema["params"] = req.params
        const result: ProductProps | null = await this.getBySkuUseCase.execute(sku);
        if (!result) return res.status(204).send(null);
        const formatted: ProductResponseDto = await mapProductDomainToDto(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY NAME
    // ============================================================
    getByName = async (req: ApiRequest<GetByNameProductSchema>, res: ApiResponse<GetByNameProductSchema>) => {
        const { name }: GetByNameProductSchema["params"] = req.params
        const result: ProductProps | null = await this.getByNameUseCase.execute(name);
        if (!result) return res.status(204).send(null);
        const formatted: ProductResponseDto = await mapProductDomainToDto(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY NAME
    // ============================================================
    getByBarcode = async (req: ApiRequest<GetByBarcodeProductSchema>, res: ApiResponse<GetByBarcodeProductSchema>) => {
        const { barcode }: GetByBarcodeProductSchema["params"] = req.params
        const result: ProductProps | null = await this.getByBarcodeUseCase.execute(Number(barcode));
        if (!result) return res.status(204).send(null);
        const formatted: ProductResponseDto = await mapProductDomainToDto(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // CREATE
    // ============================================================
    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateProductSchema>, res: ApiResponse<CreateProductSchema>) => {
        const body: CreateProductSchema["body"] = req.body;
        try {
            const created: ProductProps = await this.createUseCase.execute(body);
            const formatted: ProductResponseDto = await mapProductDomainToDto(created);
            return res.status(201).send(formatted);
        } catch (error) {
            // 🧹 LIMPIEZA DE IMAGEN TEMPORAL SI FALLA EL CREATE
            // Esto cubre:
            // - validaciones de negocio
            // - errores de repositorio
            // - errores antes de mover la imagen
            if (body?.photo) {
                try { await ImageHandler.removeImageIfExists(body.photo); }
                catch { /* silencio intencional (best-effort cleanup)*/ }
            }
            throw error; // dejar que el middleware global maneje la respuesta
        }
    };
    // ============================================================
    // UPDATE (BODY-DRIVEN IMAGE MOVE — FINAL DEFINITIVO)
    // ============================================================
    update = async (
        req: ApiRequest<UpdateProductSchema>,
        res: ApiResponse<UpdateProductSchema>
    ) => {
        const { id }: UpdateProductSchema["params"] = req.params;

        // ⛔ Clonar body para no mutar req.body
        const body: UpdateProductSchema["body"] = { ...req.body };

        let tmpPhotoPath: string | undefined;
        let finalPhotoPath: string | undefined;
        let previousPhotoPath: string | null = null;

        try {
            // -----------------------------------------------------------
            // 1️⃣ OBTENER FOTO ACTUAL (ANTES DE MODIFICAR NADA)
            // -----------------------------------------------------------
            const existing = await this.repo.findById(Number(id));
            if (!existing) {
                throw new Error("Product not found"); // normalmente nunca pasa aquí
            }

            previousPhotoPath = existing.photo ?? null;

            // -----------------------------------------------------------
            // 2️⃣ DETECTAR IMAGEN TEMPORAL DESDE BODY
            // -----------------------------------------------------------
            if (body.photo && body.photo.startsWith("products/tmp/")) {
                tmpPhotoPath = body.photo;
                delete body.photo; // ⛔ nunca guardar tmp en BD
            }

            // -----------------------------------------------------------
            // 3️⃣ UPDATE DE NEGOCIO (SIN IMAGEN)
            // -----------------------------------------------------------
            const updated: ProductProps = await this.updateUseCase.execute(Number(id), body);

            // -----------------------------------------------------------
            // 4️⃣ MOVER IMAGEN + UPDATE TÉCNICO DE PHOTO
            // -----------------------------------------------------------
            if (tmpPhotoPath) {
                finalPhotoPath =
                    await ImageHandler.moveImageToEntityDirectory(
                        tmpPhotoPath,
                        "products",
                        id.toString()
                    );

                await this.repo.update(Number(id), {
                    photo: finalPhotoPath,
                });

                // -------------------------------------------------------
                // 5️⃣ BORRAR IMAGEN ANTERIOR (POST-COMMIT REAL)
                // -------------------------------------------------------
                if (
                    previousPhotoPath &&
                    previousPhotoPath !== finalPhotoPath
                ) {
                    await ImageHandler.removeImageIfExists(previousPhotoPath);
                }
            }

            // -----------------------------------------------------------
            // 6️⃣ RESPUESTA
            // -----------------------------------------------------------
            const formatted: ProductResponseDto =
                await mapProductDomainToDto({
                    ...updated,
                    ...(finalPhotoPath ? { photo: finalPhotoPath } : {}),
                });

            return res.status(200).send(formatted);

        } catch (error) {
            // -----------------------------------------------------------
            // 🧹 CLEANUP TMP SI FALLA
            // -----------------------------------------------------------
            if (tmpPhotoPath) {
                try {
                    await ImageHandler.removeImageIfExists(tmpPhotoPath);
                } catch {
                    /* best-effort cleanup */
                }
            }
            throw error;
        }
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteProductSchema>, res: ApiResponse<DeleteProductSchema>) => {
        const { id }: DeleteProductSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
};