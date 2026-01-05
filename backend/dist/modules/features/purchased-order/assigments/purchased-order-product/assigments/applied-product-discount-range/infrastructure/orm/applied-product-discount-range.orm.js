"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedProductDiscountRangeModel = void 0;
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
class AppliedProductDiscountRangeModel extends sequelize_2.Model {
    static getEditableFields = () => [
        "product_discount_range_id",
        "purchase_order_product_id",
        "unit_discount",
        "min_qty",
        "max_qty"
    ];
    static getAllFields = () => [
        "id", "product_discount_range_id",
        "purchase_order_product_id",
        "unit_discount",
        "min_qty",
        "max_qty",
        "created_at",
        "updated_at"
    ];
}
exports.AppliedProductDiscountRangeModel = AppliedProductDiscountRangeModel;
;
AppliedProductDiscountRangeModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchase_order_product_id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: true,
    },
    product_discount_range_id: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: true,
    },
    unit_discount: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    max_qty: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    min_qty: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    created_at: {
        type: sequelize_2.DataTypes.DATE,
        defaultValue: sequelize_2.DataTypes.NOW,
        allowNull: false,
    },
    updated_at: {
        type: sequelize_2.DataTypes.DATE,
        defaultValue: sequelize_2.DataTypes.NOW,
        allowNull: false,
    }
}, {
    sequelize: sequelize_1.sequelize,
    tableName: "applied_product_discounts_ranges",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
