
import { GetAllProductFullQuerySchema, GetAllProductOrchestratorSchema, GetByIdProductFullQuerySchema, GetByIdProductOrchestratorSchema } from "../application/dto/product-query.endpoint.schema";
import { GetByIdProductsQueryOrchestratorUseCase } from "../application/usecase/get-by-id-product-query-orchestrator.usecase";
import { GetAllProductsQueryOrchestratorUseCase } from "../application/usecase/get-all-product-query-orchestrator.usecase";
import { ProductOrchestratorResponse } from "@modules/features/products/orchestrator/domain/product-orchestrator.types";
import { GetByIdProductsFullQueryUseCase } from "../application/usecase/get-by-id-product-full-query.usecase";
import { mapProductQueryToCriteria } from "@modules/core/product/infrastructure/http/product-query-mapper";
import { GetAllProductsFullQueryUseCase } from "../application/usecase/get-all-product-full-query.usecase";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductFullQueryResultDto, ProductSearchCriteria } from "../domain/product-query.type";
import { ProductQueryRepository } from "./product-query.repository";
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
 *   de forma coherente hacia productes externos.
 */

export class ProductQueryController {

    private readonly repo: ProductQueryRepository;
    private readonly getAllProductOrchestatorUseCase: GetAllProductsQueryOrchestratorUseCase;
    private readonly getAllProductFullUseCase: GetAllProductsFullQueryUseCase;
    private readonly getByIdProductOrchestratorUseCase: GetByIdProductsQueryOrchestratorUseCase;
    private readonly GetByIdProductFullUseCase: GetByIdProductsFullQueryUseCase;

    constructor() {
        this.repo = new ProductQueryRepository();
        this.getAllProductOrchestatorUseCase = new GetAllProductsQueryOrchestratorUseCase(this.repo);
        this.getAllProductFullUseCase = new GetAllProductsFullQueryUseCase(this.repo);
        this.getByIdProductOrchestratorUseCase = new GetByIdProductsQueryOrchestratorUseCase(this.repo);
        this.GetByIdProductFullUseCase = new GetByIdProductsFullQueryUseCase(this.repo);
    };

    getAllProductOrchestrator = async (req: ApiRequest<GetAllProductOrchestratorSchema>, res: ApiResponse<GetAllProductOrchestratorSchema>) => {
        const queryRequest: GetAllProductOrchestratorSchema["query"] = req.query;
        const query: ProductSearchCriteria = mapProductQueryToCriteria(queryRequest);
        const products: ProductOrchestratorResponse[] = await this.getAllProductOrchestatorUseCase.execute(query);
        return res.status(200).json(products);
    };

    getByIdProductOrchestrator = async (req: ApiRequest<GetByIdProductOrchestratorSchema>, res: ApiResponse<GetByIdProductOrchestratorSchema>) => {
        const { id }: GetByIdProductOrchestratorSchema["params"] = req.params;
        const productRecord: ProductOrchestratorResponse | null = await this.getByIdProductOrchestratorUseCase.execute(Number(id));
        return res.status(200).json(productRecord);
    };

    getAllProductFullQuery = async (req: ApiRequest<GetAllProductFullQuerySchema>, res: ApiResponse<GetAllProductFullQuerySchema>) => {
        const queryRequest: GetAllProductOrchestratorSchema["query"] = req.query;
        const query: ProductSearchCriteria = mapProductQueryToCriteria(queryRequest);
        const products: ProductFullQueryResultDto[] = await this.getAllProductFullUseCase.execute(query);
        return res.status(200).json(products);
    };

    getByIdProductFullQuery = async (req: ApiRequest<GetByIdProductFullQuerySchema>, res: ApiResponse<GetByIdProductFullQuerySchema>) => {
        const { id }: GetByIdProductFullQuerySchema["params"] = req.params;
        const product: ProductFullQueryResultDto | null = await this.GetByIdProductFullUseCase.execute(Number(id));
        return res.status(200).json(product);
    };

};