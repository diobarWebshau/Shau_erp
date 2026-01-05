"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByPopAppliedProductDiscountRangeUseCase = void 0;
class GetByPopAppliedProductDiscountRangeUseCase {
    appliedProductDiscountRangeRepo;
    constructor(repo) {
        this.appliedProductDiscountRangeRepo = repo;
    }
    ;
    execute = async (purchase_order_product_id, tx) => {
        const appliedProductDiscountRangeResponse = await this.appliedProductDiscountRangeRepo.findByPopId(purchase_order_product_id, tx);
        if (!appliedProductDiscountRangeResponse)
            return null;
        const appliedProductDiscountRangeResponseFormatted = {
            ...appliedProductDiscountRangeResponse,
            updated_at: appliedProductDiscountRangeResponse.updated_at.toISOString(),
            created_at: appliedProductDiscountRangeResponse.created_at.toISOString()
        };
        return appliedProductDiscountRangeResponseFormatted;
    };
}
exports.GetByPopAppliedProductDiscountRangeUseCase = GetByPopAppliedProductDiscountRangeUseCase;
;
