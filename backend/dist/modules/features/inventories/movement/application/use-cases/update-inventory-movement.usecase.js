"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInventoryMovementUseCase = void 0;
class UpdateInventoryMovementUseCase {
    repo;
    constructor({ repo }) {
        this.repo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const inventoryMovementResponse = await this.repo.update(id, data, tx);
        const inventoryMovementResponseFormatted = {
            ...inventoryMovementResponse,
            is_locked: Boolean(inventoryMovementResponse.is_locked),
            created_at: inventoryMovementResponse.created_at.toISOString()
        };
        return inventoryMovementResponseFormatted;
    };
}
exports.UpdateInventoryMovementUseCase = UpdateInventoryMovementUseCase;
;
