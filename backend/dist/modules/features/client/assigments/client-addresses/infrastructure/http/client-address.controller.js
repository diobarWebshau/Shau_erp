"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAddressController = void 0;
const get_cllient_address_by_client_id_usecase_1 = require("../../application/use-cases/get-cllient-address-by-client-id.usecase");
const get_client_address_by_id_usecase_1 = require("../../application/use-cases/get-client-address-by-id.usecase");
const get_all_client_address_usecase_1 = require("../../application/use-cases/get-all-client-address.usecase");
const create_client_address_usecase_1 = require("../../application/use-cases/create-client-address.usecase");
const delete_client_address_usecase_1 = require("../../application/use-cases/delete-client-address.usecase");
const update_client_address_usecase_1 = require("../../application/use-cases/update-client-address.usecase");
const client_address_repository_1 = require("../repository/client-address.repository");
class ClientAddressController {
    repo;
    getAllUseCase;
    getByIdUseCase;
    getByClientIdUseCase;
    createUseCase;
    updateUseCase;
    deleteUseCase;
    constructor() {
        this.repo = new client_address_repository_1.ClientAddressRepository();
        this.getAllUseCase = new get_all_client_address_usecase_1.GetAllClientAddressesUseCase(this.repo);
        this.getByIdUseCase = new get_client_address_by_id_usecase_1.GetClientAddressByIdUseCase(this.repo);
        this.getByClientIdUseCase = new get_cllient_address_by_client_id_usecase_1.GetClienAddressByClientIdUseCase(this.repo);
        this.createUseCase = new create_client_address_usecase_1.CreateClientAddressUseCase(this.repo);
        this.updateUseCase = new update_client_address_usecase_1.UpdateClientAddressUseCase(this.repo);
        this.deleteUseCase = new delete_client_address_usecase_1.DeleteClientAddressUseCase(this.repo);
    }
    // ============================================================
    // 🔧 HELPERS PRIVADOS (evita repetir la misma lógica en 7 endpoints)
    // ============================================================
    /** Formatea un Location para convertir fechas a ISO */
    formatResponse(clientAddress) {
        return {
            ...clientAddress,
            created_at: clientAddress.created_at.toISOString(),
            updated_at: clientAddress.updated_at.toISOString()
        };
    }
    ;
    // ============================================================
    // GET ALL
    // ============================================================
    getAll = async (_req, res) => {
        const result = await this.getAllUseCase.execute();
        const formatted = result.map(l => this.formatResponse(l));
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY ID
    // ============================================================
    getById = async (req, res) => {
        const { id } = req.params;
        const result = await this.getByIdUseCase.execute(id);
        if (!result)
            return res.status(204).send(null);
        const formatted = this.formatResponse(result);
        return res.status(200).send(formatted);
    };
    // ============================================================
    // GET BY NAME
    // ============================================================
    getByClientIdName = async (req, res) => {
        const { client_id } = req.params;
        const result = await this.getByClientIdUseCase.execute(client_id);
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
        const updated = await this.updateUseCase.execute(id, body);
        const formatted = this.formatResponse(updated);
        return res.status(200).send(formatted);
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
exports.ClientAddressController = ClientAddressController;
;
