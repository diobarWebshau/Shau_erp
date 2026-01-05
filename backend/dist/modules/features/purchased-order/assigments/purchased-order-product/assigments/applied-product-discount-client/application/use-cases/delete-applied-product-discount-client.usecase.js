"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAppliedProductDiscountClientUseCase = void 0;
class DeleteAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        await this.appliedProductDiscountClientRepo.delete(id, tx);
    };
}
exports.DeleteAppliedProductDiscountClientUseCase = DeleteAppliedProductDiscountClientUseCase;
;
