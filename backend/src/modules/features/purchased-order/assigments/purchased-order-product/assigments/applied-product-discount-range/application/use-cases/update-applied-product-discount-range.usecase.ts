import { AppliedProductDiscountRangeProps, AppliedProductDiscountRangeUpdateProps } from "./../../domain/applied-product-discount-range.types"
import { AppliedProductDiscountRangeResponseSchemaDto } from "./../../application/dto/applied-product-discount-range.model.schema"
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { Transaction } from "sequelize";

export class UpdateAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    constructor(repo: IAppliedProductDiscountRangeRepository) {
        this.appliedProductDiscountRangeRepo = repo;
    };
    execute = async (id: number, data: AppliedProductDiscountRangeUpdateProps, tx?: Transaction): Promise<AppliedProductDiscountRangeResponseSchemaDto> => {
        const appliedProductDiscountRangeResponse: AppliedProductDiscountRangeProps = await this.appliedProductDiscountRangeRepo.update(id, data, tx);
        const appliedProductDiscountRangeResponseFormatted: AppliedProductDiscountRangeResponseSchemaDto = {
            ...appliedProductDiscountRangeResponse,
            updated_at: appliedProductDiscountRangeResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountRangeResponse.created_at.toISOString()
        }
        return appliedProductDiscountRangeResponseFormatted;
    };
};