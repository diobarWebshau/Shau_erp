
import { ProductionLineCreateDto, ProductionLineResponseDto, ProductionLineUpdateDto } from "../../application/dto/production-lines.model.schema";
import { GetProductionLineByCustomIdUseCase } from "../../application/use-cases/get-production-line-by-custom-id.usecase";
import { GetProductionLineByNameUseCase } from "../../application/use-cases/get-production-line-by-name.usecase";
import { GetProductionLineByIdUseCase } from "../../application/use-cases/get-production-line-by-id.usecase";
import { GetAllProductionLinesUseCase } from "../../application/use-cases/get-all-production-lines.usecase";
import { CreateProductionLineUseCase } from "../../application/use-cases/create-production-line.usecase";
import { DeleteProductionLineUseCase } from "../../application/use-cases/delete-production-line.usecase";
import { UpdateProductionLineUseCase } from "../../application/use-cases/update-production-line.usecase";
import { ProductionLineProps, ProductionLineSearchCriteria } from "../../domain/production-line.types"
import { GetByIdProductionLineSchema } from "../../application/dto/production-lines.endpoint.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductionLineRepository } from "../repository/production-line.repository";
import {
    GetByNameProducionLineSchema, GetByCustomIdProducionLineSchema, GetAllProductionLinesSchema,
    CreateProducionLineSchema, UpdateProducionLineSchema, DeleteProducionLineSchema
} from "../../application/dto/production-lines.endpoint.schema";
import { mapProductionLineQueryToCriteria } from "./production-line-query-mapper";

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

export class ProductionLineController {

    private readonly repo: ProductionLineRepository;
    private readonly getAllUseCase: GetAllProductionLinesUseCase;
    private readonly getByIdUseCase: GetProductionLineByIdUseCase;
    private readonly getByNameUseCase: GetProductionLineByNameUseCase;
    private readonly getByCustomIdUseCase: GetProductionLineByCustomIdUseCase;
    private readonly createUseCase: CreateProductionLineUseCase;
    private readonly updateUseCase: UpdateProductionLineUseCase;
    private readonly deleteUseCase: DeleteProductionLineUseCase;

    constructor() {
        this.repo = new ProductionLineRepository();
        this.getAllUseCase = new GetAllProductionLinesUseCase(this.repo);
        this.getByIdUseCase = new GetProductionLineByIdUseCase(this.repo);
        this.getByNameUseCase = new GetProductionLineByNameUseCase(this.repo);
        this.getByCustomIdUseCase = new GetProductionLineByCustomIdUseCase(this.repo);
        this.createUseCase = new CreateProductionLineUseCase(this.repo);
        this.updateUseCase = new UpdateProductionLineUseCase(this.repo);
        this.deleteUseCase = new DeleteProductionLineUseCase(this.repo);
    }

    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================

    /** Formatea un Location para convertir fechas a ISO */
    private formatResponse(production_line: ProductionLineProps): ProductionLineResponseDto {
        return {
            ...production_line,
            created_at: production_line.created_at.toISOString(),
            updated_at: production_line.updated_at.toISOString()
        };
    };

    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req: ApiRequest<GetAllProductionLinesSchema>, res: ApiResponse<GetAllProductionLinesSchema>) => {
        const queryRequest: GetAllProductionLinesSchema["query"] = req.query;
        const query: ProductionLineSearchCriteria = mapProductionLineQueryToCriteria(queryRequest);
        const result: ProductionLineProps[] = await this.getAllUseCase.execute(query);
        const formatted: ProductionLineResponseDto[] = result.map(l => this.formatResponse(l));
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req: ApiRequest<GetByIdProductionLineSchema>, res: ApiResponse<GetByIdProductionLineSchema>) => {
        const { id }: GetByIdProductionLineSchema["params"] = req.params
        const result: ProductionLineProps | null = await this.getByIdUseCase.execute(Number(id));
        if (!result) return res.status(204).send(null);
        const formatted: ProductionLineResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY NAME
    // ============================================================
    getByName = async (req: ApiRequest<GetByNameProducionLineSchema>, res: ApiResponse<GetByNameProducionLineSchema>) => {
        const { name }: GetByNameProducionLineSchema["params"] = req.params
        const result: ProductionLineProps | null = await this.getByNameUseCase.execute(name);
        if (!result) return res.status(204).send(null);
        const formatted: ProductionLineResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // GET BY CUSTOM ID
    // ============================================================
    getByCustomId = async (req: ApiRequest<GetByCustomIdProducionLineSchema>, res: ApiResponse<GetByCustomIdProducionLineSchema>) => {
        const { custom_id }: GetByCustomIdProducionLineSchema["params"] = req.params
        const result: ProductionLineProps | null = await this.getByCustomIdUseCase.execute(custom_id);
        if (!result) return res.status(204).send(null);
        const formatted: ProductionLineResponseDto = this.formatResponse(result)
        return res.status(200).send(formatted);
    };

    // ============================================================
    // CREATE
    // ============================================================
    create = async (req: ApiRequest<CreateProducionLineSchema>, res: ApiResponse<CreateProducionLineSchema>) => {
        const body: ProductionLineCreateDto = req.body;
        const created: ProductionLineProps = await this.createUseCase.execute(body);
        const formatted: ProductionLineResponseDto = this.formatResponse(created);
        return res.status(201).send(formatted);
    };

    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req: ApiRequest<UpdateProducionLineSchema>, res: ApiResponse<UpdateProducionLineSchema>) => {
        const { id }: UpdateProducionLineSchema["params"] = req.params;
        const body: ProductionLineUpdateDto = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        const formatted: ProductionLineResponseDto = this.formatResponse(updated);
        return res.status(200).send(formatted);
    };

    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req: ApiRequest<DeleteProducionLineSchema>, res: ApiResponse<DeleteProducionLineSchema>) => {
        const { id }: DeleteProducionLineSchema["params"] = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
};