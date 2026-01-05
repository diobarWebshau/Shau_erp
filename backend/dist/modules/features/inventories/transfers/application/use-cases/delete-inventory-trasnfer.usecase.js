"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteInventoryTransferUseCase = void 0;
class DeleteInventoryTransferUseCase {
    inventoryTransferRepo;
    constructor(inventoryTransferRepo) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    }
    ;
    execute = async (id, tx) => {
        await this.inventoryTransferRepo.delete(id, tx);
    };
}
exports.DeleteInventoryTransferUseCase = DeleteInventoryTransferUseCase;
;
