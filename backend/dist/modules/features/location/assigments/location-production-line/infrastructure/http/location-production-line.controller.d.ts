import type { CreateLocationProductionLineSchema, DeleteLocationProductionLineSchema, GetAllLocationProductionLinesSchema, GetByIdLocationProductionLineSchema, GetByLocationProductionLineIdLocationProductionLineSchema, UpdateLocationProductionLineSchema } from "../../application/dto/location-production-line.endpoint.schema";
import type { ApiRequest, ApiResponse } from "../../../../../../../shared/typed-request-endpoint/typed-request.interface";
/**
 * Router (Infrastructure / HTTP)
 * ------------------------------------------------------------------
 * Define las rutas HTTP asociadas al recurso `ProductionLine`.
 * Actúa como capa de infraestructura que conecta Express con los
 * controladores de aplicación, aplicando validaciones y delegando
 * la lógica de negocio a los casos de uso.
 *
 * Función técnica:
 * - Registrar endpoints RESTful (`GET`, `POST`, `PATCH`, `DELETE`) para el recurso.
 * - Asociar cada ruta con su schema de validación (Zod) mediante `validateRequest`.
 * - Delegar la ejecución de cada operación al `ProductionLineController`.
 * - Garantizar tipado estricto en parámetros, body, query y respuesta.
 *
 * Qué hace:
 * - Expone las rutas públicas de la API para `ProductionLine`.
 * - Valida la estructura de las requests antes de llegar al controlador.
 * - Orquesta la comunicación entre Express y la capa de aplicación.
 * - Mantiene la API consistente y escalable mediante un router modular.
 *
 * Qué no hace:
 * - No contiene lógica de negocio ni reglas del dominio.
 * - No implementa persistencia ni interactúa directamente con la base de datos.
 * - No sustituye al controlador ni a los casos de uso; su rol es enrutar y validar.
 *
 * Convención de nombres:
 * - Se nombra con el sufijo `Router` para indicar que define rutas HTTP.
 * - Cada router corresponde a un recurso del sistema (ej. `ProductionLineRouter`).
 * - Los schemas asociados a cada endpoint se importan desde la capa de aplicación
 *   para mantener coherencia entre validación y tipado.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: define entidades y casos de uso.
 * - Application: define DTOs y schemas de validación.
 * - Infrastructure/HTTP: routers y controladores que conectan Express con la aplicación.
 * - Orchestrators: pueden agrupar routers y exponer la API completa hacia clientes externos.
 */
export declare class LocationProductionLineController {
    private readonly repo;
    private readonly repoLocation;
    private readonly repoProductionLine;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly getByIdLocationProductionLine;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllLocationProductionLinesSchema>, res: ApiResponse<GetAllLocationProductionLinesSchema>) => Promise<ApiResponse<GetAllLocationProductionLinesSchema>>;
    getById: (req: ApiRequest<GetByIdLocationProductionLineSchema>, res: ApiResponse<GetByIdLocationProductionLineSchema>) => Promise<ApiResponse<GetByIdLocationProductionLineSchema>>;
    getByIdLocationProductionLineId: (req: ApiRequest<GetByLocationProductionLineIdLocationProductionLineSchema>, res: ApiResponse<GetByLocationProductionLineIdLocationProductionLineSchema>) => Promise<ApiResponse<GetByLocationProductionLineIdLocationProductionLineSchema>>;
    create: (req: ApiRequest<CreateLocationProductionLineSchema>, res: ApiResponse<CreateLocationProductionLineSchema>) => Promise<ApiResponse<CreateLocationProductionLineSchema>>;
    update: (req: ApiRequest<UpdateLocationProductionLineSchema>, res: ApiResponse<UpdateLocationProductionLineSchema>) => Promise<ApiResponse<UpdateLocationProductionLineSchema>>;
    delete: (req: ApiRequest<DeleteLocationProductionLineSchema>, res: ApiResponse<DeleteLocationProductionLineSchema>) => Promise<ApiResponse<DeleteLocationProductionLineSchema>>;
}
export default LocationProductionLineController;
