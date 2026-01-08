"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllInventoryTransferUseCase = void 0;
class GetAllInventoryTransferUseCase {
    inventoryTransferRepo;
    constructor(inventoryTransferRepo) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    }
    ;
    execute = async (tx) => {
        const inventoryTransactionResponses = await this.inventoryTransferRepo.findAll(tx);
        return inventoryTransactionResponses;
    };
}
exports.GetAllInventoryTransferUseCase = GetAllInventoryTransferUseCase;
;
