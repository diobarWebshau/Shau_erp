import { ProductionLineProductCreateProps, ProductionLineProductProps, ProductionLineProductUpdateProps } from "../../domain/production-line-product.types";
import { IProductionLineProductRepository } from "../../domain/production-line.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductionLineProductRepository implements IProductionLineProductRepository {
    findAll(tx?: Transaction): Promise<ProductionLineProductProps[]>;
    findById(id: number, tx?: Transaction): Promise<ProductionLineProductProps | null>;
    findByProductionLineProduct(production_line_id: number, product_id: number, tx?: Transaction): Promise<ProductionLineProductProps | null>;
    create(data: ProductionLineProductCreateProps, tx?: Transaction): Promise<ProductionLineProductProps>;
    update(id: number, data: ProductionLineProductUpdateProps, tx?: Transaction): Promise<ProductionLineProductProps>;
    delete(id: number, tx?: Transaction): Promise<void>;
}
