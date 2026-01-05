"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdAppliedProductDiscountClientUseCase = void 0;
class GetByIdAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        const appliedProductDiscountClientResponse = await this.appliedProductDiscountClientRepo.findById(id, tx);
        if (!appliedProductDiscountClientResponse)
            return null;
        const appliedProductDiscountClientResponseFormatted = {
            ...appliedProductDiscountClientResponse,
            updated_at: appliedProductDiscountClientResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountClientResponse.created_at.toISOString()
        };
        return appliedProductDiscountClientResponseFormatted;
    };
}
exports.GetByIdAppliedProductDiscountClientUseCase = GetByIdAppliedProductDiscountClientUseCase;
;
