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
        if (!inventroyLocationItemResponses)
            return null;
        const inventroyLocationItemResponsesFormatted = ({
            ...inventroyLocationItemResponses,
            created_at: inventroyLocationItemResponses.created_at.toISOString(),
            updated_at: inventroyLocationItemResponses.updated_at.toISOString()
        });
        return inventroyLocationItemResponsesFormatted;
    };
}
exports.GetByLocationItemInventoryLocationItemUseCase = GetByLocationItemInventoryLocationItemUseCase;
;
