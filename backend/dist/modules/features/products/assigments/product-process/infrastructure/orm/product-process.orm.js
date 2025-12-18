"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductProcessModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../../../../../config/mysql/sequelize");
class ProductProcessModel extends sequelize_1.Model {
    static getEditableFields = () => [
        "process_id", "process_id", "sort_order"
    ];
    static getAllFields = () => [
        "id", "process_id", "product_id", "sort_order"
    ];
}
exports.ProductProcessModel = ProductProcessModel;
ProductProcessModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    process_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sort_order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "products_processes",
    timestamps: false,
});
