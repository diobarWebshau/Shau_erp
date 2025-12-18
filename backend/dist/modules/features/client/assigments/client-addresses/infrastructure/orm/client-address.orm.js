"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAddressModel = void 0;
const sequelize_1 = require("../../../../../../../config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
class ClientAddressModel extends sequelize_2.Model {
    static getEditableFields = () => [
        "city", "client_id", "country",
        "neighborhood", "state", "street", "street_number",
        "zip_code"
    ];
    static getAllFields = () => [
        "city", "client_id", "country", "created_at", "id",
        "neighborhood", "state", "street", "street_number",
        "updated_at", "zip_code"
    ];
}
exports.ClientAddressModel = ClientAddressModel;
;
ClientAddressModel.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_id: {
        type: sequelize_2.DataTypes.INTEGER,
        references: {
            key: "id",
            model: "clients"
        }
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
    zip_code: {
        type: sequelize_2.DataTypes.INTEGER,
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
    tableName: "clients_addresses",
    sequelize: sequelize_1.sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
