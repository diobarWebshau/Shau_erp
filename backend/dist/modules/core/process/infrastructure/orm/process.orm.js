"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../../../config/mysql/sequelize");
class ProcessModel extends sequelize_1.Model {
    static getAllFields = () => ["id", "name", "created_at", "updated_at"];
    static getEditableFields = () => ["name"];
}
exports.ProcessModel = ProcessModel;
ProcessModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "processes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});
