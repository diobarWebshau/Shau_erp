"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationController = void 0;
const get_location_by_custom_id_usecase_1 = require("../../application/use-cases/get-location-by-custom-id.usecase");
const get_location_by_name_usecase_1 = require("../../application/use-cases/get-location-by-name.usecase");
const get_location_by_id_usecase_1 = require("../../application/use-cases/get-location-by-id.usecase");
const get_all_locations_usecase_1 = require("../../application/use-cases/get-all-locations.usecase");
const location_query_mapper_1 = require("../../infrastructure/http/location-query-mapper");
const create_location_usecase_1 = require("../../application/use-cases/create-location.usecase");
const update_location_usecase_1 = require("../../application/use-cases/update-location.usecase");
const delete_location_usecase_1 = require("../../application/use-cases/delete-location.usecase");
const location_repository_1 = require("../repository/location.repository");
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
class LocationController {
    repo;
    getAllUseCase;
    getByIdUseCase;
    getByNameUseCase;
    getByCustomIdUseCase;
    createUseCase;
    updateUseCase;
    deleteUseCase;
    constructor() {
        this.repo = new location_repository_1.LocationRepository();
        this.getAllUseCase = new get_all_locations_usecase_1.GetAllLocationsUseCase(this.repo);
        this.getByIdUseCase = new get_location_by_id_usecase_1.GetLocationByIdUseCase(this.repo);
        this.getByNameUseCase = new get_location_by_name_usecase_1.GetLocationByNameUseCase(this.repo);
        this.getByCustomIdUseCase = new get_location_by_custom_id_usecase_1.GetLocationByCustomIdUseCase(this.repo);
        this.createUseCase = new create_location_usecase_1.CreateLocationUseCase(this.repo);
        this.updateUseCase = new update_location_usecase_1.UpdateLocationUseCase(this.repo);
        this.deleteUseCase = new delete_location_usecase_1.DeleteLocationUseCase(this.repo);
    }
    ;
    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================
    /** Formatea un Location para convertir fechas a ISO */
    formatResponse(location) {
        return {
            ...location,
            created_at: location.created_at.toISOString(),
            updated_at: location.updated_at.toISOString()
        };
    }
    ;
    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, location_query_mapper_1.mapLocationQueryToCriteria)(queryRequest);
        const result = await this.getAllUseCase.execute(query);
        const formatted = result.map(l => this.formatResponse(l));
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
        const formatted = this.formatResponse(result);
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
        const formatted = this.formatResponse(result);
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
        const formatted = this.formatResponse(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // CREATE
    // ============================================================
    create = async (req, res) => {
        const body = req.body;
        const created = await this.createUseCase.execute(body);
        const formatted = this.formatResponse(created);
        return res.status(201).send(formatted);
    };
    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        const formatted = this.formatResponse(updated);
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
exports.LocationController = LocationController;
;
