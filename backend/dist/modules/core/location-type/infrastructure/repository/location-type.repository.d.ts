import type { LocationTypeProps, LocationTypeCreateProps, LocationTypeUpdateProps } from "../../domain/location-type.types";
import type { ILocationTypeRepository } from "../../domain/location-type.repository";
export declare class LocationTypeRepository implements ILocationTypeRepository {
    findAll(): Promise<LocationTypeProps[]>;
    findById(id: string): Promise<LocationTypeProps | null>;
    findByName(name: string): Promise<LocationTypeProps | null>;
    create(data: LocationTypeCreateProps): Promise<LocationTypeProps>;
    update(id: string, data: LocationTypeUpdateProps): Promise<LocationTypeProps>;
    delete(id: string): Promise<void>;
}
export default LocationTypeRepository;
