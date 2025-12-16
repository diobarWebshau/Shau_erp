"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineModel = void 0;
const sequelize_1 = require("../../../../../config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
class ProductionLineModel extends sequelize_2.Model {
    static getEditableFields = () => [
        "name", "custom_id", "is_active"
    ];
    static getAllFields = () => [
        "id", "name", "custom_id", "is_active", "created_at", "updated_at",
    ];
}
exports.ProductionLineModel = ProductionLineModel;
;
ProductionLineModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true,
        unique: true,
    },
    custom_id: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true,
    },
    is_active: {
        type: sequelize_2.DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
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
    tableName: "production_lines",
    sequelize: sequelize_1.sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
