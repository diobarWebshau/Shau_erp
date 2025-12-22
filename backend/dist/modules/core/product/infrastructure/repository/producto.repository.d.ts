import type { ProductCreateProps, ProductProps, ProductUpdateProps, ProductSearchCriteria } from "../../domain/product.types";
import type { IProductRepository } from "../../domain/product.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductRepository implements IProductRepository {
    findAll: (query: ProductSearchCriteria) => Promise<ProductProps[]>;
    findById: (id: number) => Promise<ProductProps | null>;
    findByName: (name: string) => Promise<ProductProps | null>;
    findByCustomId: (custom_id: string) => Promise<ProductProps | null>;
    findBySku: (sku: string) => Promise<ProductProps | null>;
    findByBarcode: (barcode: string) => Promise<ProductProps | null>;
    create: (data: ProductCreateProps, tx?: Transaction) => Promise<ProductProps>;
    update: (id: number, data: ProductUpdateProps, tx?: Transaction) => Promise<ProductProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
