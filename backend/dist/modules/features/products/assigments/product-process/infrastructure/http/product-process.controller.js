"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductProcessController = void 0;
const get_product_process_by_id_product_process_usecase_1 = require("../../application/use-cases/get-product-process-by-id-product-process.usecase");
const get_product_process_by_id_usecase_1 = require("../../application/use-cases/get-product-process-by-id.usecase");
const get_all_product_process_usecase_1 = require("../../application/use-cases/get-all-product-process.usecase");
const create_product_process_usecase_1 = require("../../application/use-cases/create-product-process.usecase");
const update_product_process_usecase_1 = require("../../application/use-cases/update-product-process.usecase");
const delete_product_process_usecase_1 = require("../../application/use-cases/delete-product-process.usecase");
const producto_repository_1 = require("../../../../../../core/product/infrastructure/repository/producto.repository");
const process_repository_1 = __importDefault(require("../../../../../../core/process/infrastructure/repository/process.repository"));
const product_process_repository_1 = require("../repository/product-process.repository");
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
class ProductProcessController {
    repo;
    repoProduct;
    repoProcess;
    getAllUseCase;
    getByIdUseCase;
    getByIdProductProcessUseCase;
    createUseCase;
    updateUseCase;
    deleteUseCase;
    constructor() {
        this.repo = new product_process_repository_1.ProductProcessRepository();
        this.repoProduct = new producto_repository_1.ProductRepository();
        this.repoProcess = new process_repository_1.default();
        this.getByIdProductProcessUseCase = new get_product_process_by_id_product_process_usecase_1.GetProductProcessByIdProductProcessUseCase(this.repo);
        this.getAllUseCase = new get_all_product_process_usecase_1.GetAllProductProcessUseCase(this.repo);
        this.getByIdUseCase = new get_product_process_by_id_usecase_1.GetProductProcessByIdUseCase(this.repo);
        this.createUseCase = new create_product_process_usecase_1.CreateProductProcessUseCase(this.repo, this.repoProduct, this.repoProcess);
        this.updateUseCase = new update_product_process_usecase_1.UpdateProductProcessUseCase(this.repo);
        this.deleteUseCase = new delete_product_process_usecase_1.DeleteProductProcessUseCase(this.repo);
    }
    ;
    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req, res) => {
        const result = await this.getAllUseCase.execute();
        return res.status(200).send(result);
    };
    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req, res) => {
        const { id } = req.params;
        const result = await this.getByIdUseCase.execute(Number(id));
        if (!result)
            return res.status(204).send(null);
        return res.status(200).send(result);
    };
    // ============================================================
    // GET BY ID
    // ============================================================
    getByIdProductProcess = async (req, res) => {
        const { process_id, product_id } = req.params;
        const result = await this.getByIdProductProcessUseCase.execute(Number(product_id), Number(process_id));
        if (!result)
            return res.status(204).send(null);
        return res.status(200).send(result);
    };
    // ============================================================
    // CREATE
    // ============================================================
    create = async (req, res) => {
        const body = req.body;
        const created = await this.createUseCase.execute(body);
        return res.status(201).send(created);
    };
    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        return res.status(200).send(updated);
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
exports.ProductProcessController = ProductProcessController;
exports.default = ProductProcessController;
