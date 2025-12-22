"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountRangeController = void 0;
const get_product_discount_range_by_product_usecase_1 = require("../../application/use-cases/get-product-discount-range-by-product.usecase");
const create_product_discount_range_usecase_1 = require("../../application/use-cases/create-product-discount-range.usecase");
const update_product_discount_range_usecase_1 = require("../../application/use-cases/update-product-discount-range.usecase");
const get_product_discount_range_by_id_usecase_1 = require("../../application/use-cases/get-product-discount-range-by-id.usecase");
const get_all_product_discount_range_usecase_1 = require("../../application/use-cases/get-all-product-discount-range.usecase");
const delete_product_discount_range_usecase_1 = require("../../application/use-cases/delete-product-discount-range.usecase");
const product_discount_range_repository_1 = require("../repository/product-discount-range.repository");
const producto_repository_1 = require("../../../../../../../modules/core/product/infrastructure/repository/producto.repository");
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
class ProductDiscountRangeController {
    repo;
    repoProduct;
    getAllUseCase;
    getByIdUseCase;
    createUseCase;
    updateUseCase;
    deleteUseCase;
    getByProductUseCase;
    constructor() {
        this.repo = new product_discount_range_repository_1.ProductDiscountRangeRepository();
        this.repoProduct = new producto_repository_1.ProductRepository();
        this.getAllUseCase = new get_all_product_discount_range_usecase_1.GetAllProductDiscountRangeUseCase(this.repo);
        this.getByIdUseCase = new get_product_discount_range_by_id_usecase_1.GetProductDiscountRangeByIdUseCase(this.repo);
        this.createUseCase = new create_product_discount_range_usecase_1.CreateProductDiscountRangeUseCase(this.repo, this.repoProduct);
        this.updateUseCase = new update_product_discount_range_usecase_1.UpdateProductDiscountRangeUseCase(this.repo);
        this.deleteUseCase = new delete_product_discount_range_usecase_1.DeleteProductDiscountRangeUseCase(this.repo);
        this.getByProductUseCase = new get_product_discount_range_by_product_usecase_1.GetProductDiscountRangeByProductUseCase(this.repo);
    }
    ;
    /** Formatea un Location para convertir fechas a ISO */
    async formatResponse(productDiscountRange) {
        return {
            ...productDiscountRange,
            created_at: productDiscountRange.created_at.toISOString(),
            updated_at: productDiscountRange.updated_at.toISOString()
        };
    }
    ;
    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req, res) => {
        const result = await this.getAllUseCase.execute();
        const formatted = await Promise.all(result.map(p => this.formatResponse(p)));
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET all discount of the product
    // ============================================================
    getByProductId = async (req, res) => {
        const { product_id } = req.params;
        const result = await this.getByProductUseCase.execute(Number(product_id));
        const formatted = await Promise.all(result.map(p => this.formatResponse(p)));
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req, res) => {
        const { id } = req.params;
        const result = await this.getByIdUseCase.execute(Number(id));
        if (!result)
            return res.status(204).send(null);
        const formatted = await this.formatResponse(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // CREATE
    // ============================================================
    create = async (req, res) => {
        const body = req.body;
        const created = await this.createUseCase.execute(body);
        const formatted = await this.formatResponse(created);
        return res.status(201).send(formatted);
    };
    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        const formatted = await this.formatResponse(updated);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteUseCase.execute(Number(id));
        return res.status(201).send(null);
    };
}
exports.ProductDiscountRangeController = ProductDiscountRangeController;
exports.default = ProductDiscountRangeController;
