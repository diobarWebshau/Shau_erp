"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineProductModel = void 0;
const sequelize_js_1 = require("@config/mysql/sequelize.js");
const sequelize_1 = require("sequelize");
class ProductionLineProductModel extends sequelize_1.Model {
    static getEditableFields = () => [
        "product_id", "production_line_id"
    ];
    static getAllFields = () => [
        "id", "product_id", "production_line_id"
    ];
}
exports.ProductionLineProductModel = ProductionLineProductModel;
ProductionLineProductModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    production_line_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    sequelize: sequelize_js_1.sequelize,
    tableName: "production_lines_products",
    timestamps: false
});
