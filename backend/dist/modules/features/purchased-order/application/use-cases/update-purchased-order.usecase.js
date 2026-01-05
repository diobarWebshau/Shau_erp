"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchasedOrderUseCase = void 0;
class UpdatePurchasedOrderUseCase {
    purchasedOrderRepo;
    constructor(repo) {
        this.purchasedOrderRepo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const purchasedOrderResponse = await this.purchasedOrderRepo.update(id, data, tx);
        const purchasedOrderResult = {
            ...purchasedOrderResponse,
            delivery_date: purchasedOrderResponse.delivery_date.toISOString(),
            created_at: purchasedOrderResponse.created_at.toISOString(),
            updated_at: purchasedOrderResponse.updated_at.toISOString()
        };
        return purchasedOrderResult;
    };
}
exports.UpdatePurchasedOrderUseCase = UpdatePurchasedOrderUseCase;
;
