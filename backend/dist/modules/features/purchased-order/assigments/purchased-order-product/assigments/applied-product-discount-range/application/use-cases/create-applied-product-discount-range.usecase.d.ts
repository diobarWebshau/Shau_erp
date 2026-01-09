import { AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types";
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeCreateDto } from "./../../application/dto/applied-product-discount-range.model.schema";
import { Transaction } from "sequelize";
export declare class CreateAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo;
    constructor(repo: IAppliedProductDiscountRangeRepository);
    execute: (data: AppliedProductDiscountRangeCreateDto, tx?: Transaction) => Promise<AppliedProductDiscountRangeProps>;
}
