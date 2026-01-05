"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppliedProductDiscountClientUseCase = void 0;
class CreateAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (data, tx) => {
        const appliedProductDiscountClientResponse = await this.appliedProductDiscountClientRepo.create(data, tx);
        const appliedProductDiscountClientResponseFormatted = {
            ...appliedProductDiscountClientResponse,
            updated_at: appliedProductDiscountClientResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountClientResponse.created_at.toISOString()
        };
        return appliedProductDiscountClientResponseFormatted;
    };
}
exports.CreateAppliedProductDiscountClientUseCase = CreateAppliedProductDiscountClientUseCase;
;
