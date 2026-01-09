import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types";
import { Transaction } from "sequelize";
export declare class GetByIdAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo;
    constructor(repo: IAppliedProductDiscountClientRepository);
    execute: (id: number, tx?: Transaction) => Promise<AppliedProductDiscountClientProps | null>;
}
