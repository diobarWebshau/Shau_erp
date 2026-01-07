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
        return inventroyLocationItemResponses;
    };
}
exports.GetByIdInventoryLocationItemUseCase = GetByIdInventoryLocationItemUseCase;
;
