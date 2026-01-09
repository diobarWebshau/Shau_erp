"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAppliedProductDiscountRangeUseCase = void 0;
class GetAllAppliedProductDiscountRangeUseCase {
    appliedProductDiscountRangeRepo;
    constructor(repo) {
        this.appliedProductDiscountRangeRepo = repo;
    }
    ;
    execute = async (tx) => {
        const appliedProductDiscountRangeResponse = await this.appliedProductDiscountRangeRepo.findAll(tx);
        return appliedProductDiscountRangeResponse;
    };
}
exports.GetAllAppliedProductDiscountRangeUseCase = GetAllAppliedProductDiscountRangeUseCase;
;
