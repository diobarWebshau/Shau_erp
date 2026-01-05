"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppliedProductDiscountRangeUseCase = void 0;
class CreateAppliedProductDiscountRangeUseCase {
    appliedProductDiscountRangeRepo;
    constructor(repo) {
        this.appliedProductDiscountRangeRepo = repo;
    }
    ;
    execute = async (data, tx) => {
        const appliedProductDiscountRangeResponse = await this.appliedProductDiscountRangeRepo.create(data, tx);
        const appliedProductDiscountRangeResponseFormatted = {
            ...appliedProductDiscountRangeResponse,
            updated_at: appliedProductDiscountRangeResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountRangeResponse.created_at.toISOString()
        };
        return appliedProductDiscountRangeResponseFormatted;
    };
}
exports.CreateAppliedProductDiscountRangeUseCase = CreateAppliedProductDiscountRangeUseCase;
;
