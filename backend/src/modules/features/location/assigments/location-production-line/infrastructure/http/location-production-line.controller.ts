import type { CreateLocationProductionLineSchema, DeleteLocationProductionLineSchema, GetAllLocationProductionLinesSchema, GetByIdLocationProductionLineSchema, GetByLocationProductionLineIdLocationProductionLineSchema, UpdateLocationProductionLineSchema } from "../../application/dto/location-production-line.endpoint.schema";
import type { LocationProductionLineCreateDto, LocationProductionLineResponseDto, LocationProductionLineUpdateDto } from "../../application/dto/location-production-line.model.schema";
import { GetLocationProductionLineByIdUseCase } from "../../application/use-cases/get-location-production-line-by-id.usecase";
import { CreateLocationProductionLineUseCase } from "../../application/use-cases/create-location-production-line.usecase";
import { UpdateLocationProductionLineUseCase } from "../../application/use-cases/update-location-production-line.usecase";
import { GetAllLocationProductionLineUseCase } from "../../application/use-cases/get-all-location-production-line.usecase";
import { DeleteLocationProductionLineUseCase } from "../../application/use-cases/delete-location-production-line.usecase";
import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { LocationProductionLineRepository } from "../repository/location-production-line.repository";
import { GetLocationProductionLineByIdLocationProductionLineUseCase } from "../../application/use-cases/get-location-production-line-by-location-location-type.usecase";
import { ProductionLineRepository } from "@src/modules/core/production-line/infrastructure/repository/production-line.repository";
import { LocationRepository } from "@src/modules/core/location/infrastructure/repository/location.repository";

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

export class LocationProductionLineController {

    private readonly repo: LocationProductionLineRepository;
    private readonly repoLocation: LocationRepository;
    private readonly repoProductionLine: ProductionLineRepository;
    private readonly getAllUseCase: GetAllLocationProductionLineUseCase;
    private readonly getByIdUseCase: GetLocationProductionLineByIdUseCase;
    private readonly getByIdLocationProductionLine: GetLocationProductionLineByIdLocationProductionLineUseCase;
    private readonly createUseCase: CreateLocationProductionLineUseCase;
    private readonly updateUseCase: UpdateLocationProductionLineUseCase;
    private readonly deleteUseCase: DeleteLocationProductionLineUseCase;

    constructor() {
        this.repo = new LocationProductionLineRepository();
        this.repoLocation = new LocationRepository();
        this.repoProductionLine = new ProductionLineRepository();
        this.getAllUseCase = new GetAllLocationProductionLineUseCase(this.repo);
        this.getByIdUseCase = new GetLocationProductionLineByIdUseCase(this.repo);
        this.createUseCase = new CreateLocationProductionLineUseCase(this.repo, this.repoLocation, this.repoProductionLine);
        this.updateUseCase = new UpdateLocationProductionLineUseCase(this.repo);
        this.deleteUseCase = new DeleteLocationProductionLineUseCase(this.repo);
        this.getByIdLocationProductionLine = new GetLocationProductionLineByIdLocationProductionLineUseCase(this.repo);
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req: ApiRequest<GetAllLocationProductionLinesSchema>, res: ApiResponse<GetAllLocationProductionLinesSchema>) => {
        const result: LocationProductionLineResponseDto[] = await this.getAllUseCase.execute();
        return res.status(200).send(result);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdLocationProductionLineSchema>, res: ApiResponse<GetByIdLocationProductionLineSchema>) => {
        const { id }: GetByIdLocationProductionLineSchema["params"] = req.params
        const result: LocationProductionLineResponseDto | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        return res.status(200).send(result);
    };
    // ============================================================
    // GET BY ID
    // ============================================================
    getByIdLocationProductionLineId = async (req: ApiRequest<GetByLocationProductionLineIdLocationProductionLineSchema>, res: ApiResponse<GetByLocationProductionLineIdLocationProductionLineSchema>) => {
        const { location_id, production_line_id }: GetByLocationProductionLineIdLocationProductionLineSchema["params"] = req.params
        const result: LocationProductionLineResponseDto | null = await this.getByIdLocationProductionLine.execute(Number(location_id), Number(production_line_id));
        if (!result) return res.status(204).send(null);
        return res.status(200).send(result);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateLocationProductionLineSchema>, res: ApiResponse<CreateLocationProductionLineSchema>) => {
        const body: LocationProductionLineCreateDto = req.body;
        const created: LocationProductionLineResponseDto = await this.createUseCase.execute(body);
        return res.status(201).send(created);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateLocationProductionLineSchema>, res: ApiResponse<UpdateLocationProductionLineSchema>) => {
        const { id }: UpdateLocationProductionLineSchema["params"] = req.params;
        const body: LocationProductionLineUpdateDto = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        return res.status(200).send(updated);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteLocationProductionLineSchema>, res: ApiResponse<DeleteLocationProductionLineSchema>) => {
        const { id }: DeleteLocationProductionLineSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
}


export default LocationProductionLineController;
