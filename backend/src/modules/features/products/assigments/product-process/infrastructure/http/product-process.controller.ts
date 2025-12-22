import type { ProductProcessCreateDto, ProductProcessResponseDto, ProductProcessUpdateDto } from "../../application/dto/product-process.model.schema";
import { GetProductProcessByIdProductProcessUseCase } from "../../application/use-cases/get-product-process-by-id-product-process.usecase";
import { GetProductProcessByIdUseCase } from "../../application/use-cases/get-product-process-by-id.usecase";
import { GetAllProductProcessUseCase } from "../../application/use-cases/get-all-product-process.usecase";
import { CreateProductProcessUseCase } from "../../application/use-cases/create-product-process.usecase";
import { UpdateProductProcessUseCase } from "../../application/use-cases/update-product-process.usecase";
import { DeleteProductProcessUseCase } from "../../application/use-cases/delete-product-process.usecase";
import { ProductRepository } from "@modules/core/product/infrastructure/repository/producto.repository";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import ProcessRepository from "@modules/core/process/infrastructure/repository/process.repository";
import { ProductProcessRepository } from "../repository/product-process.repository";
import {
    CreateProductProcessSchema, DeleteProductProcessSchema,
    GetAllProductProcesssSchema, GetByIdProductProcessSchema,
    UpdateProductProcessSchema, GetByIdProductProcessProductProcesSchema
} from "../../application/dto/product-process.endpoint.schema"

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

export class ProductProcessController {

    private readonly repo: ProductProcessRepository;
    private readonly repoProduct: ProductRepository;
    private readonly repoProcess: ProcessRepository;
    private readonly getAllUseCase: GetAllProductProcessUseCase;
    private readonly getByIdUseCase: GetProductProcessByIdUseCase;
    private readonly getByIdProductProcessUseCase: GetProductProcessByIdProductProcessUseCase;
    private readonly createUseCase: CreateProductProcessUseCase;
    private readonly updateUseCase: UpdateProductProcessUseCase;
    private readonly deleteUseCase: DeleteProductProcessUseCase;

    constructor() {
        this.repo = new ProductProcessRepository();
        this.repoProduct = new ProductRepository();
        this.repoProcess = new ProcessRepository();
        this.getByIdProductProcessUseCase = new GetProductProcessByIdProductProcessUseCase(this.repo);
        this.getAllUseCase = new GetAllProductProcessUseCase(this.repo);
        this.getByIdUseCase = new GetProductProcessByIdUseCase(this.repo);
        this.createUseCase = new CreateProductProcessUseCase(this.repo, this.repoProduct, this.repoProcess);
        this.updateUseCase = new UpdateProductProcessUseCase(this.repo);
        this.deleteUseCase = new DeleteProductProcessUseCase(this.repo);
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req: ApiRequest<GetAllProductProcesssSchema>, res: ApiResponse<GetAllProductProcesssSchema>) => {
        const result: ProductProcessResponseDto[] = await this.getAllUseCase.execute();
        return res.status(200).send(result);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdProductProcessSchema>, res: ApiResponse<GetByIdProductProcessSchema>) => {
        const { id }: GetByIdProductProcessSchema["params"] = req.params
        const result: ProductProcessResponseDto | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        return res.status(200).send(result);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getByIdProductProcess = async (req: ApiRequest<GetByIdProductProcessProductProcesSchema>, res: ApiResponse<GetByIdProductProcessProductProcesSchema>) => {
        const { process_id, product_id }: GetByIdProductProcessProductProcesSchema["params"] = req.params
        const result: ProductProcessResponseDto | null = await this.getByIdProductProcessUseCase.execute(Number(product_id), Number(process_id));
        if (!result) return res.status(204).send(null);
        return res.status(200).send(result);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateProductProcessSchema>, res: ApiResponse<CreateProductProcessSchema>) => {
        const body: ProductProcessCreateDto = req.body;
        const created: ProductProcessResponseDto = await this.createUseCase.execute(body);
        return res.status(201).send(created);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateProductProcessSchema>, res: ApiResponse<UpdateProductProcessSchema>) => {
        const { id }: UpdateProductProcessSchema["params"] = req.params;
        const body: ProductProcessUpdateDto = req.body;
        const updated: ProductProcessResponseDto = await this.updateUseCase.execute(Number(id), body);
        return res.status(200).send(updated);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteProductProcessSchema>, res: ApiResponse<DeleteProductProcessSchema>) => {
        const { id }: DeleteProductProcessSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
}


export default ProductProcessController;
