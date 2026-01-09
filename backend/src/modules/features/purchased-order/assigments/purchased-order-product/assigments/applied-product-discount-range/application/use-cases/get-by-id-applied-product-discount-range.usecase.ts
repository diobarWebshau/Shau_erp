import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types"
import { Transaction } from "sequelize";

export class GetByIdAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    constructor(repo: IAppliedProductDiscountRangeRepository) {
        this.appliedProductDiscountRangeRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<AppliedProductDiscountRangeProps | null> => {
        const appliedProductDiscountRangeResponse: AppliedProductDiscountRangeProps | null = await this.appliedProductDiscountRangeRepo.findById(id, tx);
        return appliedProductDiscountRangeResponse;
    };
};