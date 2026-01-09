import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types";
import { AppliedProductDiscountClientCreateDto } from "./../../application/dto/applied-product-discount-client.model.schema";
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { Transaction } from "sequelize";
export declare class CreateAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo;
    constructor(repo: IAppliedProductDiscountClientRepository);
    execute: (data: AppliedProductDiscountClientCreateDto, tx?: Transaction) => Promise<AppliedProductDiscountClientProps>;
}
