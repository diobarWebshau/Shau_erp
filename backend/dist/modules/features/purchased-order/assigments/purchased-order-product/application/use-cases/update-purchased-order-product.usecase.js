"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchasedOrderProductUseCase = void 0;
class UpdatePurchasedOrderProductUseCase {
    purchasedOrderProductRepo;
    constructor(repo) {
        this.purchasedOrderProductRepo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const purchasedOrderProductResponse = await this.purchasedOrderProductRepo.update(id, data, tx);
        return purchasedOrderProductResponse;
    };
}
exports.UpdatePurchasedOrderProductUseCase = UpdatePurchasedOrderProductUseCase;
;
