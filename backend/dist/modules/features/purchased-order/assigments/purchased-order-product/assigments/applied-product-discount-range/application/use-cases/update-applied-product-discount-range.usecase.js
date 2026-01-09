"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppliedProductDiscountRangeUseCase = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const mapAppliedProductDiscountRangeUpdateDtoToDomain = (data) => {
    const { max_qty, min_qty, unit_discount, ...apdrRest } = data;
    return ({
        ...apdrRest,
        ...(max_qty !== undefined ? { max_qty: decimal_vo_1.DecimalVO.from(max_qty) } : {}),
        ...(min_qty !== undefined ? { min_qty: decimal_vo_1.DecimalVO.from(min_qty) } : {}),
        ...(unit_discount !== undefined ? { unit_discount: decimal_vo_1.DecimalVO.from(unit_discount) } : {}),
    });
};
class UpdateAppliedProductDiscountRangeUseCase {
    appliedProductDiscountRangeRepo;
    constructor(repo) {
        this.appliedProductDiscountRangeRepo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const appliedProductDiscountRangeResponse = await this.appliedProductDiscountRangeRepo.update(id, mapAppliedProductDiscountRangeUpdateDtoToDomain(data), tx);
        return appliedProductDiscountRangeResponse;
    };
}
exports.UpdateAppliedProductDiscountRangeUseCase = UpdateAppliedProductDiscountRangeUseCase;
;
