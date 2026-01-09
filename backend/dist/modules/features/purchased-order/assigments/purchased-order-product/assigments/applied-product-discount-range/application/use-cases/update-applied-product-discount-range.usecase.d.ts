import { AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types";
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeUpdateDto } from "../dto/applied-product-discount-range.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo;
    constructor(repo: IAppliedProductDiscountRangeRepository);
    execute: (id: number, data: AppliedProductDiscountRangeUpdateDto, tx?: Transaction) => Promise<AppliedProductDiscountRangeProps>;
}
