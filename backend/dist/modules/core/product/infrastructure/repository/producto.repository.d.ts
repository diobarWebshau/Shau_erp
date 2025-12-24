import type { ProductCreateProps, ProductProps, ProductUpdateProps, ProductSearchCriteria } from "../../domain/product.types";
import type { IProductRepository } from "../../domain/product.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductRepository implements IProductRepository {
    findAll: (query: ProductSearchCriteria, tx?: Transaction) => Promise<ProductProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<ProductProps | null>;
    findByName: (name: string, tx?: Transaction) => Promise<ProductProps | null>;
    findByCustomId: (custom_id: string, tx?: Transaction) => Promise<ProductProps | null>;
    findBySku: (sku: string, tx?: Transaction) => Promise<ProductProps | null>;
    findByBarcode: (barcode: string, tx?: Transaction) => Promise<ProductProps | null>;
    create: (data: ProductCreateProps, tx?: Transaction) => Promise<ProductProps>;
    update: (id: number, data: ProductUpdateProps, tx?: Transaction) => Promise<ProductProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
