import { AppliedProductDiscountClientResponseSchemaDto } from "./../../application/dto/applied-product-discount-client.model.schema";
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientCreateProps } from "./../../domain/applied-product-discount-client.types";
import { Transaction } from "sequelize";
export declare class CreateAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo;
    constructor(repo: IAppliedProductDiscountClientRepository);
    execute: (data: AppliedProductDiscountClientCreateProps, tx?: Transaction) => Promise<AppliedProductDiscountClientResponseSchemaDto>;
}
