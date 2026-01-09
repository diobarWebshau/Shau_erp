import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types";
import { Transaction } from "sequelize";
export declare class GetAllAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo;
    constructor(repo: IAppliedProductDiscountClientRepository);
    execute: (tx?: Transaction) => Promise<AppliedProductDiscountClientProps[]>;
}
