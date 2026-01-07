"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllInventoryMovementUseCase = void 0;
class GetAllInventoryMovementUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    execute = async (tx) => {
        const inventoryReponses = await this.repo.findAll(tx);
        return inventoryReponses;
    };
}
exports.GetAllInventoryMovementUseCase = GetAllInventoryMovementUseCase;
;
