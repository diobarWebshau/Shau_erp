// src/modules/location/infrastructure/http/location.controller.ts
import { GetLocationTypeByNameUseCase } from "../../application/use-cases/get-location-type-by-name.usecase";
import { GetLocationTypeByIdUseCase } from "../../application/use-cases/get-location-type-by-id.usecase";
import { GetAllLocationTypesUseCase } from "../../application/use-cases/get-all-location-type.usecase";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateLocationTypeUseCase } from "../../application/use-cases/create-location-type.usecase";
import { UpdateLocationTypeUseCase } from "../../application/use-cases/update-location-type.usecase";
import { DeleteLocationTypeUseCase } from "../../application/use-cases/delete-location-type.usecase";
import type { LocationTypeResponseDto } from "../../application/dto/location-type.model.schema";
import LocationRepository from "../repository/location-type.repository";
import { LocationTypeProps } from "../../domain/location-type.types";
import type {
    GetAllLocationTypeSchema, CreateLocationTypeSchema, DeleteLocationTypeSchema,
    GetByIdLocationTypeSchema, GetByNameLocationTypeSchema, UpdateLocationTypeSchema
} from "./../../application/dto/location-type.endpoint.schema"

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

export class LocationTypeController {

    private readonly repo: LocationRepository;
    private readonly getAllUseCase: GetAllLocationTypesUseCase;
    private readonly getByIdUseCase: GetLocationTypeByIdUseCase;
    private readonly getByNameUseCase: GetLocationTypeByNameUseCase;
    private readonly createUseCase: CreateLocationTypeUseCase;
    private readonly updateUseCase: UpdateLocationTypeUseCase;
    private readonly deleteUseCase: DeleteLocationTypeUseCase;

    constructor() {
        this.repo = new LocationRepository();
        this.getAllUseCase = new GetAllLocationTypesUseCase(this.repo);
        this.getByIdUseCase = new GetLocationTypeByIdUseCase(this.repo);
        this.getByNameUseCase = new GetLocationTypeByNameUseCase(this.repo);
        this.createUseCase = new CreateLocationTypeUseCase(this.repo);
        this.updateUseCase = new UpdateLocationTypeUseCase(this.repo);
        this.deleteUseCase = new DeleteLocationTypeUseCase(this.repo);
    }


    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================

    /** Formatea un Location para convertir fechas a ISO */
    private formatResponse(location: LocationTypeProps): LocationTypeResponseDto {
        return {
            ...location,
            created_at: location.created_at.toISOString(),
            updated_at: location.updated_at.toISOString()
        };
    }

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req: ApiRequest<GetAllLocationTypeSchema>, res: ApiResponse<GetAllLocationTypeSchema>) => {
        const result: LocationTypeProps[] = await this.getAllUseCase.execute();
        const formatted: LocationTypeResponseDto[] = result.map(l => this.formatResponse(l));
        return res.status(200).send(formatted);
    };


    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdLocationTypeSchema>, res: ApiResponse<GetByIdLocationTypeSchema>) => {
        const { id }: GetByIdLocationTypeSchema["params"] = req.params;
        const result: LocationTypeProps | null = await this.getByIdUseCase.execute(id);
        if (!result) return res.status(204).send(null);
        const formatted: LocationTypeResponseDto = this.formatResponse(result);
        return res.status(200).send(formatted);
    };



    // ============================================================
    // GET BY NAME
    // ============================================================
    getByName = async (req: ApiRequest<GetByNameLocationTypeSchema>, res: ApiResponse<GetByNameLocationTypeSchema>) => {
        const { name }: GetByNameLocationTypeSchema["params"] = req.params;
        const result: LocationTypeProps | null = await this.getByNameUseCase.execute(name);
        if (!result) return res.status(204).send(null);
        return res.status(200).send(this.formatResponse(result));
    };


    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateLocationTypeSchema>, res: ApiResponse<CreateLocationTypeSchema>) => {
        const body: CreateLocationTypeSchema["body"] = req.body;
        const created: LocationTypeProps | null = await this.createUseCase.execute(body);
        const formatted: LocationTypeResponseDto = this.formatResponse(created);
        return res.status(201).send(formatted);
    };


    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateLocationTypeSchema>, res: ApiResponse<UpdateLocationTypeSchema>) => {
        const { id }: UpdateLocationTypeSchema["params"] = req.params;
        const body: UpdateLocationTypeSchema["body"] = req.body;
        const updated: LocationTypeProps | null = await this.updateUseCase.execute(id, body);
        const formatted: LocationTypeResponseDto = this.formatResponse(updated);
        return res.status(200).send(formatted);
    };


    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteLocationTypeSchema>, res: ApiResponse<DeleteLocationTypeSchema>) => {
        const { id }: DeleteLocationTypeSchema["params"] = req.params;
        await this.deleteUseCase.execute(id);
        return res.status(204).send(null);
    };
}
