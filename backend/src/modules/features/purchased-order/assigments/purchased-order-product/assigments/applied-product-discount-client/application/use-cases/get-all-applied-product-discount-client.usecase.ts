import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types"
import { Transaction } from "sequelize";

export class GetAllAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    constructor(repo: IAppliedProductDiscountClientRepository) {
        this.appliedProductDiscountClientRepo = repo;
    };
    execute = async (tx?: Transaction): Promise<AppliedProductDiscountClientProps[]> => {
        const appliedProductDiscountClientResponse: AppliedProductDiscountClientProps[] = await this.appliedProductDiscountClientRepo.findAll(tx);
        return appliedProductDiscountClientResponse;
    };
};