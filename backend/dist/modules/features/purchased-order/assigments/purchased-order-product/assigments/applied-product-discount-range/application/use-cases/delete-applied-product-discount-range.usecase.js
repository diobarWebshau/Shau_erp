"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAppliedProductDiscountRangeUseCase = void 0;
class DeleteAppliedProductDiscountRangeUseCase {
    appliedProductDiscountRangeRepo;
    constructor(repo) {
        this.appliedProductDiscountRangeRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        await this.appliedProductDiscountRangeRepo.delete(id, tx);
    };
}
exports.DeleteAppliedProductDiscountRangeUseCase = DeleteAppliedProductDiscountRangeUseCase;
;
