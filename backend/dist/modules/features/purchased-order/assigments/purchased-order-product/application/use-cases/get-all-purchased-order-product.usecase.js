"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPurchasedOrderProductUseCase = void 0;
class GetAllPurchasedOrderProductUseCase {
    purchasedOrderProductRepo;
    constructor(repo) {
        this.purchasedOrderProductRepo = repo;
    }
    ;
    execute = async (tx) => {
        const purchasedOrderProduct = await this.purchasedOrderProductRepo.findAll(tx);
        return purchasedOrderProduct;
    };
}
exports.GetAllPurchasedOrderProductUseCase = GetAllPurchasedOrderProductUseCase;
;
