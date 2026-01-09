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
        return purchasedOrderResponses;
    };
}
exports.GetAllPurchasedOrderUseCase = GetAllPurchasedOrderUseCase;
;
