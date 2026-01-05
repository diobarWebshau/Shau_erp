"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
class InventoryLocationItemModel extends sequelize_2.Model {
    static getAllFields = () => [
        "id", "inventory_id", "item_type", "item_id",
        "location_id", "created_at", "updated_at"
    ];
    static getEditableFields = () => [
        "inventory_id", "location_id", "item_type", "item_id",
    ];
}
InventoryLocationItemModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    inventory_id: {
        type: sequelize_2.DataTypes.INTEGER,
    },
    location_id: {
        type: sequelize_2.DataTypes.INTEGER,
    },
    item_type: {
        type: sequelize_2.DataTypes.ENUM,
        values: ['product', 'input'],
        allowNull: false
    },
    item_id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_2.DataTypes.NOW
    },
    updated_at: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_2.DataTypes.NOW
    },
}, {
    sequelize: sequelize_1.sequelize,
    tableName: "inventories_locations_items",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});
exports.default = InventoryLocationItemModel;
