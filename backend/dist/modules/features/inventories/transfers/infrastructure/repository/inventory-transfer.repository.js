"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTransferRepository = void 0;
const inventory_transfer_orm_1 = require("../orm/inventory-transfer.orm");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const mapModelToDomain = (model) => {
    const json = model.toJSON();
    return { ...json, qty: Number(json.qty) };
};
class InventoryTransferRepository {
    findAll = async (tx) => {
        const inventoryTransferResponse = await inventory_transfer_orm_1.InventoryTransferModel.findAll({ transaction: tx });
        const inventoryTransferResponseFormatted = inventoryTransferResponse.map(mapModelToDomain);
        return inventoryTransferResponseFormatted;
    };
    findById = async (id, tx) => {
        const inventoryTransferResponse = await inventory_transfer_orm_1.InventoryTransferModel.findByPk(id, { transaction: tx });
        if (!inventoryTransferResponse)
            return null;
        const inventoryTransferResponseFormatted = mapModelToDomain(inventoryTransferResponse);
        return inventoryTransferResponseFormatted;
    };
    create = async (data, tx) => {
        const inventoryTransferResponse = await inventory_transfer_orm_1.InventoryTransferModel.create(data, { transaction: tx });
        if (!inventoryTransferResponse)
            throw new http_error_1.default(500, "No fue posible crear la transferencia del inventario.");
        const inventoryTransferResponseFormatted = mapModelToDomain(inventoryTransferResponse);
        return inventoryTransferResponseFormatted;
    };
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await inventory_transfer_orm_1.InventoryTransferModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "La transferencia de inventario que se desea actualizar no fue posible encontrarlo.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await inventory_transfer_orm_1.InventoryTransferModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return mapModelToDomain(existing);
        // 3. Obtener la locación actualizada
        const updated = await inventory_transfer_orm_1.InventoryTransferModel.findByPk(id, {
            transaction: tx,
            attributes: inventory_transfer_orm_1.InventoryTransferModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la transferencia del inventario.");
        return mapModelToDomain(updated);
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
