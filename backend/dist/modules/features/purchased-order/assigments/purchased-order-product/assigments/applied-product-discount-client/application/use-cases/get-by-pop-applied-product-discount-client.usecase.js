"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByPopAppliedProductDiscountClientUseCase = void 0;
class GetByPopAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (purchase_order_product_id, tx) => {
        const appliedProductDiscountClientResponse = await this.appliedProductDiscountClientRepo.findByPopId(purchase_order_product_id, tx);
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
exports.GetByPopAppliedProductDiscountClientUseCase = GetByPopAppliedProductDiscountClientUseCase;
;
