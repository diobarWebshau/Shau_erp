"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAddressRepository = void 0;
const client_address_orm_1 = require("../orm/client-address.orm");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const mapClientAddressModelToDomain = (model) => {
    const json = model.toJSON();
    return {
        ...json,
        updated_at: (json.updated_at instanceof Date) ? json.updated_at : new Date(json.updated_at),
        created_at: (json.created_at instanceof Date) ? json.created_at : new Date(json.created_at)
    };
};
class ClientAddressRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (tx) => {
        const rows = await client_address_orm_1.ClientAddressModel.findAll({
            transaction: tx
        });
        const rowsMap = rows.map((pl) => mapClientAddressModelToDomain(pl));
        return rowsMap;
    };
    findById = async (id, tx) => {
        const row = await client_address_orm_1.ClientAddressModel.findByPk(id, {
            transaction: tx
        });
        return row ? mapClientAddressModelToDomain(row) : null;
    };
    findByClientId = async (client_id, tx) => {
        const row = await client_address_orm_1.ClientAddressModel.findOne({
            transaction: tx,
            where: { client_id }
        });
        return row ? mapClientAddressModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await client_address_orm_1.ClientAddressModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear la nueva dirección del cliente.");
        return mapClientAddressModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await client_address_orm_1.ClientAddressModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "La dirección del cliente que se desea actualizar no fue posible encontrarlo.");
        const existingDomain = mapClientAddressModelToDomain(existing);
        if (!Object.keys(data).length)
            return existingDomain;
        // 2. Aplicar UPDATE
        const [affectedCount] = await client_address_orm_1.ClientAddressModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return existing;
        // 3. Obtener la locación actualizada
        const updated = await client_address_orm_1.ClientAddressModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la dirección del cliente.");
        return mapClientAddressModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await client_address_orm_1.ClientAddressModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la dirección del cliente que se pretende eliminar.");
        const deleted = await client_address_orm_1.ClientAddressModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el cliente.");
        return;
    };
}
exports.ClientAddressRepository = ClientAddressRepository;
