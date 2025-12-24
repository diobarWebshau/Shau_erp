import type { LocationProductionLineCreateProps, LocationProductionLineProps, LocationProductionLineUpdateProps } from "../../domain/location-production-line.types";
import type { ILocationProductionLineRepository } from "../../domain/location-production-line.repository.interface";
import { Transaction } from "sequelize";
export declare class LocationProductionLineRepository implements ILocationProductionLineRepository {
    findAll: (tx?: Transaction) => Promise<LocationProductionLineProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<LocationProductionLineProps | null>;
    findByIdLocationProductionLine: (location_id: number, production_line_id: number, tx?: Transaction) => Promise<LocationProductionLineProps | null>;
    create: (data: LocationProductionLineCreateProps, tx?: Transaction) => Promise<LocationProductionLineProps>;
    update: (id: number, data: LocationProductionLineUpdateProps, tx?: Transaction) => Promise<LocationProductionLineProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
