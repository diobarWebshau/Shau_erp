import { AppliedProductDiscountRangeCreateProps, AppliedProductDiscountRangeProps } from "./../../domain/applied-product-discount-range.types"
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeCreateDto } from "./../../application/dto/applied-product-discount-range.model.schema"
import { DecimalVO } from "@shared/domain/value-objects/decimal.vo";
import { Transaction } from "sequelize";

const mapAppliedProductDiscountRangeCreateDtoToDomain = (data: AppliedProductDiscountRangeCreateDto): AppliedProductDiscountRangeCreateProps => {
    return ({
        ...data,
        max_qty: DecimalVO.from(data.max_qty),
        min_qty: DecimalVO.from(data.min_qty),
        unit_discount: DecimalVO.from(data.unit_discount),
    });
};

export class CreateAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    constructor(repo: IAppliedProductDiscountRangeRepository) {
        this.appliedProductDiscountRangeRepo = repo;
    };
    execute = async (data: AppliedProductDiscountRangeCreateDto, tx?: Transaction): Promise<AppliedProductDiscountRangeProps> => {
        const appliedProductDiscountRangeResponse: AppliedProductDiscountRangeProps =
            await this.appliedProductDiscountRangeRepo.create(mapAppliedProductDiscountRangeCreateDtoToDomain(data), tx);
        return appliedProductDiscountRangeResponse;
    };
};