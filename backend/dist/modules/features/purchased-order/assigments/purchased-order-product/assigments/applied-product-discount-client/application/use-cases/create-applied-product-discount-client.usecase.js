"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppliedProductDiscountClientUseCase = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const mapAppliedProductDiscountClientCreateDtoToDomain = (data) => {
    return ({
        ...data,
        discount_percentage: decimal_vo_1.DecimalVO.from(data.discount_percentage)
    });
};
class CreateAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (data, tx) => {
        const appliedProductDiscountClientResponse = await this.appliedProductDiscountClientRepo.create(mapAppliedProductDiscountClientCreateDtoToDomain(data), tx);
        return appliedProductDiscountClientResponse;
    };
}
exports.CreateAppliedProductDiscountClientUseCase = CreateAppliedProductDiscountClientUseCase;
;
