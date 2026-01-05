"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePurchasedOrderProductUseCase = void 0;
class DeletePurchasedOrderProductUseCase {
    purchasedOrderProductRepo;
    constructor(repo) {
        this.purchasedOrderProductRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        await this.purchasedOrderProductRepo.delete(id, tx);
    };
}
exports.DeletePurchasedOrderProductUseCase = DeletePurchasedOrderProductUseCase;
;
