import type { LocationCreateProps, LocationProps, LocationUpdateProps } from "../../domain/location.types";
import type { ILocationRepository } from "../../domain/location.repository.interface";
import { ClientSearchCriteria } from "../../../../../modules/core/client/domain/client.types";
export declare class LocationRepository implements ILocationRepository {
    findAll: (query: ClientSearchCriteria) => Promise<LocationProps[]>;
    findById: (id: string) => Promise<LocationProps | null>;
    findByName: (name: string) => Promise<LocationProps | null>;
    findByCustomId: (custom_id: string) => Promise<LocationProps | null>;
    create: (data: LocationCreateProps) => Promise<LocationProps>;
    update: (id: string, data: LocationUpdateProps) => Promise<LocationProps>;
    delete: (id: string) => Promise<void>;
}
