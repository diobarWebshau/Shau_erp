"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderModel = void 0;
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
class PurchasedOrderModel extends sequelize_2.Model {
    static getEditableFields = () => [
        "order_code", "delivery_date",
        "status", "client_id", "company_name",
        "tax_id", "email", "phone", "city",
        "state", "country", "street", "street_number", "neighborhood",
        "payment_terms", "zip_code", "tax_regimen",
        "cfdi", "payment_method", "client_address_id",
        "shipping_street", "shipping_street_number", "shipping_neighborhood", "shipping_city",
        "shipping_state", "shipping_country",
        "shipping_zip_code", "total_price", "created_at"
    ];
    static getAllFields = () => [
        "id", "order_code", "delivery_date",
        "status", "client_id", "company_name",
        "tax_id", "email", "phone", "city",
        "state", "country", "street", "street_number", "neighborhood",
        "payment_terms", "zip_code", "tax_regimen",
        "cfdi", "payment_method", "client_address_id",
        "shipping_street", "shipping_street_number", "shipping_neighborhood", "shipping_city",
        "shipping_state", "shipping_country",
        "shipping_zip_code", "total_price",
        "created_at", "updated_at"
    ];
}
exports.PurchasedOrderModel = PurchasedOrderModel;
PurchasedOrderModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_code: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    delivery_date: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    // client fields
    client_id: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            model: "clients",
            key: "id"
        },
    },
    company_name: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    tax_id: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    city: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    state: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    country: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    street: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    street_number: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false
    },
    neighborhood: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    payment_terms: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    zip_code: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false
    },
    tax_regimen: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    cfdi: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    payment_method: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    // shipping fields(client address)
    client_address_id: {
        type: sequelize_2.DataTypes.INTEGER
    },
    shipping_street: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    shipping_street_number: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false
    },
    shipping_neighborhood: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    shipping_city: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    shipping_state: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    shipping_country: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    shipping_zip_code: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false
    },
    //
    total_price: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    created_at: {
        type: sequelize_2.DataTypes.DATE(),
        // defaultValue: DataTypes.NOW(),
        allowNull: false
    },
    updated_at: {
        type: sequelize_2.DataTypes.DATE(),
        // defaultValue: DataTypes.NOW(),
        allowNull: false
    }
}, {
    sequelize: sequelize_1.sequelize,
    tableName: "purchased_orders",
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at"
});
