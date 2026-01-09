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
        return purchasedOrderResponse;
    };
}
exports.GetByIdPurchasedOrderUseCase = GetByIdPurchasedOrderUseCase;
;
