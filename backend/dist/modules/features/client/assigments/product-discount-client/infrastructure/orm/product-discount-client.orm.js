"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountClientModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../../../../../config/mysql/sequelize");
;
class ProductDiscountClientModel extends sequelize_1.Model {
    static getEditableFields = () => [
        "product_id", "client_id", "discount_percentage"
    ];
    static getAllFields = () => [
        "product_id", "client_id", "discount_percentage",
        "id", "created_at", "updated_at"
    ];
}
exports.ProductDiscountClientModel = ProductDiscountClientModel;
ProductDiscountClientModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    client_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    discount_percentage: {
        type: sequelize_1.DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE(),
        defaultValue: sequelize_1.DataTypes.NOW(),
        allowNull: false,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE(),
        defaultValue: sequelize_1.DataTypes.NOW(),
        allowNull: false,
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "product_discounts_clients",
    timestamps: false,
});
