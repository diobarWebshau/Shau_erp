import type { ProductInputProcessCreateDto, ProductInputProcessResponseDto, ProductInputProcessUpdateDto } from "../../application/dto/product-input-process.model.schema";
import { GetByIdProductInputProcessByIdUseCase } from "../../application/use-cases/get-by-id-product-input-process.usecase";
import { ProductProcessRepository } from "../../../product-process/infrastructure/repository/product-process.repository";
import { CreateProductInputProcessUseCase } from "../../application/use-cases/create-product-input-process.usecase";
import { UpdateProductInputProcessUseCase } from "../../application/use-cases/update-product-input-process.usecase";
import { GetAllProductInputProcessUseCase } from "../../application/use-cases/get-all-product-input-process.usecase";
import { GetProductInputProcessByIdUseCase } from "../../application/use-cases/get-by-product-input-process.usecase";
import { DeleteProductInputProcessUseCase } from "../../application/use-cases/delete-product-input-process.usecase";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductInputProcessRepository } from "../repository/product-input-process.repository";
import {
    CreateProductInputProcessSchema, DeleteProductInputProcessSchema,
    GetAllProductInputProcessSchema, GetByIdProductInputProcessSchema,
    UpdateProductInputProcessSchema, GetByProductInputProcessSchema,
} from "../../application/dto/product-input-process.endpoint.schema"
import { ProductRepository } from "@src/modules/core/product/infrastructure/repository/producto.repository";
import { ProductInputRepository } from "../../../product-input/infrastructure/repository/product-input.repository";

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

export class ProductInputProcessController {

    private readonly repo: ProductInputProcessRepository;
    private readonly repoProduct: ProductRepository;
    private readonly repoProductInput: ProductInputRepository;
    private readonly repoProductProcess: ProductProcessRepository;
    private readonly getAllUseCase: GetAllProductInputProcessUseCase;
    private readonly getByIdUseCase: GetByIdProductInputProcessByIdUseCase;
    private readonly getByProductInputProcessId: GetProductInputProcessByIdUseCase;
    private readonly createUseCase: CreateProductInputProcessUseCase;
    private readonly updateUseCase: UpdateProductInputProcessUseCase;
    private readonly deleteUseCase: DeleteProductInputProcessUseCase;

    constructor() {
        this.repo = new ProductInputProcessRepository();
        this.repoProduct = new ProductRepository();
        this.repoProductInput = new ProductInputRepository();
        this.repoProductProcess = new ProductProcessRepository();
        this.getAllUseCase = new GetAllProductInputProcessUseCase(this.repo);
        this.getByProductInputProcessId = new GetProductInputProcessByIdUseCase(this.repo);
        this.getByIdUseCase = new GetByIdProductInputProcessByIdUseCase(this.repo);
        this.createUseCase = new CreateProductInputProcessUseCase(this.repo, this.repoProduct, this.repoProductInput, this.repoProductProcess);
        this.updateUseCase = new UpdateProductInputProcessUseCase(this.repo);
        this.deleteUseCase = new DeleteProductInputProcessUseCase(this.repo);
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req: ApiRequest<GetAllProductInputProcessSchema>, res: ApiResponse<GetAllProductInputProcessSchema>) => {
        const result: ProductInputProcessResponseDto[] = await this.getAllUseCase.execute();
        return res.status(200).send(result);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdProductInputProcessSchema>, res: ApiResponse<GetByIdProductInputProcessSchema>) => {
        const { id }: GetByIdProductInputProcessSchema["params"] = req.params;
        const result: ProductInputProcessResponseDto | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        return res.status(200).send(result);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getByProductInputProcess = async (req: ApiRequest<GetByProductInputProcessSchema>, res: ApiResponse<GetByProductInputProcessSchema>) => {
        const { product_id, product_input_id, product_process_id }: GetByProductInputProcessSchema["params"] = req.params;
        const result: ProductInputProcessResponseDto | null =
            await this.getByProductInputProcessId.execute(Number(product_id), Number(product_input_id), Number(product_process_id));
        if (!result) return res.status(204).send(null);
        return res.status(200).send(result);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateProductInputProcessSchema>, res: ApiResponse<CreateProductInputProcessSchema>) => {
        const body: ProductInputProcessCreateDto = req.body;
        const created: ProductInputProcessResponseDto = await this.createUseCase.execute(body);
        return res.status(201).send(created);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateProductInputProcessSchema>, res: ApiResponse<UpdateProductInputProcessSchema>) => {
        const { id }: UpdateProductInputProcessSchema["params"] = req.params;
        const body: ProductInputProcessUpdateDto = req.body;
        const updated: ProductInputProcessResponseDto = await this.updateUseCase.execute(Number(id), body);
        return res.status(200).send(updated);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteProductInputProcessSchema>, res: ApiResponse<DeleteProductInputProcessSchema>) => {
        const { id }: DeleteProductInputProcessSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
}


export default ProductInputProcessController;
