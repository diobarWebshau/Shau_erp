"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryQueryRepository = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@config/mysql/sequelize");
class InventoryQueryRepository {
    findAll = async (tx) => {
        const inventoryQueryResponse = await sequelize_2.sequelize.query('CALL getInventoryAllLocations();', { type: sequelize_1.QueryTypes.SELECT, transaction: tx });
        const raw = inventoryQueryResponse.shift()?.[0];
        if (!raw)
            return [];
        const response = raw.inventories;
        return response;
    };
    findByInventoryId = async (inventory_id, tx) => {
        const inventoryQueryResponse = await sequelize_2.sequelize.query("CALL getInventoryOnLocationById(:inventory_id);", {
            type: sequelize_1.QueryTypes.SELECT,
            replacements: { inventory_id: inventory_id },
            transaction: tx
        });
        const raw = inventoryQueryResponse.shift()?.[0];
        if (!raw)
            return null;
        const response = raw.inventory;
        return response;
    };
    findAllLikeTo = async (query, tx) => {
        const inventoryQueryResponse = await sequelize_2.sequelize.query("CALL getInventoryAllLocationsToLike(:search);", {
            type: sequelize_1.QueryTypes.SELECT,
            transaction: tx,
            replacements: { search: query?.filter.trim() || null },
        });
        const raw = inventoryQueryResponse.shift()?.[0];
        if (!raw)
            return [];
        const response = raw.inventories;
        return response;
    };
}
exports.InventoryQueryRepository = InventoryQueryRepository;
;
