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
        return appliedProductDiscountClientResponse;
    };
}
exports.GetByPopAppliedProductDiscountClientUseCase = GetByPopAppliedProductDiscountClientUseCase;
;
