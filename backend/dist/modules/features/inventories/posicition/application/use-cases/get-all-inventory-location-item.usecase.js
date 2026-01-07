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
        return inventroyLocationItemResponses;
    };
}
exports.GetAllInventoryLocationItemUseCase = GetAllInventoryLocationItemUseCase;
;
