import { GetByCfdiClientSchema, GetByCompanyNameClientSchema, GetByIdClientSchema } from "../../application/dto/client.endpoint.schema";
import { ApiRequest, ApiResponse } from "../../../../../shared/typed-request-endpoint/typed-request.interface";
import { GetAllClientsSchema, CreateClientSchema, UpdateClientSchema, DeleteClientSchema } from "../../application/dto/client.endpoint.schema";
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
export declare class ClientController {
    private readonly repo;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly getByCfdiUseCase;
    private readonly getByCompanyNameUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor();
    /** Formatea un Location para convertir fechas a ISO */
    private formatResponse;
    getAll: (req: ApiRequest<GetAllClientsSchema>, res: ApiResponse<GetAllClientsSchema>) => Promise<ApiResponse<GetAllClientsSchema>>;
    getById: (req: ApiRequest<GetByIdClientSchema>, res: ApiResponse<GetByIdClientSchema>) => Promise<ApiResponse<GetByIdClientSchema>>;
    getByCfdi: (req: ApiRequest<GetByIdClientSchema>, res: ApiResponse<GetByIdClientSchema>) => Promise<ApiResponse<GetByIdClientSchema>>;
    getByCFDI: (req: ApiRequest<GetByCfdiClientSchema>, res: ApiResponse<GetByIdClientSchema>) => Promise<ApiResponse<GetByIdClientSchema>>;
    getByCompanyName: (req: ApiRequest<GetByCompanyNameClientSchema>, res: ApiResponse<GetByCompanyNameClientSchema>) => Promise<ApiResponse<GetByCompanyNameClientSchema>>;
    create: (req: ApiRequest<CreateClientSchema>, res: ApiResponse<CreateClientSchema>) => Promise<ApiResponse<CreateClientSchema>>;
    update: (req: ApiRequest<UpdateClientSchema>, res: ApiResponse<UpdateClientSchema>) => Promise<ApiResponse<UpdateClientSchema>>;
    delete: (req: ApiRequest<DeleteClientSchema>, res: ApiResponse<DeleteClientSchema>) => Promise<ApiResponse<DeleteClientSchema>>;
}
