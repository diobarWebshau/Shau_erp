"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderProductModel = void 0;
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
class PurchasedOrderProductModel extends sequelize_2.Model {
    static getEditableFields = () => [
        "purchase_order_id", "qty", "status", "recorded_price", "price_edit_source"
    ];
    static getAllFields = () => [
        "id", "purchase_order_id", "product_id", "price_edit_source",
        "qty", "product_name", "recorded_price",
        "status", "original_price"
    ];
}
exports.PurchasedOrderProductModel = PurchasedOrderProductModel;
;
PurchasedOrderProductModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchase_order_id: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            model: "purchased_orders",
            key: "id"
        },
        allowNull: true
    },
    product_id: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            model: "products",
            key: "id"
        },
        allowNull: true
    },
    qty: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    recorded_price: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    price_edit_source: {
        type: sequelize_2.DataTypes.ENUM("manual", "range"),
        allowNull: true,
    },
    product_name: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false,
    },
    original_price: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    status: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize: sequelize_1.sequelize,
    tableName: "purchased_orders_products",
    timestamps: false
});
