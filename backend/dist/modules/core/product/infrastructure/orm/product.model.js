"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const sequelize_1 = require("../../../../../config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
class ProductModel extends sequelize_2.Model {
    static getEditableFields() {
        return [
            "name", "storage_conditions", "description", "unit_of_measure", "presentation",
            "production_cost", "barcode", "type", "sku", "sale_price",
            "active", "photo", "is_draft", "custom_id"
        ];
    }
    static getAllFields() {
        return [
            "id", "updated_at", "created_at",
            "name", "storage_conditions", "description", "unit_of_measure", "presentation",
            "production_cost", "barcode", "type", "sku", "sale_price",
            "active", "photo", "is_draft", "custom_id"
        ];
    }
}
exports.ProductModel = ProductModel;
ProductModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    custom_id: {
        type: sequelize_2.DataTypes.STRING(100),
        unique: true,
        allowNull: true,
    },
    storage_conditions: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: true,
    },
    unit_of_measure: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true
    },
    name: {
        type: sequelize_2.DataTypes.STRING(100),
        unique: true,
        allowNull: true,
    },
    description: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: true,
    },
    presentation: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true,
    },
    production_cost: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: true,
    },
    is_draft: {
        type: sequelize_2.DataTypes.TINYINT,
    },
    barcode: {
        type: sequelize_2.DataTypes.BIGINT,
        allowNull: true,
    },
    type: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true,
    },
    sku: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true,
    },
    sale_price: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: true,
    },
    active: {
        type: sequelize_2.DataTypes.TINYINT,
        allowNull: true,
    },
    photo: {
        type: sequelize_2.DataTypes.STRING(200),
        allowNull: true,
    },
    created_at: {
        type: sequelize_2.DataTypes.DATE(),
        defaultValue: sequelize_2.DataTypes.NOW(),
        allowNull: false,
    },
    updated_at: {
        type: sequelize_2.DataTypes.DATE(),
        defaultValue: sequelize_2.DataTypes.NOW(),
        allowNull: false,
    }
}, {
    sequelize: sequelize_1.sequelize,
    timestamps: true,
    tableName: "products",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
