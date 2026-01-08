
import { LocationProductionLineModel } from "@modules/features/location/assigments/location-production-line/infrastructure/orm/location-production-line.orm";
import { LocationLocationTypeModel } from "@modules/features/location/assigments/location-location-type/infrastructure/orm/location-location-type.orm";
import { ProductionLineModel } from "@modules/core/production-line/infrastructure/orm/production-lines.orm";
import { LocationTypeModel } from "@modules/core/location-type/infrastructure/orm/location-type.orm";
import { LocationProps, LocationSearchCriteria } from "@modules/core/location/domain/location.types";
import { ILocationQueryRepository } from "../../domain/location-query.repository.interface";
import { LocationModel } from "@modules/core/location/infrastructure/orm/location.orm";
import { LocationFullQueryResult, } from "../../domain/location-query.types"
import { LocationQueryAttributes } from "../orm/location-query-types.orm";
import { Op, Transaction, WhereOptions } from "sequelize";

const mapLocationQueryToDomain = (model: LocationModel): LocationFullQueryResult => {
    const locationQueryAttributes: LocationQueryAttributes = model.toJSON();
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
    })
}


export class LocationQueryRepository implements ILocationQueryRepository {

    // ********** SEQUELIZE **********
    getAllLocationFullQuery = async (query: LocationSearchCriteria, tx?: Transaction): Promise<LocationFullQueryResult[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<LocationProps> = {
            ...(
                exclude_ids?.length
                    ? { id: { [Op.notIn]: exclude_ids } }
                    : {}
            ),
            ...(is_active !== undefined ? { is_active } : {}),
            ...Object.fromEntries(
                Object.entries(rest)
                    .filter(([, v]) => v !== undefined)
                    .map(([k, v]) => [
                        k,
                        Array.isArray(v) ? { [Op.notIn]: v } : v,
                    ])
            ),
            ...(
                filter
                    ? {
                        [Op.or]: [
                            { name: { [Op.like]: `%${filter}%` } },
                            { custom_id: { [Op.like]: `%${filter}%` } },
                        ],
                    }
                    : {}
            ),
        };
        const results: LocationModel[] = await LocationModel.findAll({
            where,
            transaction: tx,
            include: [
                {
                    model: LocationLocationTypeModel,
                    as: "location_location_types",
                    include: [{
                        model: LocationModel,
                        as: "location"
                    }, {
                        model: LocationTypeModel,
                        as: "location_type"
                    }]
                },
                {
                    model: LocationProductionLineModel,
                    as: "location_production_lines",
                    include: [{
                        model: LocationModel,
                        as: "location"
                    }, {
                        model: ProductionLineModel,
                        as: "production_line"
                    }]
                }
            ]
        });
        if (!results.length) return [];
        const locationResult = results.map(mapLocationQueryToDomain);
        return locationResult;
    };

    getByIdLocationFullQuery = async (id: number, tx?: Transaction): Promise<LocationFullQueryResult | null> => {
        const result: LocationModel | null = await LocationModel.findByPk(id, {
            transaction: tx,
            include: [
                {
                    model: LocationLocationTypeModel,
                    as: "location_location_types",
                    include: [{
                        model: LocationModel,
                        as: "location"
                    }, {
                        model: LocationTypeModel,
                        as: "location_type"
                    }]
                },
                {
                    model: LocationProductionLineModel,
                    as: "location_production_lines",
                    include: [{
                        model: LocationModel,
                        as: "location"
                    }, {
                        model: ProductionLineModel,
                        as: "production_line"
                    }]
                }
            ]
        });
        if (!result) return null;
        const Location: LocationFullQueryResult = mapLocationQueryToDomain(result);
        return Location;
    };
};
