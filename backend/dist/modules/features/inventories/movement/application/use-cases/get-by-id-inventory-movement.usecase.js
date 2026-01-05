"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdInventoryMovementUseCase = void 0;
class GetByIdInventoryMovementUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    execute = async (id, tx) => {
        const inventoryReponse = await this.repo.findById(id, tx);
        if (!inventoryReponse)
            return null;
        const inventoryResponseFormmated = {
            ...inventoryReponse,
            is_locked: Boolean(inventoryReponse.is_locked),
            created_at: inventoryReponse.created_at.toISOString(),
        };
        return inventoryResponseFormmated;
    };
}
exports.GetByIdInventoryMovementUseCase = GetByIdInventoryMovementUseCase;
;
