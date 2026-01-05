"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteInventoryLocationItemUseCase = void 0;
class DeleteInventoryLocationItemUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    execute = async (id, tx) => await this.repo.delete(id, tx);
}
exports.DeleteInventoryLocationItemUseCase = DeleteInventoryLocationItemUseCase;
;
