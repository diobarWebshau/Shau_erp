"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInventoryLocationItemUseCase = void 0;
class UpdateInventoryLocationItemUseCase {
    repo;
    constructor({ repo }) {
        this.repo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const InventoryLocationItemResponse = await this.repo.update(id, data, tx);
        const InventoryLocationItemResponseFormatted = {
            ...InventoryLocationItemResponse,
            created_at: InventoryLocationItemResponse.created_at.toISOString(),
            updated_at: InventoryLocationItemResponse.updated_at.toISOString()
        };
        return InventoryLocationItemResponseFormatted;
    };
}
exports.UpdateInventoryLocationItemUseCase = UpdateInventoryLocationItemUseCase;
;
