"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAddressRepository = void 0;
const http_error_1 = __importDefault(require("../../../../../../../shared/errors/http/http-error"));
const client_address_orm_1 = require("../orm/client-address.orm");
const sequelize_1 = require("../../../../../../../config/mysql/sequelize");
const sequelize_2 = require("sequelize");
const mapModelToDomain = (model) => {
    const json = model.toJSON();
    return {
        id: json.id,
        city: json.city,
        country: json.country,
        created_at: json.created_at,
        neighborhood: json.neighborhood,
        state: json.state,
        street: json.street,
        street_number: json.street_number,
        updated_at: json.updated_at,
        zip_code: json.zip_code,
        client_id: json.client_id
    };
};
class ClientAddressRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async () => {
        const rows = await client_address_orm_1.ClientAddressModel.findAll({
            attributes: client_address_orm_1.ClientAddressModel.getAllFields()
        });
        const rowsMap = rows.map((pl) => mapModelToDomain(pl));
        return rowsMap;
    };
    findById = async (id) => {
        const row = await client_address_orm_1.ClientAddressModel.findByPk(id, {
            attributes: client_address_orm_1.ClientAddressModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByClientId = async (client_id) => {
        const row = await client_address_orm_1.ClientAddressModel.findOne({
            where: { client_id },
            attributes: client_address_orm_1.ClientAddressModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data) => {
        const transaction = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created = await client_address_orm_1.ClientAddressModel.create(data, { transaction });
            if (!created)
                throw new http_error_1.default(500, "No fue posible crear la nueva dirección del cliente.");
            await transaction.commit();
            return mapModelToDomain(created);
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data) => {
        const transaction = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            // 1. Verificar existencia
            const existing = await client_address_orm_1.ClientAddressModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "La dirección del cliente que se desea actualizar no fue posible encontrarlo.");
            // 2. Aplicar UPDATE
            const [affectedCount] = await client_address_orm_1.ClientAddressModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new http_error_1.default(500, "No fue posible actualizar la dirección del cliente.");
            // 3. Obtener la locación actualizada
            const updated = await client_address_orm_1.ClientAddressModel.findByPk(id, {
                transaction,
                attributes: client_address_orm_1.ClientAddressModel.getAllFields(),
            });
            await transaction.commit();
            if (!updated)
                throw new http_error_1.default(500, "No fue posible actualizar la dirección del cliente.");
            return mapModelToDomain(updated);
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id) => {
        const transaction = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const existing = await client_address_orm_1.ClientAddressModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "No se encontro la dirección del cliente que se pretende eliminar.");
            const deleted = await client_address_orm_1.ClientAddressModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted)
                throw new http_error_1.default(500, "No fue posible eliminar el cliente.");
            await transaction.commit();
            return;
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };
}
exports.ClientAddressRepository = ClientAddressRepository;
