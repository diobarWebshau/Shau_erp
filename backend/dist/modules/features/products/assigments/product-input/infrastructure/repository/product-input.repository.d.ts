import type { ProductInputCreateProps, ProductInputProps, ProductInputUpdateProps } from "../../domain/product-input.types";
import type { IProductInputRepository } from "../../domain/product-input.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductInputRepository implements IProductInputRepository {
    findAll: () => Promise<ProductInputProps[]>;
    findById: (id: number) => Promise<ProductInputProps | null>;
    findByIdProductInput: (product_id: number, input_id: number) => Promise<ProductInputProps | null>;
    create: (data: ProductInputCreateProps, tx?: Transaction) => Promise<ProductInputProps>;
    update: (id: number, data: ProductInputUpdateProps, tx?: Transaction) => Promise<ProductInputProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
