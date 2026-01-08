"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTransferRepository = void 0;
const inventory_transfer_orm_1 = require("../orm/inventory-transfer.orm");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const mapInventoryTransferModelToDomain = (model) => {
    const json = model.toJSON();
    return {
        ...json,
        qty: decimal_vo_1.DecimalVO.from(json.qty)
    };
};
const mapInventoryTransferCreateDomainToModel = (data) => {
    return {
        ...data,
        qty: data.qty.toString()
    };
};
const mapInventoryTransferUpdateDomainToModel = (data) => {
    const { qty, ...rest } = data;
    return {
        ...rest,
        ...(qty !== undefined
            ? { qty: qty.toString() }
            : {})
    };
};
class InventoryTransferRepository {
    findAll = async (tx) => {
        const inventoryTransferResponse = await inventory_transfer_orm_1.InventoryTransferModel.findAll({ transaction: tx });
        const inventoryTransferResponseFormatted = inventoryTransferResponse.map(mapInventoryTransferModelToDomain);
        return inventoryTransferResponseFormatted;
    };
    findById = async (id, tx) => {
        const inventoryTransferResponse = await inventory_transfer_orm_1.InventoryTransferModel.findByPk(id, { transaction: tx });
        if (!inventoryTransferResponse)
            return null;
        const inventoryTransferResponseFormatted = mapInventoryTransferModelToDomain(inventoryTransferResponse);
        return inventoryTransferResponseFormatted;
    };
    create = async (data, tx) => {
        const inventoryTransferResponse = await inventory_transfer_orm_1.InventoryTransferModel.create(mapInventoryTransferCreateDomainToModel(data), { transaction: tx });
        if (!inventoryTransferResponse)
            throw new http_error_1.default(500, "No fue posible crear la transferencia del inventario.");
        const inventoryTransferResponseFormatted = mapInventoryTransferModelToDomain(inventoryTransferResponse);
        return inventoryTransferResponseFormatted;
    };
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await inventory_transfer_orm_1.InventoryTransferModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "La transferencia de inventario que se desea actualizar no fue posible encontrarlo.");
        const existingDomain = mapInventoryTransferModelToDomain(existing);
        if (!Object.keys(data).length)
            return existingDomain;
        const [affectedCount] = await inventory_transfer_orm_1.InventoryTransferModel.update(mapInventoryTransferUpdateDomainToModel(data), {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return existingDomain;
        const updated = await inventory_transfer_orm_1.InventoryTransferModel.findByPk(id, {
            transaction: tx,
            attributes: inventory_transfer_orm_1.InventoryTransferModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la transferencia del inventario.");
        return mapInventoryTransferModelToDomain(updated);
    };
    delete = async (id, tx) => {
        const existing = await inventory_transfer_orm_1.InventoryTransferModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la transferencia de inventario que se pretende eliminar.");
        const deleted = await inventory_transfer_orm_1.InventoryTransferModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar la transferencia de inventario indicada.");
        return;
    };
}
exports.InventoryTransferRepository = InventoryTransferRepository;
;
