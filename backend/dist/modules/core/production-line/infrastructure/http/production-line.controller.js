"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineController = void 0;
const get_production_line_by_custom_id_usecase_1 = require("../../application/use-cases/get-production-line-by-custom-id.usecase");
const get_production_line_by_name_usecase_1 = require("../../application/use-cases/get-production-line-by-name.usecase");
const get_production_line_by_id_usecase_1 = require("../../application/use-cases/get-production-line-by-id.usecase");
const get_all_production_lines_usecase_1 = require("../../application/use-cases/get-all-production-lines.usecase");
const create_production_line_usecase_1 = require("../../application/use-cases/create-production-line.usecase");
const delete_production_line_usecase_1 = require("../../application/use-cases/delete-production-line.usecase");
const update_production_line_usecase_1 = require("../../application/use-cases/update-production-line.usecase");
const production_line_repository_1 = require("../repository/production-line.repository");
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
/** Formatea un Location para convertir fechas a ISO */
const mapProductionLineDomainToDto = (production_line) => {
    return {
        ...production_line,
        created_at: production_line.created_at.toISOString(),
        updated_at: production_line.updated_at.toISOString()
    };
};
class ProductionLineController {
    repo;
    getAllUseCase;
    getByIdUseCase;
    getByNameUseCase;
    getByCustomIdUseCase;
    createUseCase;
    updateUseCase;
    deleteUseCase;
    constructor() {
        this.repo = new production_line_repository_1.ProductionLineRepository();
        this.getAllUseCase = new get_all_production_lines_usecase_1.GetAllProductionLinesUseCase(this.repo);
        this.getByIdUseCase = new get_production_line_by_id_usecase_1.GetProductionLineByIdUseCase(this.repo);
        this.getByNameUseCase = new get_production_line_by_name_usecase_1.GetProductionLineByNameUseCase(this.repo);
        this.getByCustomIdUseCase = new get_production_line_by_custom_id_usecase_1.GetProductionLineByCustomIdUseCase(this.repo);
        this.createUseCase = new create_production_line_usecase_1.CreateProductionLineUseCase(this.repo);
        this.updateUseCase = new update_production_line_usecase_1.UpdateProductionLineUseCase(this.repo);
        this.deleteUseCase = new delete_production_line_usecase_1.DeleteProductionLineUseCase(this.repo);
    }
    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================
    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req, res) => {
        const query = req.query;
        const result = await this.getAllUseCase.execute(query);
        const formatted = result.map(l => mapProductionLineDomainToDto(l));
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
        const formatted = mapProductionLineDomainToDto(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY NAME
    // ============================================================
    getByName = async (req, res) => {
        const { name } = req.params;
        const result = await this.getByNameUseCase.execute(name);
        if (!result)
            return res.status(204).send(null);
        const formatted = mapProductionLineDomainToDto(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY CUSTOM ID
    // ============================================================
    getByCustomId = async (req, res) => {
        const { custom_id } = req.params;
        const result = await this.getByCustomIdUseCase.execute(custom_id);
        if (!result)
            return res.status(204).send(null);
        const formatted = mapProductionLineDomainToDto(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // CREATE
    // ============================================================
    create = async (req, res) => {
        const body = req.body;
        const created = await this.createUseCase.execute(body);
        const formatted = mapProductionLineDomainToDto(created);
        return res.status(201).send(formatted);
    };
    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        const formatted = mapProductionLineDomainToDto(updated);
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
exports.ProductionLineController = ProductionLineController;
;
