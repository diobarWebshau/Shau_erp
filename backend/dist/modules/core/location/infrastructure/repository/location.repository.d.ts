import type { LocationCreateProps, LocationProps, LocationUpdateProps } from "../../domain/location.types";
import type { ILocationRepository } from "../../domain/location.repository.interface";
import { ClientSearchCriteria } from "../../../../core/client/domain/client.types";
import { Transaction } from "sequelize";
export declare class LocationRepository implements ILocationRepository {
    findAll: (query: ClientSearchCriteria, tx?: Transaction) => Promise<LocationProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<LocationProps | null>;
    findByName: (name: string, tx?: Transaction) => Promise<LocationProps | null>;
    findByCustomId: (custom_id: string, tx?: Transaction) => Promise<LocationProps | null>;
    create: (data: LocationCreateProps, tx?: Transaction) => Promise<LocationProps>;
    update: (id: number, data: LocationUpdateProps, tx?: Transaction) => Promise<LocationProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
