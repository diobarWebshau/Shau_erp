import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types"
import { Transaction } from "sequelize";

export class GetByIdAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    constructor(repo: IAppliedProductDiscountClientRepository) {
        this.appliedProductDiscountClientRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<AppliedProductDiscountClientProps | null> => {
        const appliedProductDiscountClientResponse: AppliedProductDiscountClientProps | null =
            await this.appliedProductDiscountClientRepo.findById(id, tx);
        return appliedProductDiscountClientResponse;
    };
};