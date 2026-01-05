import { AppliedProductDiscountRangeCreateProps, AppliedProductDiscountRangeUpdateProps, AppliedProductDiscountRangeProps } from "./applied-product-discount-range.types";
import { Transaction } from "sequelize";
export interface IAppliedProductDiscountRangeRepository {
    findAll: (tx?: Transaction) => Promise<AppliedProductDiscountRangeProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<AppliedProductDiscountRangeProps | null>;
    findByPopId: (purchase_order_product_id: number, tx?: Transaction) => Promise<AppliedProductDiscountRangeProps | null>;
    create: (data: AppliedProductDiscountRangeCreateProps, tx?: Transaction) => Promise<AppliedProductDiscountRangeProps>;
    update: (id: number, data: AppliedProductDiscountRangeUpdateProps, tx?: Transaction) => Promise<AppliedProductDiscountRangeProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
