import { AppliedProductDiscountRangeResponseSchemaDto } from "./../../application/dto/applied-product-discount-range.model.schema"
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types"
import { Transaction } from "sequelize";

export class GetAllAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    constructor(repo: IAppliedProductDiscountRangeRepository) {
        this.appliedProductDiscountRangeRepo = repo;
    };
    execute = async (tx?: Transaction): Promise<AppliedProductDiscountRangeResponseSchemaDto[]> => {
        const appliedProductDiscountRangeResponse: AppliedProductDiscountRangeProps[] = await this.appliedProductDiscountRangeRepo.findAll(tx);
        const appliedProductDiscountRangeResponseFormatted: AppliedProductDiscountRangeResponseSchemaDto[] = appliedProductDiscountRangeResponse.map((apdc) => ({
            ...apdc,
            updated_at: apdc.updated_at.toISOString(),
            created_at: apdc.created_at.toISOString()
        }));
        return appliedProductDiscountRangeResponseFormatted;
    };
};