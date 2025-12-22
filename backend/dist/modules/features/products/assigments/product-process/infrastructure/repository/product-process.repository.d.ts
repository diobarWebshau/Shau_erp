import type { ProductProcessCreateProps, ProductProcessProps, ProductProcessUpdateProps } from "../../domain/product-process.types";
import type { IProductProcessRepository } from "../../domain/product-process.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductProcessRepository implements IProductProcessRepository {
    findAll: () => Promise<ProductProcessProps[]>;
    findById: (id: number) => Promise<ProductProcessProps | null>;
    findByIdProductInput: (product_id: number, process_id: number) => Promise<ProductProcessProps | null>;
    create: (data: ProductProcessCreateProps, tx?: Transaction) => Promise<ProductProcessProps>;
    update: (id: number, data: ProductProcessUpdateProps, tx?: Transaction) => Promise<ProductProcessProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
