import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { Transaction } from "sequelize";

export class DeleteAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    constructor(repo: IAppliedProductDiscountRangeRepository) {
        this.appliedProductDiscountRangeRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<void> => {
        await this.appliedProductDiscountRangeRepo.delete(id, tx);
    };
};