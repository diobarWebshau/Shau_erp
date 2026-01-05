"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAppliedProductDiscountClientUseCase = void 0;
class GetAllAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (tx) => {
        const appliedProductDiscountClientResponse = await this.appliedProductDiscountClientRepo.findAll(tx);
        const appliedProductDiscountClientResponseFormatted = appliedProductDiscountClientResponse.map((apdc) => ({
            ...apdc,
            updated_at: apdc.updated_at.toISOString(),
            created_at: apdc.created_at.toISOString()
        }));
        return appliedProductDiscountClientResponseFormatted;
    };
}
exports.GetAllAppliedProductDiscountClientUseCase = GetAllAppliedProductDiscountClientUseCase;
;
