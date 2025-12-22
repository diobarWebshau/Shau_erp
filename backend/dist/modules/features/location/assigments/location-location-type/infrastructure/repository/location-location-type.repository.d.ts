import type { LocationLocationTypeCreateProps, LocationLocationTypeProps, LocationLocationTypeUpdateProps } from "../../domain/location-location-type.types";
import type { ILocationLocationTypeRepository } from "../../domain/location-location-type.repository.interface";
import { Transaction } from "sequelize";
export declare class LocationLocationTypeRepository implements ILocationLocationTypeRepository {
    findAll: () => Promise<LocationLocationTypeProps[]>;
    findById: (id: number) => Promise<LocationLocationTypeProps | null>;
    findByLocationLocationType: (location_id: number, location_type_id: number) => Promise<LocationLocationTypeProps | null>;
    create: (data: LocationLocationTypeCreateProps, tx?: Transaction) => Promise<LocationLocationTypeProps>;
    update: (id: number, data: LocationLocationTypeUpdateProps, tx?: Transaction) => Promise<LocationLocationTypeProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
