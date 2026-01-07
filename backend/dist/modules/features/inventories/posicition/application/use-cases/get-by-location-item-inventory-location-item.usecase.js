"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByLocationItemInventoryLocationItemUseCase = void 0;
class GetByLocationItemInventoryLocationItemUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    execute = async (location_id, item_id, item_type, tx) => {
        const inventroyLocationItemResponses = await this.repo.findByLocationItem(location_id, item_id, item_type, tx);
        return inventroyLocationItemResponses;
    };
}
exports.GetByLocationItemInventoryLocationItemUseCase = GetByLocationItemInventoryLocationItemUseCase;
;
