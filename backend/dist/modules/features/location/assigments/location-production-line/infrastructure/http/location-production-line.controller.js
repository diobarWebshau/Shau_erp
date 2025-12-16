"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationProductionLineController = void 0;
const get_location_production_line_by_id_usecase_1 = require("../../application/use-cases/get-location-production-line-by-id.usecase");
const create_location_production_line_usecase_1 = require("../../application/use-cases/create-location-production-line.usecase");
const update_location_production_line_usecase_1 = require("../../application/use-cases/update-location-production-line.usecase");
const get_all_location_production_line_usecase_1 = require("../../application/use-cases/get-all-location-production-line.usecase");
const delete_location_production_line_usecase_1 = require("../../application/use-cases/delete-location-production-line.usecase");
const location_production_line_repository_1 = require("../repository/location-production-line.repository");
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
class LocationProductionLineController {
    repo;
    getAllUseCase;
    getByIdUseCase;
    createUseCase;
    updateUseCase;
    deleteUseCase;
    constructor() {
        this.repo = new location_production_line_repository_1.LocationProductionLineRepository();
        this.getAllUseCase = new get_all_location_production_line_usecase_1.GetAllLocationProductionLineUseCase(this.repo);
        this.getByIdUseCase = new get_location_production_line_by_id_usecase_1.GetLocationProductionLineByIdUseCase(this.repo);
        this.createUseCase = new create_location_production_line_usecase_1.CreateLocationProductionLineUseCase(this.repo);
        this.updateUseCase = new update_location_production_line_usecase_1.UpdateLocationProductionLineUseCase(this.repo);
        this.deleteUseCase = new delete_location_production_line_usecase_1.DeleteLocationProductionLineUseCase(this.repo);
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
exports.LocationProductionLineController = LocationProductionLineController;
exports.default = LocationProductionLineController;
