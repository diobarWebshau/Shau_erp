import type { LocationProductionLineCreateProps, LocationProductionLineProps, LocationProductionLineUpdateProps } from "../../domain/location-production-line.types";
import type { ILocationProductionLineRepository } from "../../domain/location-production-line.repository.interface";
export declare class LocationProductionLineRepository implements ILocationProductionLineRepository {
    findAll: () => Promise<LocationProductionLineProps[]>;
    findById: (id: string) => Promise<LocationProductionLineProps | null>;
    create: (data: LocationProductionLineCreateProps) => Promise<LocationProductionLineProps>;
    update: (id: string, data: LocationProductionLineUpdateProps) => Promise<LocationProductionLineProps>;
    delete: (id: string) => Promise<void>;
}
