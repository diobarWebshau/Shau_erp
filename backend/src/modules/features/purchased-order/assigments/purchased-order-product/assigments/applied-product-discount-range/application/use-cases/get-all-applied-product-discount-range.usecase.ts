import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types"
import { Transaction } from "sequelize";

export class GetAllAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    constructor(repo: IAppliedProductDiscountRangeRepository) {
        this.appliedProductDiscountRangeRepo = repo;
    };
    execute = async (tx?: Transaction): Promise<AppliedProductDiscountRangeProps[]> => {
        const appliedProductDiscountRangeResponse: AppliedProductDiscountRangeProps[] =
            await this.appliedProductDiscountRangeRepo.findAll(tx);
        return appliedProductDiscountRangeResponse;
    };
};