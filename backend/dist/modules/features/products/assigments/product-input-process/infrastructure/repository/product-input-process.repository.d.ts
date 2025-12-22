import type { ProductInputCreateProps, ProductInputProps, ProductInputUpdateProps } from "../../domain/product-input-process.types";
import type { IProductInputRepository } from "../../domain/product-input-process.repository.interface";
export declare class ProductInputRepository implements IProductInputRepository {
    findAll: () => Promise<ProductInputProps[]>;
    findById: (id: string) => Promise<ProductInputProps | null>;
    create: (data: ProductInputCreateProps) => Promise<ProductInputProps>;
    update: (id: string, data: ProductInputUpdateProps) => Promise<ProductInputProps>;
    delete: (id: string) => Promise<void>;
}
