"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchasedOrderUseCase = void 0;
class CreatePurchasedOrderUseCase {
    purchasedOrderRepo;
    constructor(repo) {
        this.purchasedOrderRepo = repo;
    }
    ;
    execute = async (data, tx) => {
        const purchasedOrderResponse = await this.purchasedOrderRepo.create(data, tx);
        const purchasedOrderResult = {
            ...purchasedOrderResponse,
            delivery_date: purchasedOrderResponse.delivery_date.toISOString(),
            created_at: purchasedOrderResponse.created_at.toISOString(),
            updated_at: purchasedOrderResponse.updated_at.toISOString()
        };
        return purchasedOrderResult;
    };
}
exports.CreatePurchasedOrderUseCase = CreatePurchasedOrderUseCase;
;
