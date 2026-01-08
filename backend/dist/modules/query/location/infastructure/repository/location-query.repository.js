"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationQueryRepository = void 0;
const location_production_line_orm_1 = require("@modules/features/location/assigments/location-production-line/infrastructure/orm/location-production-line.orm");
const location_location_type_orm_1 = require("@modules/features/location/assigments/location-location-type/infrastructure/orm/location-location-type.orm");
const production_lines_orm_1 = require("@modules/core/production-line/infrastructure/orm/production-lines.orm");
const location_type_orm_1 = require("@modules/core/location-type/infrastructure/orm/location-type.orm");
const location_orm_1 = require("@modules/core/location/infrastructure/orm/location.orm");
const sequelize_1 = require("sequelize");
const mapLocationQueryToDomain = (model) => {
    const locationQueryAttributes = model.toJSON();
    const { location_location_types, location_production_line, ...rest } = locationQueryAttributes;
    return ({
        ...rest,
        location_production_lines: location_production_line.map((lpl) => ({
            ...lpl,
            production_line: {
                ...lpl.production_line,
                created_at: lpl.production_line.created_at instanceof Date
                    ? lpl.production_line.created_at
                    : new Date(lpl.production_line.created_at),
                updated_at: lpl.production_line.updated_at instanceof Date
                    ? lpl.production_line.updated_at
                    : new Date(lpl.production_line.updated_at)
            },
            location: {
                ...lpl.location,
                created_at: lpl.location.created_at instanceof Date
                    ? lpl.location.created_at
                    : new Date(lpl.location.created_at),
                updated_at: lpl.location.updated_at instanceof Date
                    ? lpl.location.updated_at
                    : new Date(lpl.location.updated_at)
            },
        })),
        location_location_types: location_location_types.map((llt) => ({
            ...llt,
            location: {
                ...llt.location,
                created_at: llt.location.created_at instanceof Date
                    ? llt.location.created_at
                    : new Date(llt.location.created_at),
                updated_at: llt.location.updated_at instanceof Date
                    ? llt.location.updated_at
                    : new Date(llt.location.updated_at)
            },
            location_type: {
                ...llt.location_type,
                created_at: llt.location_type.created_at instanceof Date
                    ? llt.location_type.created_at
                    : new Date(llt.location_type.created_at),
                updated_at: llt.location_type.updated_at instanceof Date
                    ? llt.location_type.updated_at
                    : new Date(llt.location_type.updated_at)
            }
        })),
        created_at: (rest.created_at instanceof Date)
            ? rest.created_at
            : new Date(rest.created_at),
        updated_at: (rest.updated_at instanceof Date)
            ? rest.updated_at
            : new Date(rest.updated_at)
    });
};
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
        const locationResult = results.map(mapLocationQueryToDomain);
        return locationResult;
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
        const Location = mapLocationQueryToDomain(result);
        return Location;
    };
}
exports.LocationQueryRepository = LocationQueryRepository;
;
