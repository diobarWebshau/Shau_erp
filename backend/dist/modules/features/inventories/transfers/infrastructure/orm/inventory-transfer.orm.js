"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTransferModel = void 0;
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
class InventoryTransferModel extends sequelize_2.Model {
    static getAllFields() {
        return [
            "id", "item_type", "item_id", "qty",
            "reason", "status", "source_location_id",
            "destination_location_id",
            "created_at", "updated_at"
        ];
    }
    static getEditableFields() {
        return [
            "status", "reason", "qty"
        ];
    }
}
exports.InventoryTransferModel = InventoryTransferModel;
InventoryTransferModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    item_type: {
        type: sequelize_2.DataTypes.ENUM("product", "input"),
        allowNull: false,
    },
    item_id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
    },
    item_name: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    qty: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    reason: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_2.DataTypes.ENUM("completed", "canceled"),
        allowNull: false,
    },
    source_location_id: {
        type: sequelize_2.DataTypes.INTEGER,
    },
    destination_location_id: {
        type: sequelize_2.DataTypes.INTEGER,
    },
    created_at: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_2.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_2.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_1.sequelize,
    tableName: "inventory_transfers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
