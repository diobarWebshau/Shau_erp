
import { LocationProductionLineModel } from "@modules/features/location/assigments/location-production-line/infrastructure/orm/location-production-line.orm";
import { LocationLocationTypeModel } from "@modules/features/location/assigments/location-location-type/infrastructure/orm/location-location-type.orm";
import { ProductionLineModel } from "@modules/core/production-line/infrastructure/orm/production-lines.orm";
import { LocationTypeModel } from "@modules/core/location-type/infrastructure/orm/location-type.orm";
import { LocationProps, LocationSearchCriteria } from "@modules/core/location/domain/location.types";
import { ILocationQueryRepository } from "../../domain/location-query.repository.interface";
import { LocationModel } from "@modules/core/location/infrastructure/orm/location.orm";
import { LocationFullQueryResult, } from "../../domain/location-query.types"
import { Op, Transaction, WhereOptions } from "sequelize";

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
        const Locations: LocationFullQueryResult[] = results.map(p => p.toJSON());
        return Locations;
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
        const Location: LocationFullQueryResult = result.toJSON();
        return Location;
    };
};
