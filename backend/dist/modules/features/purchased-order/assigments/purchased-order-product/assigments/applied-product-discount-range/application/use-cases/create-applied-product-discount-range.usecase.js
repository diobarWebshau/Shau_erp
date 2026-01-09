"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppliedProductDiscountRangeUseCase = void 0;
const decimal_vo_1 = require("@shared/domain/value-objects/decimal.vo");
const mapAppliedProductDiscountRangeCreateDtoToDomain = (data) => {
    return ({
        ...data,
        max_qty: decimal_vo_1.DecimalVO.from(data.max_qty),
        min_qty: decimal_vo_1.DecimalVO.from(data.min_qty),
        unit_discount: decimal_vo_1.DecimalVO.from(data.unit_discount),
    });
};
class CreateAppliedProductDiscountRangeUseCase {
    appliedProductDiscountRangeRepo;
    constructor(repo) {
        this.appliedProductDiscountRangeRepo = repo;
    }
    ;
    execute = async (data, tx) => {
        const appliedProductDiscountRangeResponse = await this.appliedProductDiscountRangeRepo.create(mapAppliedProductDiscountRangeCreateDtoToDomain(data), tx);
        return appliedProductDiscountRangeResponse;
    };
}
exports.CreateAppliedProductDiscountRangeUseCase = CreateAppliedProductDiscountRangeUseCase;
;
