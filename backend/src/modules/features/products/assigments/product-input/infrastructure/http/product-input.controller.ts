import type { ProductInputCreateDto, ProductInputResponseDto, ProductInputUpdateDto } from "../../application/dto/product-input.model.schema";
import { GetProductInputByIdUseCase } from "../../application/use-cases/get-product-input-by-id.usecase";
import { CreateProductInputUseCase } from "../../application/use-cases/create-product-input.usecase";
import { UpdateProductInputUseCase } from "../../application/use-cases/update-product-input.usecase";
import { GetAllProductInputUseCase } from "../../application/use-cases/get-all-product-input.usecase";
import { DeleteProductInputUseCase } from "../../application/use-cases/delete-product-input.usecase";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductInputRepository } from "../repository/product-input.repository";
import {
    CreateProductInputSchema, DeleteProductInputSchema,
    GetAllProductInputsSchema, GetByIdProductInputSchema,
    UpdateProductInputSchema
} from "../../application/dto/product-input.endpoint.schema"

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

export class ProductInputController {

    private readonly repo: ProductInputRepository;
    private readonly getAllUseCase: GetAllProductInputUseCase;
    private readonly getByIdUseCase: GetProductInputByIdUseCase;
    private readonly createUseCase: CreateProductInputUseCase;
    private readonly updateUseCase: UpdateProductInputUseCase;
    private readonly deleteUseCase: DeleteProductInputUseCase;

    constructor() {
        this.repo = new ProductInputRepository();
        this.getAllUseCase = new GetAllProductInputUseCase(this.repo);
        this.getByIdUseCase = new GetProductInputByIdUseCase(this.repo);
        this.createUseCase = new CreateProductInputUseCase(this.repo);
        this.updateUseCase = new UpdateProductInputUseCase(this.repo);
        this.deleteUseCase = new DeleteProductInputUseCase(this.repo);
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req: ApiRequest<GetAllProductInputsSchema>, res: ApiResponse<GetAllProductInputsSchema>) => {
        const result: ProductInputResponseDto[] = await this.getAllUseCase.execute();
        return res.status(200).send(result);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdProductInputSchema>, res: ApiResponse<GetByIdProductInputSchema>) => {
        const { id }: GetByIdProductInputSchema["params"] = req.params
        const result: ProductInputResponseDto | null = await this.getByIdUseCase.execute(id);
        if (!result) return res.status(204).send(null);
        return res.status(200).send(result);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateProductInputSchema>, res: ApiResponse<CreateProductInputSchema>) => {
        const body: ProductInputCreateDto = req.body;
        const created: ProductInputResponseDto = await this.createUseCase.execute(body);
        return res.status(201).send(created);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateProductInputSchema>, res: ApiResponse<UpdateProductInputSchema>) => {
        const { id }: UpdateProductInputSchema["params"] = req.params;
        const body: ProductInputUpdateDto = req.body;
        const updated: ProductInputResponseDto = await this.updateUseCase.execute(id, body);
        return res.status(200).send(updated);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteProductInputSchema>, res: ApiResponse<DeleteProductInputSchema>) => {
        const { id }: DeleteProductInputSchema["params"] = req.params;
        await this.deleteUseCase.execute(id);
        return res.status(201).send(null);
    };
}


export default ProductInputController;
