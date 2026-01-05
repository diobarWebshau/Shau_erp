import type { LocationCreateDto, LocationResponseDto, LocationUpdateDto } from "../../application/dto/location.model.schema";
import { GetLocationByCustomIdUseCase } from "../../application/use-cases/get-location-by-custom-id.usecase";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { GetLocationByNameUseCase } from "../../application/use-cases/get-location-by-name.usecase";
import { GetLocationByIdUseCase } from "../../application/use-cases/get-location-by-id.usecase";
import { GetAllLocationsUseCase } from "../../application/use-cases/get-all-locations.usecase";
import { mapLocationQueryToCriteria } from "../../infrastructure/http/location-query-mapper";
import { CreateLocationUseCase } from "../../application/use-cases/create-location.usecase";
import { UpdateLocationUseCase } from "../../application/use-cases/update-location.usecase";
import { DeleteLocationUseCase } from "../../application/use-cases/delete-location.usecase";
import { LocationProps, LocationSearchCriteria } from "../../domain/location.types";
import { LocationRepository } from "../repository/location.repository";
import type {
    CreateLocationSchema, DeleteLocationSchema, GetAllLocationsSchema,
    GetByCustomIdLocationSchema, GetByIdLocationSchema,
    GetByNameLocationSchema, UpdateLocationSchema
} from "../../application/dto/location.endpoint.schema";

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

export class LocationController {

    private readonly repo: LocationRepository;
    private readonly getAllUseCase: GetAllLocationsUseCase;
    private readonly getByIdUseCase: GetLocationByIdUseCase;
    private readonly getByNameUseCase: GetLocationByNameUseCase;
    private readonly getByCustomIdUseCase: GetLocationByCustomIdUseCase;
    private readonly createUseCase: CreateLocationUseCase;
    private readonly updateUseCase: UpdateLocationUseCase;
    private readonly deleteUseCase: DeleteLocationUseCase;


    constructor() {
        this.repo = new LocationRepository();
        this.getAllUseCase = new GetAllLocationsUseCase(this.repo);
        this.getByIdUseCase = new GetLocationByIdUseCase(this.repo);
        this.getByNameUseCase = new GetLocationByNameUseCase(this.repo);
        this.getByCustomIdUseCase = new GetLocationByCustomIdUseCase(this.repo);
        this.createUseCase = new CreateLocationUseCase(this.repo);
        this.updateUseCase = new UpdateLocationUseCase(this.repo);
        this.deleteUseCase = new DeleteLocationUseCase(this.repo);
    };

    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================

    /** Formatea un Location para convertir fechas a ISO */
    private formatResponse(location: LocationProps): LocationResponseDto {
        return {
            ...location,
            created_at: location.created_at.toISOString(),
            updated_at: location.updated_at.toISOString()
        };
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req: ApiRequest<GetAllLocationsSchema>, res: ApiResponse<GetAllLocationsSchema>) => {
        const queryRequest: GetAllLocationsSchema["query"] = req.query;
        const query: LocationSearchCriteria =  mapLocationQueryToCriteria(queryRequest);
        const result: LocationProps[] = await this.getAllUseCase.execute(query);
        const formatted: LocationResponseDto[] = result.map(l => this.formatResponse(l));
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdLocationSchema>, res: ApiResponse<GetByIdLocationSchema>) => {
        const { id }: GetByIdLocationSchema["params"] = req.params
        const result: LocationProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: LocationResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY NAME
    // ============================================================
    getByName = async (req: ApiRequest<GetByNameLocationSchema>, res: ApiResponse<GetByNameLocationSchema>) => {
        const { name }: GetByNameLocationSchema["params"] = req.params
        const result: LocationProps | null = await this.getByNameUseCase.execute(name);
        if (!result) return res.status(204).send(null);
        const formatted: LocationResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY CUSTOM ID
    // ============================================================
    getByCustomId = async (req: ApiRequest<GetByCustomIdLocationSchema>, res: ApiResponse<GetByCustomIdLocationSchema>) => {
        const { custom_id }: GetByCustomIdLocationSchema["params"] = req.params
        const result: LocationProps | null = await this.getByCustomIdUseCase.execute(custom_id);
        if (!result) return res.status(204).send(null);
        const formatted: LocationResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateLocationSchema>, res: ApiResponse<CreateLocationSchema>) => {
        const body: LocationCreateDto = req.body;
        const created: LocationProps = await this.createUseCase.execute(body);
        const formatted: LocationResponseDto = this.formatResponse(created);
        return res.status(201).send(formatted);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateLocationSchema>, res: ApiResponse<UpdateLocationSchema>) => {
        const { id }: UpdateLocationSchema["params"] = req.params;
        const body: LocationUpdateDto = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        const formatted: LocationResponseDto = this.formatResponse(updated);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteLocationSchema>, res: ApiResponse<DeleteLocationSchema>) => {
        const { id }: DeleteLocationSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
};