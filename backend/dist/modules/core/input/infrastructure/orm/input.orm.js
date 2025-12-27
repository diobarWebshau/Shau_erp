"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputModel = void 0;
const sequelize_1 = require("../../../../../config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
class InputModel extends sequelize_2.Model {
    static getEditableFields() {
        return [
            "custom_id", "name", "description", "sku", "presentation",
            "unit_of_measure", "storage_conditions", "barcode", "input_types_id",
            "unit_cost", "supplier", "photo", "is_draft", "photo", "is_draft",
            "is_active"
        ];
    }
    static getAllFields() {
        return [
            "custom_id", "name", "description", "sku", "presentation",
            "unit_of_measure", "storage_conditions", "barcode", "input_types_id",
            "unit_cost", "supplier", "photo", "is_draft", "photo", "is_draft",
            "is_active", "id", "created_at", "updated_at"
        ];
    }
}
exports.InputModel = InputModel;
InputModel.init({
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
    supplier: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true
    },
    description: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: true,
    },
    presentation: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true,
    },
    input_types_id: {
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
    sku: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true,
    },
    unit_cost: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: true,
    },
    is_active: {
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
    tableName: "inputs",
    createdAt: "created_at",
    updatedAt: "updated_at",
});
