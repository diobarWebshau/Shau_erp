import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types";
import { AppliedProductDiscountClientUpdateDto } from "./../../application/dto/applied-product-discount-client.model.schema";
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { Transaction } from "sequelize";
export declare class UpdateAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo;
    constructor(repo: IAppliedProductDiscountClientRepository);
    execute: (id: number, data: AppliedProductDiscountClientUpdateDto, tx?: Transaction) => Promise<AppliedProductDiscountClientProps>;
}
