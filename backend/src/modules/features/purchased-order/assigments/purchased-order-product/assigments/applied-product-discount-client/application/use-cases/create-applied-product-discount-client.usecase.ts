import { AppliedProductDiscountClientResponseSchemaDto } from "./../../application/dto/applied-product-discount-client.model.schema"
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientCreateProps, AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types"
import { Transaction } from "sequelize";

export class CreateAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    constructor(repo: IAppliedProductDiscountClientRepository) {
        this.appliedProductDiscountClientRepo = repo;
    };
    execute = async (data: AppliedProductDiscountClientCreateProps, tx?: Transaction): Promise<AppliedProductDiscountClientResponseSchemaDto> => {
        const appliedProductDiscountClientResponse: AppliedProductDiscountClientProps = await this.appliedProductDiscountClientRepo.create(data, tx);
        const appliedProductDiscountClientResponseFormatted: AppliedProductDiscountClientResponseSchemaDto = {
            ...appliedProductDiscountClientResponse,
            updated_at: appliedProductDiscountClientResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountClientResponse.created_at.toISOString()
        }
        return appliedProductDiscountClientResponseFormatted;
    };
};