import { AppliedProductDiscountRangeResponseSchemaDto } from "./../../application/dto/applied-product-discount-range.model.schema";
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { Transaction } from "sequelize";
export declare class GetByPopAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo;
    constructor(repo: IAppliedProductDiscountRangeRepository);
    execute: (purchase_order_product_id: number, tx?: Transaction) => Promise<AppliedProductDiscountRangeResponseSchemaDto | null>;
}
