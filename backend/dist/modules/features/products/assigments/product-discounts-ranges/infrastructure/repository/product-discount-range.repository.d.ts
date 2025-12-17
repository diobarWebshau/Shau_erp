import type { ProductDiscountRangeCreateProps, ProductDiscountRangeProps, ProductDiscountRangeUpdateProps } from "../../domain/product-discount-range.types";
import type { IProductDiscountRangeRepository } from "../../domain/product-discount-range.repository.interface";
export declare class ProductDiscountRangeRepository implements IProductDiscountRangeRepository {
    findAll: () => Promise<ProductDiscountRangeProps[]>;
    findById: (id: number) => Promise<ProductDiscountRangeProps | null>;
    findByProductId: (product_id: number) => Promise<ProductDiscountRangeProps[]>;
    create: (data: ProductDiscountRangeCreateProps) => Promise<ProductDiscountRangeProps>;
    update: (id: number, data: ProductDiscountRangeUpdateProps) => Promise<ProductDiscountRangeProps>;
    delete: (id: number) => Promise<void>;
}
