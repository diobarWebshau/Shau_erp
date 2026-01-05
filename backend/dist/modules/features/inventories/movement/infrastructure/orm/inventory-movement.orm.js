"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryMovementModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@config/mysql/sequelize");
class InventoryMovementModel extends sequelize_1.Model {
    static getAllFields = () => [
        "id", "location_id", "location_name", "item_id",
        "item_type", "item_name", "qty", "movement_type",
        "reference_id", "reference_type", "description",
        "is_locked", "created_at", "production_id"
    ];
    static getEditableField = () => [
        "location_id", "location_name", "item_id",
        "item_type", "item_name", "qty", "movement_type",
        "reference_id", "reference_type", "description",
        "is_locked", "production_id"
    ];
}
exports.InventoryMovementModel = InventoryMovementModel;
InventoryMovementModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    location_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "locations",
            key: "id"
        }
    },
    location_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    item_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    item_type: {
        type: sequelize_1.DataTypes.ENUM("product", "input"),
        allowNull: false
    },
    item_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    qty: {
        type: sequelize_1.DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    movement_type: {
        type: sequelize_1.DataTypes.ENUM("in", "out", "allocate"),
        allowNull: false
    },
    reference_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    reference_type: {
        type: sequelize_1.DataTypes.ENUM('Production Order', 'Order', 'Transfer', "Purchased", "Scrap", "Internal Production Order"),
        allowNull: true
    },
    production_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    is_locked: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "inventory_movements",
    timestamps: false,
    createdAt: "created_at"
});
