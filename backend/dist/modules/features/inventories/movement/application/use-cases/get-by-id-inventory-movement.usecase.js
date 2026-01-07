"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdInventoryMovementUseCase = void 0;
class GetByIdInventoryMovementUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    execute = async (id, tx) => {
        const inventoryReponse = await this.repo.findById(id, tx);
        return inventoryReponse;
    };
}
exports.GetByIdInventoryMovementUseCase = GetByIdInventoryMovementUseCase;
;
