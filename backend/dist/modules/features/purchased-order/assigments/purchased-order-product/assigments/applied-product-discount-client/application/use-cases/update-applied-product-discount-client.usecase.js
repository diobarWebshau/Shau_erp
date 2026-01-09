"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppliedProductDiscountClientUseCase = void 0;
const decimal_vo_1 = require("@shared/domain/value-objects/decimal.vo");
const mapAppliedProductDiscountClientUpdateDtoToDomain = (data) => {
    const { discount_percentage, ...appdcRest } = data;
    return ({
        ...appdcRest,
        ...(discount_percentage !== undefined ? { discount_percentage: decimal_vo_1.DecimalVO.from(discount_percentage) } : {}),
    });
};
class UpdateAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const appliedProductDiscountClientResponse = await this.appliedProductDiscountClientRepo.update(id, mapAppliedProductDiscountClientUpdateDtoToDomain(data), tx);
        return appliedProductDiscountClientResponse;
    };
}
exports.UpdateAppliedProductDiscountClientUseCase = UpdateAppliedProductDiscountClientUseCase;
;
