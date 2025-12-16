import type { LocationLocationTypeCreateProps, LocationLocationTypeProps, LocationLocationTypeUpdateProps } from "../../domain/location-location-type.types";
import type { ILocationLocationTypeRepository } from "../../domain/location-location-type.repository.interface";
export declare class LocationLocationTypeRepository implements ILocationLocationTypeRepository {
    findAll: () => Promise<LocationLocationTypeProps[]>;
    findById: (id: string) => Promise<LocationLocationTypeProps | null>;
    create: (data: LocationLocationTypeCreateProps) => Promise<LocationLocationTypeProps>;
    update: (id: string, data: LocationLocationTypeUpdateProps) => Promise<LocationLocationTypeProps>;
    delete: (id: string) => Promise<void>;
}
