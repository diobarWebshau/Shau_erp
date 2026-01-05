"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModel = void 0;
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
class InventoryModel extends sequelize_2.Model {
    static getAllFields = () => [
        "id", "stock", "minimum_stock",
        "maximum_stock", "lead_time",
        "created_at", "updated_at"
    ];
    static getEditableFields = () => [
        "stock", "minimum_stock",
        "maximum_stock", "lead_time"
    ];
}
exports.InventoryModel = InventoryModel;
InventoryModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    stock: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    minimum_stock: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    maximum_stock: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    lead_time: {
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
    tableName: "inventories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});
