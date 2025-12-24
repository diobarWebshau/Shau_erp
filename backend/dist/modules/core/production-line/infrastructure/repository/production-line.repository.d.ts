import type { ProductionLineCreateProps, ProductionLineProps, ProductionLineUpdateProps } from "../../domain/production-line.types";
import type { IProductionLineRepository } from "../../domain/production-line.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductionLineRepository implements IProductionLineRepository {
    findAll: (tx?: Transaction) => Promise<ProductionLineProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<ProductionLineProps | null>;
    findByName: (name: string, tx?: Transaction) => Promise<ProductionLineProps | null>;
    findByCustomId: (custom_id: string, tx?: Transaction) => Promise<ProductionLineProps | null>;
    create: (data: ProductionLineCreateProps, tx?: Transaction) => Promise<ProductionLineProps>;
    update: (id: number, data: ProductionLineUpdateProps, tx?: Transaction) => Promise<ProductionLineProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
