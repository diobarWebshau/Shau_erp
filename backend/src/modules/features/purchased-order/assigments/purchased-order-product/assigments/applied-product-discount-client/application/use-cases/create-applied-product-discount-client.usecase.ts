import { AppliedProductDiscountClientCreateProps, AppliedProductDiscountClientProps } from "./../../domain/applied-product-discount-client.types"
import { AppliedProductDiscountClientCreateDto } from "./../../application/dto/applied-product-discount-client.model.schema"
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { Transaction } from "sequelize";


const mapAppliedProductDiscountClientCreateDtoToDomain = (data: AppliedProductDiscountClientCreateDto): AppliedProductDiscountClientCreateProps => {
    return ({
        ...data,
        discount_percentage: DecimalVO.from(data.discount_percentage)
    });
};

export class CreateAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    constructor(repo: IAppliedProductDiscountClientRepository) {
        this.appliedProductDiscountClientRepo = repo;
    };
    execute = async (data: AppliedProductDiscountClientCreateDto, tx?: Transaction): Promise<AppliedProductDiscountClientProps> => {
        const appliedProductDiscountClientResponse: AppliedProductDiscountClientProps =
            await this.appliedProductDiscountClientRepo.create(mapAppliedProductDiscountClientCreateDtoToDomain(data), tx);
        return appliedProductDiscountClientResponse;
    };
};