import type { ApiRequest, ApiResponse } from "../../../../../shared/typed-request-endpoint/typed-request.interface";
import type { CreateLocationSchema, DeleteLocationSchema, GetAllLocationsSchema, GetByCustomIdLocationSchema, GetByIdLocationSchema, GetByNameLocationSchema, UpdateLocationSchema } from "../../application/dto/location.endpoint.schema";
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
export declare class LocationController {
    private readonly repo;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly getByNameUseCase;
    private readonly getByCustomIdUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor();
    /** Formatea un Location para convertir fechas a ISO */
    private formatResponse;
    getAll: (req: ApiRequest<GetAllLocationsSchema>, res: ApiResponse<GetAllLocationsSchema>) => Promise<ApiResponse<GetAllLocationsSchema>>;
    getById: (req: ApiRequest<GetByIdLocationSchema>, res: ApiResponse<GetByIdLocationSchema>) => Promise<ApiResponse<GetByIdLocationSchema>>;
    getByName: (req: ApiRequest<GetByNameLocationSchema>, res: ApiResponse<GetByNameLocationSchema>) => Promise<ApiResponse<GetByNameLocationSchema>>;
    getByCustomId: (req: ApiRequest<GetByCustomIdLocationSchema>, res: ApiResponse<GetByCustomIdLocationSchema>) => Promise<ApiResponse<GetByCustomIdLocationSchema>>;
    create: (req: ApiRequest<CreateLocationSchema>, res: ApiResponse<CreateLocationSchema>) => Promise<ApiResponse<CreateLocationSchema>>;
    update: (req: ApiRequest<UpdateLocationSchema>, res: ApiResponse<UpdateLocationSchema>) => Promise<ApiResponse<UpdateLocationSchema>>;
    delete: (req: ApiRequest<DeleteLocationSchema>, res: ApiResponse<DeleteLocationSchema>) => Promise<ApiResponse<DeleteLocationSchema>>;
}
