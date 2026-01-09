
import { GetAllProductFullQuerySchema, GetAllProductOrchestratorSchema, GetByIdProductFullQuerySchema, GetByIdProductOrchestratorSchema } from "../../application/dto/product-query.endpoint.schema";
import { ProductOrchestrator, ProductOrchestratorResponseProps } from "@modules/features/products/orchestrator/domain/product-orchestrator.types";
import { GetByIdProductsQueryOrchestratorUseCase } from "../../application/usecase/get-by-id-product-query-orchestrator.usecase";
import { GetAllProductsQueryOrchestratorUseCase } from "../../application/usecase/get-all-product-query-orchestrator.usecase";
import { GetByIdProductsFullQueryUseCase } from "../../application/usecase/get-by-id-product-full-query.usecase";
import { GetAllProductsFullQueryUseCase } from "../../application/usecase/get-all-product-full-query.usecase";
import { ProductFullQueryResult, ProductFullQueryResultDto } from "../../domain/product-query.type";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductQueryRepository } from "../repository/product-query.repository";
import ImageHandler from "@src/helpers/imageHandlerClass";
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

export const mapProductQueryOrchestratorDomainToDto = async (
    data: ProductOrchestrator
): Promise<ProductOrchestratorResponseProps> => {

    const {
        product,
        product_inputs,
        product_processes,
        product_discount_ranges
    } = data;

    return {
        // ==================================================
        // 🔹 PRODUCT
        // ==================================================
        product: {
            ...product,
            sale_price: product.sale_price?.toString() ?? null,
            production_cost: product.production_cost?.toString() ?? null,
            created_at: product.created_at.toISOString(),
            updated_at: product.updated_at.toISOString(),
            photo: product.photo
                ? await ImageHandler.convertToBase64(product.photo)
                : null,
        },

        // ==================================================
        // 🔹 PRODUCT INPUTS
        // ==================================================
        product_inputs: await Promise.all(
            product_inputs.map(async (pi) => ({
                ...pi,
                equivalence: pi.equivalence.toString(),

                product: {
                    ...pi.product,
                    sale_price: pi.product.sale_price?.toString() ?? null,
                    production_cost: pi.product.production_cost?.toString() ?? null,
                    created_at: pi.product.created_at.toISOString(),
                    updated_at: pi.product.updated_at.toISOString(),
                    photo: pi.product.photo
                        ? await ImageHandler.convertToBase64(pi.product.photo)
                        : null,
                },

                input: {
                    ...pi.input,
                    unit_cost: pi.input.unit_cost?.toString() ?? null,
                    created_at: pi.input.created_at.toISOString(),
                    updated_at: pi.input.updated_at.toISOString(),
                },
            }))
        ),

        // ==================================================
        // 🔹 PRODUCT PROCESSES
        // ==================================================
        product_processes: await Promise.all(
            product_processes.map(async (pp) => ({
                ...pp,
                sort_order: pp.sort_order,

                product: {
                    ...pp.product,
                    sale_price: pp.product.sale_price?.toString() ?? null,
                    production_cost: pp.product.production_cost?.toString() ?? null,
                    created_at: pp.product.created_at.toISOString(),
                    updated_at: pp.product.updated_at.toISOString(),
                    photo: pp.product.photo
                        ? await ImageHandler.convertToBase64(pp.product.photo)
                        : null,
                },

                process: {
                    ...pp.process,
                    created_at: pp.process.created_at.toISOString(),
                    updated_at: pp.process.updated_at.toISOString(),
                },

                product_input_process: pp.product_input_process.map((pip) => ({
                    ...pip,
                    qty: pip.qty.toString(),
                })),
            }))
        ),

        // ==================================================
        // 🔹 PRODUCT DISCOUNT RANGES
        // ==================================================
        product_discount_ranges: await Promise.all(
            product_discount_ranges.map(async (pdr) => ({
                ...pdr,
                max_qty: pdr.max_qty.toString(),
                min_qty: pdr.min_qty.toString(),
                unit_price: pdr.unit_price.toString(),
                created_at: pdr.created_at.toISOString(),
                updated_at: pdr.updated_at.toISOString(),

                product: {
                    ...pdr.product,
                    sale_price: pdr.product.sale_price?.toString() ?? null,
                    production_cost: pdr.product.production_cost?.toString() ?? null,
                    created_at: pdr.product.created_at.toISOString(),
                    updated_at: pdr.product.updated_at.toISOString(),
                    photo: pdr.product.photo
                        ? await ImageHandler.convertToBase64(pdr.product.photo)
                        : null,
                },
            }))
        ),
    };
};


export const mapProductQueryFullDomainToDto = async (data: ProductFullQueryResult): Promise<ProductFullQueryResultDto> => {

    const {
        product_inputs,
        product_processes,
        product_discount_ranges,
        ...productRest
    } = data;

    return {
        // ==================================================
        // 🔹 PRODUCT
        // ==================================================
        ...productRest,
        sale_price: productRest.sale_price?.toString() ?? null,
        production_cost: productRest.production_cost?.toString() ?? null,
        created_at: productRest.created_at.toISOString(),
        updated_at: productRest.updated_at.toISOString(),
        photo: productRest.photo
            ? await ImageHandler.convertToBase64(productRest.photo)
            : null,

        // ==================================================
        // 🔹 PRODUCT INPUTS
        // ==================================================
        product_inputs: await Promise.all(
            product_inputs.map(async (pi) => ({
                ...pi,
                equivalence: pi.equivalence.toString(),

                product: {
                    ...pi.product,
                    sale_price: pi.product.sale_price?.toString() ?? null,
                    production_cost: pi.product.production_cost?.toString() ?? null,
                    created_at: pi.product.created_at.toISOString(),
                    updated_at: pi.product.updated_at.toISOString(),
                    photo: pi.product.photo
                        ? await ImageHandler.convertToBase64(pi.product.photo)
                        : null,
                },

                input: {
                    ...pi.input,
                    unit_cost: pi.input.unit_cost?.toString() ?? null,
                    created_at: pi.input.created_at.toISOString(),
                    updated_at: pi.input.updated_at.toISOString(),
                },
            }))
        ),

        // ==================================================
        // 🔹 PRODUCT PROCESSES
        // ==================================================
        product_processes: await Promise.all(
            product_processes.map(async (pp) => ({
                ...pp,
                sort_order: pp.sort_order,

                product: {
                    ...pp.product,
                    sale_price: pp.product.sale_price?.toString() ?? null,
                    production_cost: pp.product.production_cost?.toString() ?? null,
                    created_at: pp.product.created_at.toISOString(),
                    updated_at: pp.product.updated_at.toISOString(),
                    photo: pp.product.photo
                        ? await ImageHandler.convertToBase64(pp.product.photo)
                        : null,
                },

                process: {
                    ...pp.process,
                    created_at: pp.process.created_at.toISOString(),
                    updated_at: pp.process.updated_at.toISOString(),
                },

                product_input_process: pp.product_input_process.map((pip) => ({
                    ...pip,
                    qty: pip.qty.toString(),
                })),
            }))
        ),

        // ==================================================
        // 🔹 PRODUCT DISCOUNT RANGES
        // ==================================================
        product_discount_ranges: await Promise.all(
            product_discount_ranges.map(async (pdr) => ({
                ...pdr,
                max_qty: pdr.max_qty.toString(),
                min_qty: pdr.min_qty.toString(),
                unit_price: pdr.unit_price.toString(),
                created_at: pdr.created_at.toISOString(),
                updated_at: pdr.updated_at.toISOString(),

                product: {
                    ...pdr.product,
                    sale_price: pdr.product.sale_price?.toString() ?? null,
                    production_cost: pdr.product.production_cost?.toString() ?? null,
                    created_at: pdr.product.created_at.toISOString(),
                    updated_at: pdr.product.updated_at.toISOString(),
                    photo: pdr.product.photo
                        ? await ImageHandler.convertToBase64(pdr.product.photo)
                        : null,
                },
            }))
        ),
    };
};


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
        const query: GetAllProductOrchestratorSchema["query"] = req.query;
        const productQueryResponse: ProductOrchestrator[] = await this.getAllProductOrchestatorUseCase.execute(query);
        const productQueryResult = await Promise.all(productQueryResponse.map(mapProductQueryOrchestratorDomainToDto));
        return res.status(200).json(productQueryResult);
    };

    getByIdProductOrchestrator = async (req: ApiRequest<GetByIdProductOrchestratorSchema>, res: ApiResponse<GetByIdProductOrchestratorSchema>) => {
        const { id }: GetByIdProductOrchestratorSchema["params"] = req.params;
        const productQueryResponse: ProductOrchestrator | null = await this.getByIdProductOrchestratorUseCase.execute(Number(id));
        if (!productQueryResponse) return res.status(404).json(null);
        const productQueryResult: ProductOrchestratorResponseProps = await mapProductQueryOrchestratorDomainToDto(productQueryResponse)
        return res.status(200).json(productQueryResult);
    };

    getAllProductFullQuery = async (req: ApiRequest<GetAllProductFullQuerySchema>, res: ApiResponse<GetAllProductFullQuerySchema>) => {
        const query: GetAllProductOrchestratorSchema["query"] = req.query;
        const productQueryResponse: ProductFullQueryResult[] = await this.getAllProductFullUseCase.execute(query);
        const productQueryResult: ProductFullQueryResultDto[] = await Promise.all(productQueryResponse.map(mapProductQueryFullDomainToDto));
        return res.status(200).json(productQueryResult);
    };

    getByIdProductFullQuery = async (req: ApiRequest<GetByIdProductFullQuerySchema>, res: ApiResponse<GetByIdProductFullQuerySchema>) => {
        const { id }: GetByIdProductFullQuerySchema["params"] = req.params;
        const productQueryResponse: ProductFullQueryResult | null = await this.GetByIdProductFullUseCase.execute(Number(id));
        if (!productQueryResponse) return res.status(404).json(null);
        const productResult: ProductFullQueryResultDto = await mapProductQueryFullDomainToDto(productQueryResponse);
        return res.status(200).json(productResult);
    };

};