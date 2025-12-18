"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const sequelize_1 = require("../../../../../config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
class ClientModel extends sequelize_2.Model {
    static getEditableFields = () => [
        "cfdi", "city", "company_name", "country",
        "credit_limit", "email",
        "is_active", "neighborhood", "payment_method",
        "payment_terms", "phone", "state", "street",
        "street_number", "tax_id", "tax_regimen",
        "zip_code"
    ];
    static getAllFields = () => [
        "cfdi", "city", "company_name", "country",
        "created_at", "credit_limit", "email",
        "id", "is_active", "neighborhood", "payment_method",
        "payment_terms", "phone", "state", "street",
        "street_number", "tax_id", "tax_regimen",
        "updated_at", "zip_code"
    ];
}
exports.ClientModel = ClientModel;
;
ClientModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    company_name: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
        allowNull: true
    },
    credit_limit: {
        type: sequelize_2.DataTypes.DECIMAL(14, 4),
        allowNull: true
    },
    zip_code: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false
    },
    tax_regimen: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true
    },
    cfdi: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: false
    },
    payment_method: {
        type: sequelize_2.DataTypes.STRING(100),
        allowNull: true
    },
    is_active: {
        type: sequelize_2.DataTypes.TINYINT,
        defaultValue: true,
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
    tableName: "clients",
    sequelize: sequelize_1.sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
