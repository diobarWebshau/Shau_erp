import { AppliedProductDiscountClientProps, AppliedProductDiscountClientUpdateProps } from "./../../domain/applied-product-discount-client.types"
import { AppliedProductDiscountClientUpdateDto } from "./../../application/dto/applied-product-discount-client.model.schema"
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { DecimalVO } from "@shared/domain/value-objects/decimal.vo";
import { Transaction } from "sequelize";

const mapAppliedProductDiscountClientUpdateDtoToDomain = (data: AppliedProductDiscountClientUpdateDto): AppliedProductDiscountClientUpdateProps => {
    const { discount_percentage, ...appdcRest } = data;
    return ({
        ...appdcRest,
        ...(discount_percentage !== undefined ? { discount_percentage: DecimalVO.from(discount_percentage) } : {}),
    });
};

export class UpdateAppliedProductDiscountClientUseCase {
    private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    constructor(repo: IAppliedProductDiscountClientRepository) {
        this.appliedProductDiscountClientRepo = repo;
    };
    execute = async (id: number, data: AppliedProductDiscountClientUpdateDto, tx?: Transaction): Promise<AppliedProductDiscountClientProps> => {
        const appliedProductDiscountClientResponse: AppliedProductDiscountClientProps =
            await this.appliedProductDiscountClientRepo.update(id, mapAppliedProductDiscountClientUpdateDtoToDomain(data), tx);
        return appliedProductDiscountClientResponse;
    };
};