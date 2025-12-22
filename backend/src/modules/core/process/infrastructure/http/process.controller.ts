// src/modules/Process/infrastructure/http/Process.controller.ts
import { GetProcessByNameUseCase } from "../../application/use-cases/get-process-by-name.usecase";
import { GetProcessByIdUseCase } from "../../application/use-cases/get-process-by-id.usecase";
import { GetAllProcessesUseCase } from "../../application/use-cases/get-all-processes.usecase";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateProcessUseCase } from "../../application/use-cases/create-process.usecase";
import { UpdateProcessUseCase } from "../../application/use-cases/update-process.usecase";
import { DeleteProcessUseCase } from "../../application/use-cases/delete-process.usecase";
import type { ProcessResponseDto } from "../../application/dto/process.model.schema";
import ProcessRepository from "../repository/process.repository";
import { ProcessProps, ProcessSearchCriteria } from "../../domain/process.types";
import type {
    GetAllProcessesSchema, CreateProcessSchema, DeleteProcessSchema,
    GetByIdProcessSchema, GetByNameProcessSchema, UpdateProcessSchema
} from "../../application/dto/process.endpoint.schema"
import { mapProcessQueryToCriteria } from "./process-query-mapper";

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

export class ProcessController {

    private readonly repo: ProcessRepository;
    private readonly getAllUseCase: GetAllProcessesUseCase;
    private readonly getByIdUseCase: GetProcessByIdUseCase;
    private readonly getByNameUseCase: GetProcessByNameUseCase;
    private readonly createUseCase: CreateProcessUseCase;
    private readonly updateUseCase: UpdateProcessUseCase;
    private readonly deleteUseCase: DeleteProcessUseCase;

    constructor() {
        this.repo = new ProcessRepository();
        this.getAllUseCase = new GetAllProcessesUseCase(this.repo);
        this.getByIdUseCase = new GetProcessByIdUseCase(this.repo);
        this.getByNameUseCase = new GetProcessByNameUseCase(this.repo);
        this.createUseCase = new CreateProcessUseCase(this.repo);
        this.updateUseCase = new UpdateProcessUseCase(this.repo);
        this.deleteUseCase = new DeleteProcessUseCase(this.repo);
    }


    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================

    /** Formatea un Process para convertir fechas a ISO */
    private formatResponse(Process: ProcessProps): ProcessResponseDto {
        return {
            ...Process,
            created_at: Process.created_at.toISOString(),
            updated_at: Process.updated_at.toISOString()
        };
    }

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req: ApiRequest<GetAllProcessesSchema>, res: ApiResponse<GetAllProcessesSchema>) => {
        const queryRequest: GetAllProcessesSchema["query"] = req.query;
        const query: ProcessSearchCriteria = mapProcessQueryToCriteria(queryRequest);
        const result: ProcessProps[] = await this.getAllUseCase.execute(query);
        const formatted: ProcessResponseDto[] = result.map(l => this.formatResponse(l));
        return res.status(200).send(formatted);
    };


    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdProcessSchema>, res: ApiResponse<GetByIdProcessSchema>) => {
        const { id }: GetByIdProcessSchema["params"] = req.params;
        const result: ProcessProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: ProcessResponseDto = this.formatResponse(result);
        return res.status(200).send(formatted);
    };



    // ============================================================
    // GET BY NAME
    // ============================================================
    getByName = async (req: ApiRequest<GetByNameProcessSchema>, res: ApiResponse<GetByNameProcessSchema>) => {
        const { name }: GetByNameProcessSchema["params"] = req.params;
        const result: ProcessProps | null = await this.getByNameUseCase.execute(name);
        if (!result) return res.status(204).send(null);
        return res.status(200).send(this.formatResponse(result));
    };


    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateProcessSchema>, res: ApiResponse<CreateProcessSchema>) => {
        const body: CreateProcessSchema["body"] = req.body;
        const created: ProcessProps | null = await this.createUseCase.execute(body);
        const formatted: ProcessResponseDto = this.formatResponse(created);
        return res.status(201).send(formatted);
    };


    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateProcessSchema>, res: ApiResponse<UpdateProcessSchema>) => {
        const { id }: UpdateProcessSchema["params"] = req.params;
        const body: UpdateProcessSchema["body"] = req.body;
        const updated: ProcessProps | null = await this.updateUseCase.execute(Number(id), body);
        const formatted: ProcessResponseDto = this.formatResponse(updated);
        return res.status(200).send(formatted);
    };


    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteProcessSchema>, res: ApiResponse<DeleteProcessSchema>) => {
        const { id }: DeleteProcessSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(204).send(null);
    };
}
