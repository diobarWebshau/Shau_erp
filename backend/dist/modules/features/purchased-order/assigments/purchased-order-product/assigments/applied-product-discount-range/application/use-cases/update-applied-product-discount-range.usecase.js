"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppliedProductDiscountRangeUseCase = void 0;
class UpdateAppliedProductDiscountRangeUseCase {
    appliedProductDiscountRangeRepo;
    constructor(repo) {
        this.appliedProductDiscountRangeRepo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const appliedProductDiscountRangeResponse = await this.appliedProductDiscountRangeRepo.update(id, data, tx);
        const appliedProductDiscountRangeResponseFormatted = {
            ...appliedProductDiscountRangeResponse,
            updated_at: appliedProductDiscountRangeResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountRangeResponse.created_at.toISOString()
        };
        return appliedProductDiscountRangeResponseFormatted;
    };
}
exports.UpdateAppliedProductDiscountRangeUseCase = UpdateAppliedProductDiscountRangeUseCase;
;
