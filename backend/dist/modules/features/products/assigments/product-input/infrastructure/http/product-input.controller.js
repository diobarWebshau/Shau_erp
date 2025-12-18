"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInputController = void 0;
const get_product_input_by_id_usecase_1 = require("../../application/use-cases/get-product-input-by-id.usecase");
const create_product_input_usecase_1 = require("../../application/use-cases/create-product-input.usecase");
const update_product_input_usecase_1 = require("../../application/use-cases/update-product-input.usecase");
const get_all_product_input_usecase_1 = require("../../application/use-cases/get-all-product-input.usecase");
const delete_product_input_usecase_1 = require("../../application/use-cases/delete-product-input.usecase");
const product_input_repository_1 = require("../repository/product-input.repository");
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
class ProductInputController {
    repo;
    getAllUseCase;
    getByIdUseCase;
    createUseCase;
    updateUseCase;
    deleteUseCase;
    constructor() {
        this.repo = new product_input_repository_1.ProductInputRepository();
        this.getAllUseCase = new get_all_product_input_usecase_1.GetAllProductInputUseCase(this.repo);
        this.getByIdUseCase = new get_product_input_by_id_usecase_1.GetProductInputByIdUseCase(this.repo);
        this.createUseCase = new create_product_input_usecase_1.CreateProductInputUseCase(this.repo);
        this.updateUseCase = new update_product_input_usecase_1.UpdateProductInputUseCase(this.repo);
        this.deleteUseCase = new delete_product_input_usecase_1.DeleteProductInputUseCase(this.repo);
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
        const result = await this.getByIdUseCase.execute(id);
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
        const updated = await this.updateUseCase.execute(id, body);
        return res.status(200).send(updated);
    };
    // ============================================================
    // DELETE
    // ============================================================
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteUseCase.execute(id);
        return res.status(201).send(null);
    };
}
exports.ProductInputController = ProductInputController;
exports.default = ProductInputController;
