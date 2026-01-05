"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppliedProductDiscountClientUseCase = void 0;
class UpdateAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const appliedProductDiscountClientResponse = await this.appliedProductDiscountClientRepo.update(id, data, tx);
        const appliedProductDiscountClientResponseFormatted = {
            ...appliedProductDiscountClientResponse,
            updated_at: appliedProductDiscountClientResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountClientResponse.created_at.toISOString()
        };
        return appliedProductDiscountClientResponseFormatted;
    };
}
exports.UpdateAppliedProductDiscountClientUseCase = UpdateAppliedProductDiscountClientUseCase;
;
