"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdInventoryTransferUseCase = void 0;
class GetByIdInventoryTransferUseCase {
    inventoryTransferRepo;
    constructor(inventoryTransferRepo) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    }
    ;
    execute = async (id, tx) => {
        const inventoryTransactionResponse = await this.inventoryTransferRepo.findById(id, tx);
        return inventoryTransactionResponse;
    };
}
exports.GetByIdInventoryTransferUseCase = GetByIdInventoryTransferUseCase;
;
