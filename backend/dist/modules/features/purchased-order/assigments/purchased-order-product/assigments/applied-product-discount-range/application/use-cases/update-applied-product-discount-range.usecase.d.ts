import { AppliedProductDiscountRangeUpdateProps } from "./../../domain/applied-product-discount-range.types";
import { AppliedProductDiscountRangeResponseSchemaDto } from "./../../application/dto/applied-product-discount-range.model.schema";
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { Transaction } from "sequelize";
export declare class UpdateAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo;
    constructor(repo: IAppliedProductDiscountRangeRepository);
    execute: (id: number, data: AppliedProductDiscountRangeUpdateProps, tx?: Transaction) => Promise<AppliedProductDiscountRangeResponseSchemaDto>;
}
