"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationQueryRepository = void 0;
const location_production_line_orm_1 = require("@modules/features/location/assigments/location-production-line/infrastructure/orm/location-production-line.orm");
const location_location_type_orm_1 = require("@modules/features/location/assigments/location-location-type/infrastructure/orm/location-location-type.orm");
const production_lines_orm_1 = require("@modules/core/production-line/infrastructure/orm/production-lines.orm");
const location_type_orm_1 = require("@modules/core/location-type/infrastructure/orm/location-type.orm");
const location_orm_1 = require("@modules/core/location/infrastructure/orm/location.orm");
const sequelize_1 = require("sequelize");
class LocationQueryRepository {
    // ********** SEQUELIZE **********
    getAllLocationFullQuery = async (query, tx) => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where = {
            ...(exclude_ids?.length
                ? { id: { [sequelize_1.Op.notIn]: exclude_ids } }
                : {}),
            ...(is_active !== undefined ? { is_active } : {}),
            ...Object.fromEntries(Object.entries(rest)
                .filter(([, v]) => v !== undefined)
                .map(([k, v]) => [
                k,
                Array.isArray(v) ? { [sequelize_1.Op.notIn]: v } : v,
            ])),
            ...(filter
                ? {
                    [sequelize_1.Op.or]: [
                        { name: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { custom_id: { [sequelize_1.Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const results = await location_orm_1.LocationModel.findAll({
            where,
            transaction: tx,
            include: [
                {
                    model: location_location_type_orm_1.LocationLocationTypeModel,
                    as: "location_location_types",
                    include: [{
                            model: location_orm_1.LocationModel,
                            as: "location"
                        }, {
                            model: location_type_orm_1.LocationTypeModel,
                            as: "location_type"
                        }]
                },
                {
                    model: location_production_line_orm_1.LocationProductionLineModel,
                    as: "location_production_lines",
                    include: [{
                            model: location_orm_1.LocationModel,
                            as: "location"
                        }, {
                            model: production_lines_orm_1.ProductionLineModel,
                            as: "production_line"
                        }]
                }
            ]
        });
        if (!results.length)
            return [];
        const Locations = results.map(p => p.toJSON());
        return Locations;
    };
    getByIdLocationFullQuery = async (id, tx) => {
        const result = await location_orm_1.LocationModel.findByPk(id, {
            transaction: tx,
            include: [
                {
                    model: location_location_type_orm_1.LocationLocationTypeModel,
                    as: "location_location_types",
                    include: [{
                            model: location_orm_1.LocationModel,
                            as: "location"
                        }, {
                            model: location_type_orm_1.LocationTypeModel,
                            as: "location_type"
                        }]
                },
                {
                    model: location_production_line_orm_1.LocationProductionLineModel,
                    as: "location_production_lines",
                    include: [{
                            model: location_orm_1.LocationModel,
                            as: "location"
                        }, {
                            model: production_lines_orm_1.ProductionLineModel,
                            as: "production_line"
                        }]
                }
            ]
        });
        if (!result)
            return null;
        const Location = result.toJSON();
        return Location;
    };
}
exports.LocationQueryRepository = LocationQueryRepository;
;
