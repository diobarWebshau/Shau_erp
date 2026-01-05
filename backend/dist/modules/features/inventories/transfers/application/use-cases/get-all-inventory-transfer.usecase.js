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
        if (!inventoryTransactionResponses.length)
            return [];
        const inventoryTransactionResponsesFormatted = inventoryTransactionResponses.map((it) => ({
            ...it,
            created_at: it.created_at.toISOString(),
            updated_at: it.updated_at.toISOString()
        }));
        return inventoryTransactionResponsesFormatted;
    };
}
exports.GetAllInventoryTransferUseCase = GetAllInventoryTransferUseCase;
;
