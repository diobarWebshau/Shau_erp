import type { ProductCreateProps, ProductProps, ProductUpdateProps, ProductSearchCriteria } from "../../domain/product.types";
import type { IProductRepository } from "../../domain/product.repository.interface";
export declare class ProductRepository implements IProductRepository {
    findAll: (query: ProductSearchCriteria) => Promise<ProductProps[]>;
    findById: (id: string) => Promise<ProductProps | null>;
    findByName: (name: string) => Promise<ProductProps | null>;
    findByCustomId: (custom_id: string) => Promise<ProductProps | null>;
    findBySku: (sku: string) => Promise<ProductProps | null>;
    findByBarcode: (barcode: string) => Promise<ProductProps | null>;
    create: (data: ProductCreateProps) => Promise<ProductProps>;
    update: (id: string, data: ProductUpdateProps) => Promise<ProductProps>;
    delete: (id: string) => Promise<void>;
}
