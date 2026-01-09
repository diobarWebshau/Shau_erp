import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types";
import { Transaction } from "sequelize";
export declare class GetByIdAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo;
    constructor(repo: IAppliedProductDiscountRangeRepository);
    execute: (id: number, tx?: Transaction) => Promise<AppliedProductDiscountRangeProps | null>;
}
