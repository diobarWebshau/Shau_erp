"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInputProcessModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../../../../../config/mysql/sequelize");
;
class ProductInputProcessModel extends sequelize_1.Model {
    static getEditableFields = () => [
        "product_input_id", "product_process_id", "product_id", "qty"
    ];
    static getAllFields = () => [
        "id", "product_input_id", "product_process_id", "product_id", "qty"
    ];
}
exports.ProductInputProcessModel = ProductInputProcessModel;
ProductInputProcessModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    product_input_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    product_process_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    qty: {
        type: sequelize_1.DataTypes.DECIMAL(14, 4),
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "products_inputs_processes",
    timestamps: false,
});
