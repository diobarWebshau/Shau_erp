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
        return InventoryLocationItemResponse;
    };
}
exports.UpdateInventoryLocationItemUseCase = UpdateInventoryLocationItemUseCase;
;
