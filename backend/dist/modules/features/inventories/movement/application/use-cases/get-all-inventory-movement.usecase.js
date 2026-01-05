"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllInventoryMovementUseCase = void 0;
class GetAllInventoryMovementUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    execute = async (tx) => {
        const inventoryReponses = await this.repo.findAll(tx);
        const inventoryResponseFormmated = inventoryReponses.map((im) => ({
            ...im,
            is_locked: Boolean(im.is_locked),
            created_at: im.created_at.toISOString(),
        }));
        return inventoryResponseFormmated;
    };
}
exports.GetAllInventoryMovementUseCase = GetAllInventoryMovementUseCase;
;
