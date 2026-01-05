"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdPurchasedOrderProductUseCase = void 0;
class GetByIdPurchasedOrderProductUseCase {
    purchasedOrderProductRepo;
    constructor(repo) {
        this.purchasedOrderProductRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        const purchasedOrderProductResponse = await this.purchasedOrderProductRepo.findById(id, tx);
        if (!purchasedOrderProductResponse)
            return null;
        return purchasedOrderProductResponse;
    };
}
exports.GetByIdPurchasedOrderProductUseCase = GetByIdPurchasedOrderProductUseCase;
;
