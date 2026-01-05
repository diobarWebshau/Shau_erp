import { AppliedProductDiscountClientResponseSchemaDto } from "./../../application/dto/applied-product-discount-client.model.schema";
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { Transaction } from "sequelize";
export declare class GetByIdAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo;
    constructor(repo: IAppliedProductDiscountClientRepository);
    execute: (id: number, tx?: Transaction) => Promise<AppliedProductDiscountClientResponseSchemaDto | null>;
}
