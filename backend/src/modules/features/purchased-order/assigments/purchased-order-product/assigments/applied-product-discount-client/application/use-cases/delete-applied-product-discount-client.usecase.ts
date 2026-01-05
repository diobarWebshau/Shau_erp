import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { Transaction } from "sequelize";

export class DeleteAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    constructor(repo: IAppliedProductDiscountClientRepository) {
        this.appliedProductDiscountClientRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<void> => {
        await this.appliedProductDiscountClientRepo.delete(id, tx);
    };
};