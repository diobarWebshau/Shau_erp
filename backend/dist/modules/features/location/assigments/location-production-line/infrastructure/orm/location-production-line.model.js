"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationProductionLineModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../../../../../../../config/mysql/sequelize");
class LocationProductionLineModel extends sequelize_1.Model {
    // STATIC METHODS preserved exactly from your original service design
    static getEditableFields = () => [
        "location_id", "production_line_id"
    ];
    static getAllFields = () => [
        "id", "location_id", "production_line_id"
    ];
}
exports.LocationProductionLineModel = LocationProductionLineModel;
LocationProductionLineModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    location_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    production_line_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "locations_production_lines",
    timestamps: false,
});
