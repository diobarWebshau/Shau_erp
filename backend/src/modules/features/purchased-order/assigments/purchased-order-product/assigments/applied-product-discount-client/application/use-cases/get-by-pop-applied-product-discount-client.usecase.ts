import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types"
import { Transaction } from "sequelize";

export class GetByPopAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    constructor(repo: IAppliedProductDiscountClientRepository) {
        this.appliedProductDiscountClientRepo = repo;
    };
    execute = async (purchase_order_product_id: number, tx?: Transaction): Promise<AppliedProductDiscountClientProps | null> => {
        const appliedProductDiscountClientResponse: AppliedProductDiscountClientProps | null =
            await this.appliedProductDiscountClientRepo.findByPopId(purchase_order_product_id, tx);
        return appliedProductDiscountClientResponse;
    };
};