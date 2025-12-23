import type { ProductInputProcessCreateProps, ProductInputProcessProps, ProductInputProcessUpdateProps } from "../../domain/product-input-process.types";
import type { IProductInputProcessRepository } from "../../domain/product-input-process.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductInputProcessRepository implements IProductInputProcessRepository {
    findAll: () => Promise<ProductInputProcessProps[]>;
    findById: (id: number) => Promise<ProductInputProcessProps | null>;
    findByProductInputProcess: (product_id: number, product_input_id: number, product_process_id: number) => Promise<ProductInputProcessProps | null>;
    create: (data: ProductInputProcessCreateProps, tx?: Transaction) => Promise<ProductInputProcessProps>;
    update: (id: number, data: ProductInputProcessUpdateProps, tx?: Transaction) => Promise<ProductInputProcessProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
