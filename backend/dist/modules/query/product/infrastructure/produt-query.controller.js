"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQueryController = void 0;
const get_by_id_product_query_orchestrator_usecase_1 = require("../application/usecase/get-by-id-product-query-orchestrator.usecase");
const get_all_product_query_orchestrator_usecase_1 = require("../application/usecase/get-all-product-query-orchestrator.usecase");
const get_by_id_product_full_query_usecase_1 = require("../application/usecase/get-by-id-product-full-query.usecase");
const product_query_mapper_1 = require("../../../core/product/infrastructure/http/product-query-mapper");
const get_all_product_full_query_usecase_1 = require("../application/usecase/get-all-product-full-query.usecase");
const product_query_repository_1 = require("./product-query.repository");
const imageHandlerClass_1 = __importDefault(require("../../../../helpers/imageHandlerClass"));
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
class ProductQueryController {
    repo;
    getAllProductOrchestatorUseCase;
    getAllProductFullUseCase;
    getByIdProductOrchestratorUseCase;
    GetByIdProductFullUseCase;
    constructor() {
        this.repo = new product_query_repository_1.ProductQueryRepository();
        this.getAllProductOrchestatorUseCase = new get_all_product_query_orchestrator_usecase_1.GetAllProductsQueryOrchestratorUseCase(this.repo);
        this.getAllProductFullUseCase = new get_all_product_full_query_usecase_1.GetAllProductsFullQueryUseCase(this.repo);
        this.getByIdProductOrchestratorUseCase = new get_by_id_product_query_orchestrator_usecase_1.GetByIdProductsQueryOrchestratorUseCase(this.repo);
        this.GetByIdProductFullUseCase = new get_by_id_product_full_query_usecase_1.GetByIdProductsFullQueryUseCase(this.repo);
    }
    ;
    getAllProductOrchestrator = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, product_query_mapper_1.mapProductQueryToCriteria)(queryRequest);
        const products = await this.getAllProductOrchestatorUseCase.execute(query);
        const productsResultOrchestrator = [];
        for (const p of products) {
            const { products_inputs, product_processes, product_discount_ranges, product } = p;
            const dataProduct = {
                ...product,
                photo: product.photo ? await imageHandlerClass_1.default.convertToBase64(product.photo) : null,
                created_at: product?.created_at.toISOString(),
                updated_at: product?.updated_at.toISOString(),
            };
            const dataDiscounts = product_discount_ranges.map((pdr) => ({
                ...pdr,
                created_at: pdr?.created_at.toISOString(),
                updated_at: pdr?.updated_at.toISOString()
            })) ?? [];
            const productResultOrch = {
                product: dataProduct,
                products_inputs: products_inputs ?? [],
                product_discount_ranges: dataDiscounts ?? [],
                product_processes: product_processes ?? []
            };
            productsResultOrchestrator.push(productResultOrch);
        }
        ;
        return res.status(200).json(productsResultOrchestrator);
    };
    getByIdProductOrchestrator = async (req, res) => {
        const { id } = req.params;
        const productRecord = await this.getByIdProductOrchestratorUseCase.execute(Number(id));
        if (!productRecord)
            return null;
        const { products_inputs, product_processes, product_discount_ranges, product } = productRecord;
        const dataProduct = {
            ...product,
            photo: product.photo ? await imageHandlerClass_1.default.convertToBase64(product.photo) : null,
            created_at: product?.created_at.toISOString(),
            updated_at: product?.updated_at.toISOString()
        };
        const dataDiscounts = product_discount_ranges.map((pdr) => ({
            ...pdr,
            created_at: pdr?.created_at.toISOString(),
            updated_at: pdr?.updated_at.toISOString()
        })) ?? [];
        const productResultOrch = {
            product: dataProduct,
            products_inputs: products_inputs ?? [],
            product_discount_ranges: dataDiscounts ?? [],
            product_processes: product_processes ?? []
        };
        return res.status(200).json(productResultOrch);
    };
    getAllProductFullQuery = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, product_query_mapper_1.mapProductQueryToCriteria)(queryRequest);
        const products = await this.getAllProductFullUseCase.execute(query);
        if (!products)
            return [];
        const productsFullResultArray = [];
        for (const p of products) {
            const { products_inputs, product_processes, product_discount_ranges, ...rest } = p;
            const dataProduct = {
                ...rest,
                photo: rest.photo ? await imageHandlerClass_1.default.convertToBase64(rest.photo) : null,
                created_at: rest?.created_at.toISOString(),
                updated_at: rest?.created_at.toISOString()
            };
            const dataDiscounts = product_discount_ranges.map((pdr) => ({
                ...pdr,
                created_at: pdr?.created_at.toISOString(),
                updated_at: pdr?.created_at.toISOString()
            })) ?? [];
            const productFullResult = {
                ...dataProduct,
                products_inputs: products_inputs ?? [],
                product_discount_ranges: dataDiscounts ?? [],
                product_processes: product_processes ?? []
            };
            productsFullResultArray.push(productFullResult);
        }
        ;
        return res.status(200).json(productsFullResultArray);
    };
    getByIdProductFullQuery = async (req, res) => {
        const { id } = req.params;
        const product = await this.GetByIdProductFullUseCase.execute(Number(id));
        if (!product)
            return null;
        const { products_inputs, product_processes, product_discount_ranges, ...rest } = product;
        const dataProduct = {
            ...rest,
            photo: product.photo ? await imageHandlerClass_1.default.convertToBase64(product.photo) : null,
            created_at: rest?.created_at.toISOString(),
            updated_at: rest?.created_at.toISOString()
        };
        const dataDiscounts = product_discount_ranges.map((pdr) => ({
            ...pdr,
            created_at: pdr?.created_at.toISOString(),
            updated_at: pdr?.created_at.toISOString()
        })) ?? [];
        const productFullResult = {
            ...dataProduct,
            products_inputs: products_inputs ?? [],
            product_discount_ranges: dataDiscounts ?? [],
            product_processes: product_processes ?? []
        };
        return res.status(200).json(productFullResult);
    };
}
exports.ProductQueryController = ProductQueryController;
;
