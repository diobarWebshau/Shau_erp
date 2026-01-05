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
        if (!inventoryTransactionResponse)
            return null;
        const inventoryTransactionResponsesFormatted = {
            ...inventoryTransactionResponse,
            created_at: inventoryTransactionResponse.created_at.toISOString(),
            updated_at: inventoryTransactionResponse.updated_at.toISOString()
        };
        return inventoryTransactionResponsesFormatted;
    };
}
exports.GetByIdInventoryTransferUseCase = GetByIdInventoryTransferUseCase;
;
