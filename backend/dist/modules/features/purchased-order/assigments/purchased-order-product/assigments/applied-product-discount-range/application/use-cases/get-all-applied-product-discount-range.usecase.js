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
        const appliedProductDiscountRangeResponseFormatted = appliedProductDiscountRangeResponse.map((apdc) => ({
            ...apdc,
            updated_at: apdc.updated_at.toISOString(),
            created_at: apdc.created_at.toISOString()
        }));
        return appliedProductDiscountRangeResponseFormatted;
    };
}
exports.GetAllAppliedProductDiscountRangeUseCase = GetAllAppliedProductDiscountRangeUseCase;
;
