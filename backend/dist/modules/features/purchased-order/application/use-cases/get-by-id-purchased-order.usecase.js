"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdPurchasedOrderUseCase = void 0;
class GetByIdPurchasedOrderUseCase {
    purchasedOrderRepo;
    constructor(repo) {
        this.purchasedOrderRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        const purchasedOrderResponse = await this.purchasedOrderRepo.findById(id, tx);
        if (!purchasedOrderResponse)
            return null;
        const purchasedOrderResult = {
            ...purchasedOrderResponse,
            delivery_date: purchasedOrderResponse.delivery_date.toISOString(),
            created_at: purchasedOrderResponse.created_at.toISOString(),
            updated_at: purchasedOrderResponse.updated_at.toISOString()
        };
        return purchasedOrderResult;
    };
}
exports.GetByIdPurchasedOrderUseCase = GetByIdPurchasedOrderUseCase;
;
