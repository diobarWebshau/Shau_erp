import { LocationSearchCriteria } from "@modules/core/location/domain/location.types";
import { ILocationQueryRepository } from "../../domain/location-query.repository.interface";
import { LocationFullQueryResult } from "../../domain/location-query.types";
import { Transaction } from "sequelize";
export declare class LocationQueryRepository implements ILocationQueryRepository {
    getAllLocationFullQuery: (query: LocationSearchCriteria, tx?: Transaction) => Promise<LocationFullQueryResult[]>;
    getByIdLocationFullQuery: (id: number, tx?: Transaction) => Promise<LocationFullQueryResult | null>;
}
