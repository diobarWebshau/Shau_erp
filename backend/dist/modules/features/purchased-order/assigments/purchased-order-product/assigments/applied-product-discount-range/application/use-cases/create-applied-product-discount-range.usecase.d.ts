import { AppliedProductDiscountRangeResponseSchemaDto } from "./../../application/dto/applied-product-discount-range.model.schema";
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeCreateProps } from "./../../domain/applied-product-discount-range.types";
import { Transaction } from "sequelize";
export declare class CreateAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo;
    constructor(repo: IAppliedProductDiscountRangeRepository);
    execute: (data: AppliedProductDiscountRangeCreateProps, tx?: Transaction) => Promise<AppliedProductDiscountRangeResponseSchemaDto>;
}
