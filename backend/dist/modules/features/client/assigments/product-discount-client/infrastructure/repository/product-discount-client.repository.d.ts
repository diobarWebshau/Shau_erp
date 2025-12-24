import type { ProductDiscountClientCreateProps, ProductDiscountClientProps, ProductDiscountClientUpdateProps } from "../../domain/product-discount-client.types";
import type { IProductDiscountClientRepository } from "../../domain/product-discount-client.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductDiscountClientRepository implements IProductDiscountClientRepository {
    findAll: (tx?: Transaction) => Promise<ProductDiscountClientProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<ProductDiscountClientProps | null>;
    findByClientId: (client_id: number, tx?: Transaction) => Promise<ProductDiscountClientProps[]>;
    findByProductClientId: (product_id: number, client_id: number, tx?: Transaction) => Promise<ProductDiscountClientProps | null>;
    create: (data: ProductDiscountClientCreateProps, tx?: Transaction) => Promise<ProductDiscountClientProps>;
    update: (id: number, data: ProductDiscountClientUpdateProps, tx?: Transaction) => Promise<ProductDiscountClientProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
