import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types"
import { Transaction } from "sequelize";

export class GetByPopAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    constructor(repo: IAppliedProductDiscountRangeRepository) {
        this.appliedProductDiscountRangeRepo = repo;
    };
    execute = async (purchase_order_product_id: number, tx?: Transaction): Promise<AppliedProductDiscountRangeProps | null> => {
        const appliedProductDiscountRangeResponse: AppliedProductDiscountRangeProps | null = await this.appliedProductDiscountRangeRepo.findByPopId(purchase_order_product_id, tx);
        return appliedProductDiscountRangeResponse;
    };
};