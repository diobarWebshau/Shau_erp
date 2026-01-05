import { AppliedProductDiscountClientResponseSchemaDto } from "./../../application/dto/applied-product-discount-client.model.schema"
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types"
import { Transaction } from "sequelize";

export class GetByIdAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    constructor(repo: IAppliedProductDiscountClientRepository) {
        this.appliedProductDiscountClientRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<AppliedProductDiscountClientResponseSchemaDto | null> => {
        const appliedProductDiscountClientResponse: AppliedProductDiscountClientProps | null = await this.appliedProductDiscountClientRepo.findById(id, tx);
        if (!appliedProductDiscountClientResponse) return null;
        const appliedProductDiscountClientResponseFormatted: AppliedProductDiscountClientResponseSchemaDto = {
            ...appliedProductDiscountClientResponse,
            updated_at: appliedProductDiscountClientResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountClientResponse.created_at.toISOString()
        }
        return appliedProductDiscountClientResponseFormatted;
    };
};