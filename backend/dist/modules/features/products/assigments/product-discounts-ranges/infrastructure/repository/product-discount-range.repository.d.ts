import type { ProductDiscountRangeCreateProps, ProductDiscountRangeProps, ProductDiscountRangeUpdateProps } from "../../domain/product-discount-range.types";
import type { IProductDiscountRangeRepository } from "../../domain/product-discount-range.repository.interface";
import { Transaction } from "sequelize";
export declare class ProductDiscountRangeRepository implements IProductDiscountRangeRepository {
    findAll: () => Promise<ProductDiscountRangeProps[]>;
    findById: (id: number) => Promise<ProductDiscountRangeProps | null>;
    findByProductId: (product_id: number) => Promise<ProductDiscountRangeProps[]>;
    create: (data: ProductDiscountRangeCreateProps, tx?: Transaction) => Promise<ProductDiscountRangeProps>;
    update: (id: number, data: ProductDiscountRangeUpdateProps, tx?: Transaction) => Promise<ProductDiscountRangeProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
