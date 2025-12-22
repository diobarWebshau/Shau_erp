import type { LocationCreateProps, LocationProps, LocationUpdateProps } from "../../domain/location.types";
import type { ILocationRepository } from "../../domain/location.repository.interface";
import { Transaction } from "sequelize";
import { ClientSearchCriteria } from "../../../../../modules/core/client/domain/client.types";
export declare class LocationRepository implements ILocationRepository {
    findAll: (query: ClientSearchCriteria) => Promise<LocationProps[]>;
    findById: (id: number) => Promise<LocationProps | null>;
    findByName: (name: string) => Promise<LocationProps | null>;
    findByCustomId: (custom_id: string) => Promise<LocationProps | null>;
    create: (data: LocationCreateProps, tx?: Transaction) => Promise<LocationProps>;
    update: (id: number, data: LocationUpdateProps, tx?: Transaction) => Promise<LocationProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
