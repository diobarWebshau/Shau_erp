"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryMovementRepository = void 0;
const inventory_movement_orm_1 = require("../orm/inventory-movement.orm");
const decimal_vo_1 = require("@shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const mapInventoryMovementModelToDomain = (model) => {
    const inventoryMovementAttributes = model.toJSON();
    return {
        ...inventoryMovementAttributes,
        reference_id: inventoryMovementAttributes.reference_id ? inventoryMovementAttributes.reference_id : null,
        production_id: inventoryMovementAttributes.production_id ? inventoryMovementAttributes.production_id : null,
        description: inventoryMovementAttributes.description ? inventoryMovementAttributes.description : null,
        qty: decimal_vo_1.DecimalVO.from(inventoryMovementAttributes.qty),
        created_at: inventoryMovementAttributes.created_at instanceof Date ? inventoryMovementAttributes.created_at : new Date(inventoryMovementAttributes.created_at)
    };
};
const mapInventoryMovementCreateDomainToModel = (data) => ({
    ...data,
    qty: data.qty.toString(),
});
const mapInventoryMovementUpdateDomainToModel = (data) => {
    const { qty, ...rest } = data;
    return {
        ...rest,
        ...(qty !== undefined
            ? { qty: qty.toString() }
            : {}),
    };
};
class InventoryMovementRepository {
    findAll = async (tx) => {
        const inventoryMovementResponses = await inventory_movement_orm_1.InventoryMovementModel.findAll({ transaction: tx });
        const inventoryMovementResponseFormatted = inventoryMovementResponses.map(mapInventoryMovementModelToDomain);
        return inventoryMovementResponseFormatted;
    };
    findById = async (id, tx) => {
        const inventoryMovementResponse = await inventory_movement_orm_1.InventoryMovementModel.findByPk(id, { transaction: tx });
        if (!inventoryMovementResponse)
            return null;
        const inventoryMovementResponseFormatted = mapInventoryMovementModelToDomain(inventoryMovementResponse);
        return inventoryMovementResponseFormatted;
    };
    create = async (data, tx) => {
        const inventoryMovementResponse = await inventory_movement_orm_1.InventoryMovementModel.create(mapInventoryMovementCreateDomainToModel(data), { transaction: tx });
        if (!inventoryMovementResponse)
            throw new http_error_1.default(500, "No fue posible crear el nuevo moviemiento de inventario.");
        const inventoryMovementResponseFormatted = mapInventoryMovementModelToDomain(inventoryMovementResponse);
        return inventoryMovementResponseFormatted;
    };
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await inventory_movement_orm_1.InventoryMovementModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El movimiento de inventario que se desea actualizar no fue posible encontrarlo.");
        const existingDomain = mapInventoryMovementModelToDomain(existing);
        if (!Object.keys(data).length)
            return existingDomain;
        const [affectedCount] = await inventory_movement_orm_1.InventoryMovementModel.update(mapInventoryMovementUpdateDomainToModel(data), { where: { id }, transaction: tx });
        if (!affectedCount)
            return existingDomain;
        const updated = await inventory_movement_orm_1.InventoryMovementModel.findByPk(id, {
            transaction: tx
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el movimiento de inventario.");
        return mapInventoryMovementModelToDomain(updated);
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
