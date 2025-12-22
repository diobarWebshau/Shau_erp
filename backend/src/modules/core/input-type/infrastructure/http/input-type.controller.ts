import { GetInputTypeByNameUseCase } from "../../application/use-cases/get-input-type-by-name.usecase";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { GetInputTypeByIdUseCase } from "../../application/use-cases/get-input-type-by-id.usecase";
import { GetAllInputTypesUseCase } from "../../application/use-cases/get-all-input-type.usecase";
import { CreateInputTypeUseCase } from "../../application/use-cases/create-input-type.usecase";
import { UpdateInputTypeUseCase } from "../../application/use-cases/update-input-type.usecase";
import { DeleteInputTypeUseCase } from "../../application/use-cases/delete-input-type.usecase";
import type { InputTypeResponseDto } from "../../application/dto/input-type.model.schema";
import InputRepository from "../repository/input-type.repository";
import { InputTypeProps } from "../../domain/input-type.types";
import type {
    GetAllinputTypeSchema, CreateinputTypeSchema, DeleteinputTypeSchema,
    GetByIdinputTypeSchema, GetByNameinputTypeSchema, UpdateinputTypeSchema
} from "../../application/dto/input-type.endpoint.schema"

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

export class InputTypeController {

    private readonly repo: InputRepository;
    private readonly getAllUseCase: GetAllInputTypesUseCase;
    private readonly getByIdUseCase: GetInputTypeByIdUseCase;
    private readonly getByNameUseCase: GetInputTypeByNameUseCase;
    private readonly createUseCase: CreateInputTypeUseCase;
    private readonly updateUseCase: UpdateInputTypeUseCase;
    private readonly deleteUseCase: DeleteInputTypeUseCase;

    constructor() {
        this.repo = new InputRepository();
        this.getAllUseCase = new GetAllInputTypesUseCase(this.repo);
        this.getByIdUseCase = new GetInputTypeByIdUseCase(this.repo);
        this.getByNameUseCase = new GetInputTypeByNameUseCase(this.repo);
        this.createUseCase = new CreateInputTypeUseCase(this.repo);
        this.updateUseCase = new UpdateInputTypeUseCase(this.repo);
        this.deleteUseCase = new DeleteInputTypeUseCase(this.repo);
    }

    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================

    /** Formatea un Input para convertir fechas a ISO */
    private formatResponse(Input: InputTypeProps): InputTypeResponseDto {
        return {
            ...Input,
            created_at: Input.created_at.toISOString(),
            updated_at: Input.updated_at.toISOString()
        };
    }

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req: ApiRequest<GetAllinputTypeSchema>, res: ApiResponse<GetAllinputTypeSchema>) => {
        const result: InputTypeProps[] = await this.getAllUseCase.execute();
        const formatted: InputTypeResponseDto[] = result.map(l => this.formatResponse(l));
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdinputTypeSchema>, res: ApiResponse<GetByIdinputTypeSchema>) => {
        const { id }: GetByIdinputTypeSchema["params"] = req.params;
        const result: InputTypeProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: InputTypeResponseDto = this.formatResponse(result);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY NAME
    // ============================================================
    getByName = async (req: ApiRequest<GetByNameinputTypeSchema>, res: ApiResponse<GetByNameinputTypeSchema>) => {
        const { name }: GetByNameinputTypeSchema["params"] = req.params;
        const result: InputTypeProps | null = await this.getByNameUseCase.execute(name);
        if (!result) return res.status(204).send(null);
        return res.status(200).send(this.formatResponse(result));
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateinputTypeSchema>, res: ApiResponse<CreateinputTypeSchema>) => {
        const body: CreateinputTypeSchema["body"] = req.body;
        const created: InputTypeProps | null = await this.createUseCase.execute(body);
        const formatted: InputTypeResponseDto = this.formatResponse(created);
        return res.status(201).send(formatted);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateinputTypeSchema>, res: ApiResponse<UpdateinputTypeSchema>) => {
        const { id }: UpdateinputTypeSchema["params"] = req.params;
        const body: UpdateinputTypeSchema["body"] = req.body;
        const updated: InputTypeProps | null = await this.updateUseCase.execute(Number(id), body);
        const formatted: InputTypeResponseDto = this.formatResponse(updated);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteinputTypeSchema>, res: ApiResponse<DeleteinputTypeSchema>) => {
        const { id }: DeleteinputTypeSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(204).send(null);
    };
}
