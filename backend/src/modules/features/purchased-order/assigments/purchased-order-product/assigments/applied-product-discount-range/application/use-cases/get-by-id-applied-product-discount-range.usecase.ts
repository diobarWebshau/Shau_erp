import { AppliedProductDiscountRangeResponseSchemaDto } from "./../../application/dto/applied-product-discount-range.model.schema"
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types"
import { Transaction } from "sequelize";

export class GetByIdAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    constructor(repo: IAppliedProductDiscountRangeRepository) {
        this.appliedProductDiscountRangeRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<AppliedProductDiscountRangeResponseSchemaDto | null> => {
        const appliedProductDiscountRangeResponse: AppliedProductDiscountRangeProps | null = await this.appliedProductDiscountRangeRepo.findById(id, tx);
        if (!appliedProductDiscountRangeResponse) return null;
        const appliedProductDiscountRangeResponseFormatted: AppliedProductDiscountRangeResponseSchemaDto = {
            ...appliedProductDiscountRangeResponse,
            updated_at: appliedProductDiscountRangeResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountRangeResponse.created_at.toISOString()
        }
        return appliedProductDiscountRangeResponseFormatted;
    };
};