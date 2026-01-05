"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteInventoryMovementUseCase = void 0;
class DeleteInventoryMovementUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    execute = async (id, tx) => await this.repo.delete(id, tx);
}
exports.DeleteInventoryMovementUseCase = DeleteInventoryMovementUseCase;
;
