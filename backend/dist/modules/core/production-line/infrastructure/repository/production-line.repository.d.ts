import type { ProductionLineCreateProps, ProductionLineProps, ProductionLineUpdateProps } from "../../domain/production-line.types";
import type { IProductionLineRepository } from "../../domain/production-line.repository.interface";
export declare class ProductionLineRepository implements IProductionLineRepository {
    findAll: () => Promise<ProductionLineProps[]>;
    findById: (id: string) => Promise<ProductionLineProps | null>;
    findByName: (name: string) => Promise<ProductionLineProps | null>;
    findByCustomId: (custom_id: string) => Promise<ProductionLineProps | null>;
    create: (data: ProductionLineCreateProps) => Promise<ProductionLineProps>;
    update: (id: string, data: ProductionLineUpdateProps) => Promise<ProductionLineProps>;
    delete: (id: string) => Promise<void>;
}
