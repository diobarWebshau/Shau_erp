import { AppliedProductDiscountClientResponseSchemaDto } from "./../../application/dto/applied-product-discount-client.model.schema"
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types"
import { Transaction } from "sequelize";

export class GetAllAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    constructor(repo: IAppliedProductDiscountClientRepository) {
        this.appliedProductDiscountClientRepo = repo;
    };
    execute = async (tx?: Transaction): Promise<AppliedProductDiscountClientResponseSchemaDto[]> => {
        const appliedProductDiscountClientResponse: AppliedProductDiscountClientProps[] = await this.appliedProductDiscountClientRepo.findAll(tx);
        const appliedProductDiscountClientResponseFormatted: AppliedProductDiscountClientResponseSchemaDto[] = appliedProductDiscountClientResponse.map((apdc) => ({
            ...apdc,
            updated_at: apdc.updated_at.toISOString(),
            created_at: apdc.created_at.toISOString()
        }));
        return appliedProductDiscountClientResponseFormatted;
    };
};