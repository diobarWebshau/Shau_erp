"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryLocationItemRepository = void 0;
const inventory_location_item_orm_1 = __importDefault(require("../orm/inventory-location-item.orm"));
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const mapModelToDomain = (model) => {
    const json = model.toJSON();
    return { ...json };
};
class InventoryLocationItemRepository {
    findAll = async (tx) => {
        const inventoryLocationItemResponses = await inventory_location_item_orm_1.default.findAll({ transaction: tx });
        const inventoryLocationItemResponsesFormatted = inventoryLocationItemResponses.map(mapModelToDomain);
        return inventoryLocationItemResponsesFormatted;
    };
    findById = async (id, tx) => {
        const inventoryLocationItemResponse = await inventory_location_item_orm_1.default.findByPk(id, { transaction: tx });
        if (!inventoryLocationItemResponse)
            return null;
        const inventoryLocationItemResponsesFormatted = mapModelToDomain(inventoryLocationItemResponse);
        return inventoryLocationItemResponsesFormatted;
    };
    findByLocationItem = async (location_id, item_id, item_type, tx) => {
        const inventoryLocationItemResponse = await inventory_location_item_orm_1.default.findOne({
            where: {
                location_id: location_id,
                item_id: item_id,
                item_type: item_type
            },
            transaction: tx
        });
        if (!inventoryLocationItemResponse)
            return null;
        const inventoryLocationItemResponsesFormatted = mapModelToDomain(inventoryLocationItemResponse);
        return inventoryLocationItemResponsesFormatted;
    };
    create = async (data, tx) => {
        const InventoryLocationItemResponse = await inventory_location_item_orm_1.default.create(data, { transaction: tx });
        if (!InventoryLocationItemResponse)
            throw new http_error_1.default(500, "No fue posible crear la asignacion de inventario del item a la locación.");
        const InventoryLocationItemResponseFormatted = mapModelToDomain(InventoryLocationItemResponse);
        return InventoryLocationItemResponseFormatted;
    };
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await inventory_location_item_orm_1.default.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "La asignacion de inventario del item a la locación indicada que se desea actualizar no fue posible encontrarlo.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await inventory_location_item_orm_1.default.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return mapModelToDomain(existing);
        // 3. Obtener la locación actualizada
        const updated = await inventory_location_item_orm_1.default.findByPk(id, {
            transaction: tx,
            attributes: inventory_location_item_orm_1.default.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la asignacion de inventario del item a la locación indicada.");
        return mapModelToDomain(updated);
    };
    delete = async (id, tx) => {
        const existing = await inventory_location_item_orm_1.default.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la asignacion de inventario del item a la locación que se pretende eliminar.");
        const deleted = await inventory_location_item_orm_1.default.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar la asignacion de inventario del item a la locación indicada.");
        return;
    };
}
exports.InventoryLocationItemRepository = InventoryLocationItemRepository;
;
