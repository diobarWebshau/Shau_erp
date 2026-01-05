"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByPurchasedOrderIdPurchasedOrderProductUseCase = void 0;
class GetByPurchasedOrderIdPurchasedOrderProductUseCase {
    purchasedOrderProductRepo;
    constructor(repo) {
        this.purchasedOrderProductRepo = repo;
    }
    ;
    execute = async (purchase_order_id, tx) => {
        const purchasedOrderProductResponse = await this.purchasedOrderProductRepo.findByPurchasedId(purchase_order_id, tx);
        return purchasedOrderProductResponse;
    };
}
exports.GetByPurchasedOrderIdPurchasedOrderProductUseCase = GetByPurchasedOrderIdPurchasedOrderProductUseCase;
;
