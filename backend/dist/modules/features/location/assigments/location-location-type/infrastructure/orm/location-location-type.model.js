"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationLocationTypeModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../../../../../config/mysql/sequelize");
class LocationLocationTypeModel extends sequelize_1.Model {
    // STATIC METHODS preserved exactly from your original service design
    static getEditableFields = () => [
        "location_id", "location_type_id"
    ];
    static getAllFields = () => [
        "id", "location_id", "location_type_id"
    ];
}
exports.LocationLocationTypeModel = LocationLocationTypeModel;
LocationLocationTypeModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    location_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    location_type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "locations_location_types",
    timestamps: false,
});
