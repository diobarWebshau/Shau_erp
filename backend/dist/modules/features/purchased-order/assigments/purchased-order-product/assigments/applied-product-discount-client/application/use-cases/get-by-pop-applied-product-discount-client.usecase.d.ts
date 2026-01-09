import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types";
import { Transaction } from "sequelize";
export declare class GetByPopAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo;
    constructor(repo: IAppliedProductDiscountClientRepository);
    execute: (purchase_order_product_id: number, tx?: Transaction) => Promise<AppliedProductDiscountClientProps | null>;
}
