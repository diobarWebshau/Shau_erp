import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types";
import { Transaction } from "sequelize";
export declare class GetByPopAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo;
    constructor(repo: IAppliedProductDiscountRangeRepository);
    execute: (purchase_order_product_id: number, tx?: Transaction) => Promise<AppliedProductDiscountRangeProps | null>;
}
