import type { ProductProcessCreateProps, ProductProcessProps, ProductProcessUpdateProps } from "../../domain/product-process.types";
import type { IProductProcessRepository } from "../../domain/product-process.repository.interface";
export declare class ProductProcessRepository implements IProductProcessRepository {
    findAll: () => Promise<ProductProcessProps[]>;
    findById: (id: string) => Promise<ProductProcessProps | null>;
    create: (data: ProductProcessCreateProps) => Promise<ProductProcessProps>;
    update: (id: string, data: ProductProcessUpdateProps) => Promise<ProductProcessProps>;
    delete: (id: string) => Promise<void>;
}
