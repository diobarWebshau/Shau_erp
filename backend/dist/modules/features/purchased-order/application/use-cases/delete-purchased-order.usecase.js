"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePurchasedOrderUseCase = void 0;
class DeletePurchasedOrderUseCase {
    purchasedOrderRepo;
    constructor(repo) {
        this.purchasedOrderRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        await this.purchasedOrderRepo.delete(id, tx);
    };
}
exports.DeletePurchasedOrderUseCase = DeletePurchasedOrderUseCase;
;
