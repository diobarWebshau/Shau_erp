"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPurchasedOrderUseCase = void 0;
class GetAllPurchasedOrderUseCase {
    purchasedOrderRepo;
    constructor(repo) {
        this.purchasedOrderRepo = repo;
    }
    ;
    execute = async (tx) => {
        const purchasedOrderResponses = await this.purchasedOrderRepo.findAll(tx);
        const purchasedOrderResults = purchasedOrderResponses.map((po) => ({
            ...po,
            delivery_date: po.delivery_date.toISOString(),
            created_at: po.created_at.toISOString(),
            updated_at: po.updated_at.toISOString()
        }));
        return purchasedOrderResults;
    };
}
exports.GetAllPurchasedOrderUseCase = GetAllPurchasedOrderUseCase;
;
