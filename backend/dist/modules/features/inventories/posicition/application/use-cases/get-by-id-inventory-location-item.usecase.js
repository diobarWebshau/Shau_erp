"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdInventoryLocationItemUseCase = void 0;
class GetByIdInventoryLocationItemUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    execute = async (id, tx) => {
        const inventroyLocationItemResponses = await this.repo.findById(id, tx);
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
exports.GetByIdInventoryLocationItemUseCase = GetByIdInventoryLocationItemUseCase;
;
