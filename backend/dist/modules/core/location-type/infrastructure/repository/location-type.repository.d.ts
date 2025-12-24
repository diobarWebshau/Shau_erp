import type { LocationTypeProps, LocationTypeCreateProps, LocationTypeUpdateProps } from "../../domain/location-type.types";
import type { ILocationTypeRepository } from "../../domain/location-type.repository";
import { Transaction } from "sequelize";
export declare class LocationTypeRepository implements ILocationTypeRepository {
    findAll(tx?: Transaction): Promise<LocationTypeProps[]>;
    findById(id: number, tx?: Transaction): Promise<LocationTypeProps | null>;
    findByName(name: string, tx?: Transaction): Promise<LocationTypeProps | null>;
    create(data: LocationTypeCreateProps, tx?: Transaction): Promise<LocationTypeProps>;
    update(id: number, data: LocationTypeUpdateProps, tx?: Transaction): Promise<LocationTypeProps>;
    delete(id: number, tx?: Transaction): Promise<void>;
}
export default LocationTypeRepository;
