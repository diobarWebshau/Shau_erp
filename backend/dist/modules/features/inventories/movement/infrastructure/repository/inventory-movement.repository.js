"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryMovementRepository = void 0;
const inventory_movement_orm_1 = require("../orm/inventory-movement.orm");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const mapModelToDomain = (model) => {
    const json = model.toJSON();
    return {
        ...json,
        qty: Number(json.qty)
    };
};
class InventoryMovementRepository {
    findAll = async (tx) => {
        const inventoryMovementResponses = await inventory_movement_orm_1.InventoryMovementModel.findAll({ transaction: tx });
        const inventoryMovementResponseFormatted = inventoryMovementResponses.map(mapModelToDomain);
        return inventoryMovementResponseFormatted;
    };
    findById = async (id, tx) => {
        const inventoryMovementResponse = await inventory_movement_orm_1.InventoryMovementModel.findByPk(id, { transaction: tx });
        if (!inventoryMovementResponse)
            return null;
        const inventoryMovementResponseFormatted = mapModelToDomain(inventoryMovementResponse);
        return inventoryMovementResponseFormatted;
    };
    create = async (data, tx) => {
        const inventoryMovementResponse = await inventory_movement_orm_1.InventoryMovementModel.create(data, { transaction: tx });
        if (!inventoryMovementResponse)
            throw new http_error_1.default(500, "No fue posible crear el nuevo moviemiento de inventario.");
        const inventoryMovementResponseFormatted = mapModelToDomain(inventoryMovementResponse);
        return inventoryMovementResponseFormatted;
    };
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await inventory_movement_orm_1.InventoryMovementModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El movimiento de inventario que se desea actualizar no fue posible encontrarlo.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await inventory_movement_orm_1.InventoryMovementModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return mapModelToDomain(existing);
        // 3. Obtener la locación actualizada
        const updated = await inventory_movement_orm_1.InventoryMovementModel.findByPk(id, {
            transaction: tx,
            attributes: inventory_movement_orm_1.InventoryMovementModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el movimiento de inventario.");
        return mapModelToDomain(updated);
    };
    delete = async (id, tx) => {
        const existing = await inventory_movement_orm_1.InventoryMovementModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el movimiento de inventario que se pretende eliminar.");
        const deleted = await inventory_movement_orm_1.InventoryMovementModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el movimiento de inventario.");
        return;
    };
}
exports.InventoryMovementRepository = InventoryMovementRepository;
;
