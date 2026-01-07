"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = exports.mapClientDtotoDomain = void 0;
const get_cllient_by_name_usecase_1 = require("../../application/use-cases/get-cllient-by-name.usecase");
const get_clietn_by_cfdi_usecase_1 = require("../../application/use-cases/get-clietn-by-cfdi.usecase");
const get_client_by_id_usecase_1 = require("../../application/use-cases/get-client-by-id.usecase");
const get_all_client_usecase_1 = require("../../application/use-cases/get-all-client.usecase");
const create_client_usecase_1 = require("../../application/use-cases/create-client.usecase");
const delete_client_usecase_1 = require("../../application/use-cases/delete-client.usecase");
const update_client_usecase_1 = require("../../application/use-cases/update-client.usecase");
const client_repository_1 = require("../repository/client.repository");
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
const mapClientDtotoDomain = (client) => {
    return {
        ...client,
        credit_limit: client.credit_limit ? client.credit_limit.toString() : null,
        created_at: client.created_at.toISOString(),
        updated_at: client.updated_at.toISOString()
    };
};
exports.mapClientDtotoDomain = mapClientDtotoDomain;
class ClientController {
    repo;
    getAllUseCase;
    getByIdUseCase;
    getByCfdiUseCase;
    getByCompanyNameUseCase;
    createUseCase;
    updateUseCase;
    deleteUseCase;
    constructor() {
        this.repo = new client_repository_1.ClientRepository();
        this.getAllUseCase = new get_all_client_usecase_1.GetAllClientsUseCase(this.repo);
        this.getByIdUseCase = new get_client_by_id_usecase_1.GetClientByIdUseCase(this.repo);
        this.getByCfdiUseCase = new get_clietn_by_cfdi_usecase_1.GetClientByCfdiUseCase(this.repo);
        this.getByCompanyNameUseCase = new get_cllient_by_name_usecase_1.GetClientByNameUseCase(this.repo);
        this.createUseCase = new create_client_usecase_1.CreateClientUseCase(this.repo);
        this.updateUseCase = new update_client_usecase_1.UpdateClientUseCase(this.repo);
        this.deleteUseCase = new delete_client_usecase_1.DeleteClientUseCase(this.repo);
    }
    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================
    /** Formatea un Location para convertir fechas a ISO */
    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (req, res) => {
        const query = req.query;
        const result = await this.getAllUseCase.execute(query);
        const formatted = result.map(l => (0, exports.mapClientDtotoDomain)(l));
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
        const formatted = (0, exports.mapClientDtotoDomain)(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY ID
    // ============================================================
    getByCfdi = async (req, res) => {
        const { id } = req.params;
        const result = await this.getByIdUseCase.execute(Number(id));
        if (!result)
            return res.status(204).send(null);
        const formatted = (0, exports.mapClientDtotoDomain)(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY ID
    // ============================================================
    getByCFDI = async (req, res) => {
        const { cfdi } = req.params;
        const result = await this.getByCfdiUseCase.execute(cfdi);
        if (!result)
            return res.status(204).send(null);
        const formatted = (0, exports.mapClientDtotoDomain)(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY NAME
    // ============================================================
    getByCompanyName = async (req, res) => {
        const { company_name } = req.params;
        const result = await this.getByCompanyNameUseCase.execute(company_name);
        if (!result)
            return res.status(204).send(null);
        const formatted = (0, exports.mapClientDtotoDomain)(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // CREATE
    // ============================================================
    create = async (req, res) => {
        const body = req.body;
        const created = await this.createUseCase.execute(body);
        const formatted = (0, exports.mapClientDtotoDomain)(created);
        return res.status(201).send(formatted);
    };
    // ============================================================
    // UPDATE
    // ============================================================
    update = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const updated = await this.updateUseCase.execute(Number(id), body);
        const formatted = (0, exports.mapClientDtotoDomain)(updated);
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
exports.ClientController = ClientController;
;
