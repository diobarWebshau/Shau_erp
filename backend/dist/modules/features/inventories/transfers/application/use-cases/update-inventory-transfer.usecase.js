"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInventoryTransferUseCase = void 0;
class UpdateInventoryTransferUseCase {
    inventoryTransferRepo;
    constructor(inventoryTransferRepo) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    }
    ;
    execute = async (id, data, tx) => {
        const inventoryTransferResponse = await this.inventoryTransferRepo.update(id, data, tx);
        const inventoryTransfer = {
            ...inventoryTransferResponse,
            created_at: inventoryTransferResponse.created_at.toISOString(),
            updated_at: inventoryTransferResponse.updated_at.toISOString()
        };
        return inventoryTransfer;
    };
}
exports.UpdateInventoryTransferUseCase = UpdateInventoryTransferUseCase;
