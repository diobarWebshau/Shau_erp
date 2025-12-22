import type { ProductDiscountRangeCreateDto, ProductDiscountRangeResponseDto, ProductDiscountRangeUpdateDto } from "../../application/dto/product-discount-range.model.schema";
import { GetProductDiscountRangeByProductUseCase } from "../../application/use-cases/get-product-discount-range-by-product.usecase";
import { CreateProductDiscountRangeUseCase } from "../../application/use-cases/create-product-discount-range.usecase";
import { UpdateProductDiscountRangeUseCase } from "../../application/use-cases/update-product-discount-range.usecase";
import { GetProductDiscountRangeByIdUseCase } from "../../application/use-cases/get-product-discount-range-by-id.usecase";
import { GetAllProductDiscountRangeUseCase } from "../../application/use-cases/get-all-product-discount-range.usecase";
import { DeleteProductDiscountRangeUseCase } from "../../application/use-cases/delete-product-discount-range.usecase";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductDiscountRangeRepository } from "../repository/product-discount-range.repository";
import {
    CreateProductDiscountRangeSchema, DeleteProductDiscountRangeSchema,
    GetAllProductDiscountRangesSchema, GetByIdProductDiscountRangeSchema,
    UpdateProductDiscountRangeSchema, GetByProductIdProductDiscountRangeSchema
} from "../../application/dto/product_discount-range.endpoint.schema"
import { ProductDiscountRangeProps } from "../../domain/product-discount-range.types";
import { ProductRepository } from "@src/modules/core/product/infrastructure/repository/producto.repository";

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
 *   de forma coherente hacia clientes externos.
 */

export class ProductDiscountRangeController {

    private readonly repo: ProductDiscountRangeRepository;
    private readonly repoProduct: ProductRepository;
    private readonly getAllUseCase: GetAllProductDiscountRangeUseCase;
    private readonly getByIdUseCase: GetProductDiscountRangeByIdUseCase;
    private readonly createUseCase: CreateProductDiscountRangeUseCase;
    private readonly updateUseCase: UpdateProductDiscountRangeUseCase;
    private readonly deleteUseCase: DeleteProductDiscountRangeUseCase;
    private readonly getByProductUseCase: GetProductDiscountRangeByProductUseCase

    constructor() {
        this.repo = new ProductDiscountRangeRepository();
        this.repoProduct = new ProductRepository();
        this.getAllUseCase = new GetAllProductDiscountRangeUseCase(this.repo);
        this.getByIdUseCase = new GetProductDiscountRangeByIdUseCase(this.repo);
        this.createUseCase = new CreateProductDiscountRangeUseCase(this.repo, this.repoProduct);
        this.updateUseCase = new UpdateProductDiscountRangeUseCase(this.repo);
        this.deleteUseCase = new DeleteProductDiscountRangeUseCase(this.repo);
        this.getByProductUseCase = new GetProductDiscountRangeByProductUseCase(this.repo);
    };

    /** Formatea un Location para convertir fechas a ISO */
    private async formatResponse(productDiscountRange: ProductDiscountRangeProps): Promise<ProductDiscountRangeResponseDto> {
        return {
            ...productDiscountRange,
            created_at: productDiscountRange.created_at.toISOString(),
            updated_at: productDiscountRange.updated_at.toISOString()
        };
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req: ApiRequest<GetAllProductDiscountRangesSchema>, res: ApiResponse<GetAllProductDiscountRangesSchema>) => {
        const result: ProductDiscountRangeProps[] = await this.getAllUseCase.execute();
        const formatted: ProductDiscountRangeResponseDto[] = await Promise.all(
            result.map(p => this.formatResponse(p))
        );
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET all discount of the product
    // ============================================================

    getByProductId = async (req: ApiRequest<GetByProductIdProductDiscountRangeSchema>, res: ApiResponse<GetByProductIdProductDiscountRangeSchema>) => {
        const { product_id }: GetByProductIdProductDiscountRangeSchema["params"] = req.params
        const result: ProductDiscountRangeProps[] = await this.getByProductUseCase.execute(Number(product_id));
        const formatted: ProductDiscountRangeResponseDto[] = await Promise.all(
            result.map(p => this.formatResponse(p))
        );
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdProductDiscountRangeSchema>, res: ApiResponse<GetByIdProductDiscountRangeSchema>) => {
        const { id }: GetByIdProductDiscountRangeSchema["params"] = req.params
        const result: ProductDiscountRangeProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: ProductDiscountRangeResponseDto = await this.formatResponse(result);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateProductDiscountRangeSchema>, res: ApiResponse<CreateProductDiscountRangeSchema>) => {
        const body: ProductDiscountRangeCreateDto = req.body;
        const created: ProductDiscountRangeProps = await this.createUseCase.execute(body);
        const formatted: ProductDiscountRangeResponseDto = await this.formatResponse(created);
        return res.status(201).send(formatted);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateProductDiscountRangeSchema>, res: ApiResponse<UpdateProductDiscountRangeSchema>) => {
        const { id }: UpdateProductDiscountRangeSchema["params"] = req.params;
        const body: ProductDiscountRangeUpdateDto = req.body;
        const updated: ProductDiscountRangeProps = await this.updateUseCase.execute(Number(id), body);
        const formatted: ProductDiscountRangeResponseDto = await this.formatResponse(updated);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteProductDiscountRangeSchema>, res: ApiResponse<DeleteProductDiscountRangeSchema>) => {
        const { id }: DeleteProductDiscountRangeSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
}


export default ProductDiscountRangeController;
