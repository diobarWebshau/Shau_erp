"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInputModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../../../../../config/mysql/sequelize");
;
class ProductInputModel extends sequelize_1.Model {
    static getEditableFields = () => [
        "input_id", "product_id", "equivalence"
    ];
    static getAllFields = () => [
        "id", "input_id", "product_id", "equivalence"
    ];
}
exports.ProductInputModel = ProductInputModel;
ProductInputModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    input_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    equivalence: {
        type: sequelize_1.DataTypes.DECIMAL(14, 4),
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "products_inputs",
    timestamps: false,
});
