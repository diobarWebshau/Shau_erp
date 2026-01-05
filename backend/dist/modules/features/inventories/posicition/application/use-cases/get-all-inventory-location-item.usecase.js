"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllInventoryLocationItemUseCase = void 0;
class GetAllInventoryLocationItemUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    execute = async (tx) => {
        const inventroyLocationItemResponses = await this.repo.findAll(tx);
        const inventroyLocationItemResponsesFormatted = inventroyLocationItemResponses.map((ili) => ({
            ...ili,
            created_at: ili.created_at.toISOString(),
            updated_at: ili.updated_at.toISOString()
        }));
        return inventroyLocationItemResponsesFormatted;
    };
}
exports.GetAllInventoryLocationItemUseCase = GetAllInventoryLocationItemUseCase;
;
