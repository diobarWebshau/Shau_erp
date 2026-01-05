"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedProductDiscountClientModel = void 0;
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
class AppliedProductDiscountClientModel extends sequelize_2.Model {
    static getEditableFields = () => [
        "purchase_order_product_id",
        "product_discount_client_id",
    ];
    static getAllFields = () => [
        "id", "purchase_order_product_id",
        "product_discount_client_id", "discount_percentage",
        "created_at", "updated_at"
    ];
}
exports.AppliedProductDiscountClientModel = AppliedProductDiscountClientModel;
AppliedProductDiscountClientModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchase_order_product_id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: true,
    },
    product_discount_client_id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: true,
    },
    discount_percentage: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    created_at: {
        type: sequelize_2.DataTypes.DATE,
        defaultValue: sequelize_2.DataTypes.NOW,
        allowNull: false
    },
    updated_at: {
        type: sequelize_2.DataTypes.DATE,
        defaultValue: sequelize_2.DataTypes.NOW,
        allowNull: false
    }
}, {
    sequelize: sequelize_1.sequelize,
    tableName: "applied_product_discounts_client",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});
