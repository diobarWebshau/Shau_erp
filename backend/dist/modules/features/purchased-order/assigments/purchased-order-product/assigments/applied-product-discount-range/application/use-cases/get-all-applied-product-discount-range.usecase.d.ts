import { AppliedProductDiscountRangeResponseSchemaDto } from "./../../application/dto/applied-product-discount-range.model.schema";
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { Transaction } from "sequelize";
export declare class GetAllAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo;
    constructor(repo: IAppliedProductDiscountRangeRepository);
    execute: (tx?: Transaction) => Promise<AppliedProductDiscountRangeResponseSchemaDto[]>;
}
