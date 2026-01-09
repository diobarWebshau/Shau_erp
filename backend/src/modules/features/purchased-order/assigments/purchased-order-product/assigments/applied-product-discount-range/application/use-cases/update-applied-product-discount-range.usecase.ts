import { AppliedProductDiscountRangeProps, AppliedProductDiscountRangeUpdateProps } from "./../../domain/applied-product-discount-range.types"
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeUpdateDto } from "../dto/applied-product-discount-range.model.schema";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { Transaction } from "sequelize";

const mapAppliedProductDiscountRangeUpdateDtoToDomain = (data: AppliedProductDiscountRangeUpdateDto): AppliedProductDiscountRangeUpdateProps => {
    const { max_qty, min_qty, unit_discount, ...apdrRest } = data;
    return ({
        ...apdrRest,
        ...(
            max_qty !== undefined ? { max_qty: DecimalVO.from(max_qty) } : {}
        ),
        ...(
            min_qty !== undefined ? { min_qty: DecimalVO.from(min_qty) } : {}
        ),
        ...(
            unit_discount !== undefined ? { unit_discount: DecimalVO.from(unit_discount) } : {}
        ),
    });
}

export class UpdateAppliedProductDiscountRangeUseCase {
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    constructor(repo: IAppliedProductDiscountRangeRepository) {
        this.appliedProductDiscountRangeRepo = repo;
    };
    execute = async (id: number, data: AppliedProductDiscountRangeUpdateDto, tx?: Transaction): Promise<AppliedProductDiscountRangeProps> => {
        const appliedProductDiscountRangeResponse: AppliedProductDiscountRangeProps = await this.appliedProductDiscountRangeRepo.update(id, mapAppliedProductDiscountRangeUpdateDtoToDomain(data), tx);
        return appliedProductDiscountRangeResponse;
    };
};