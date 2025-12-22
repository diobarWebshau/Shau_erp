"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../../../config/mysql/sequelize");
class LocationModel extends sequelize_1.Model {
    // STATIC METHODS preserved exactly from your original service design
    static getEditableFields = () => [
        "name", "description", "phone",
        "street", "street_number", "neighborhood",
        "city", "state", "country", "zip_code",
        "production_capacity", "location_manager", "custom_id",
        "is_active"
    ];
    static getAllFields = () => [
        "id", "name", "description",
        "phone",
        "street", "street_number", "neighborhood",
        "city", "state", "country", "zip_code",
        "production_capacity", "location_manager", "custom_id",
        "is_active", "created_at", "updated_at",
    ];
}
exports.LocationModel = LocationModel;
LocationModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    production_capacity: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    location_manager: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    custom_id: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    street: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    street_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    neighborhood: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    state: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    zip_code: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "locations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
