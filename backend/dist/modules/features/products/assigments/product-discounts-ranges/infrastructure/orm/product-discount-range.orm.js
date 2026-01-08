"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountRangeModel = void 0;
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
class ProductDiscountRangeModel extends sequelize_2.Model {
    static getEditableFields = () => [
        "product_id", "max_qty", "min_qty", "unit_price"
    ];
    static getAllFields = () => [
        "product_id", "max_qty", "min_qty", "unit_price",
        "id", "created_at", "updated_at"
    ];
}
exports.ProductDiscountRangeModel = ProductDiscountRangeModel;
ProductDiscountRangeModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false
    },
    min_qty: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    max_qty: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    unit_price: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false
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
    tableName: "product_discounts_ranges",
    timestamps: false,
});
