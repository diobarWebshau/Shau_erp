"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdAppliedProductDiscountRangeUseCase = void 0;
class GetByIdAppliedProductDiscountRangeUseCase {
    appliedProductDiscountRangeRepo;
    constructor(repo) {
        this.appliedProductDiscountRangeRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        const appliedProductDiscountRangeResponse = await this.appliedProductDiscountRangeRepo.findById(id, tx);
        return appliedProductDiscountRangeResponse;
    };
}
exports.GetByIdAppliedProductDiscountRangeUseCase = GetByIdAppliedProductDiscountRangeUseCase;
;
