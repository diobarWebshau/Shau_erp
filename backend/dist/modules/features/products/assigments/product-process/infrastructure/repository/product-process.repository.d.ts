import type { ProductProcessCreateProps, ProductProcessProps, ProductProcessUpdateProps } from "../../domain/product-process.types";
import type { IProductProcessRepository } from "../../domain/product-process.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductProcessRepository implements IProductProcessRepository {
    findAll: (tx?: Transaction) => Promise<ProductProcessProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<ProductProcessProps | null>;
    findByIdProductInput: (product_id: number, process_id: number, tx?: Transaction) => Promise<ProductProcessProps | null>;
    create: (data: ProductProcessCreateProps, tx?: Transaction) => Promise<ProductProcessProps>;
    update: (id: number, data: ProductProcessUpdateProps, tx?: Transaction) => Promise<ProductProcessProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
