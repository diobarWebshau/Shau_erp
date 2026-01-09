"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdAppliedProductDiscountClientUseCase = void 0;
class GetByIdAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        const appliedProductDiscountClientResponse = await this.appliedProductDiscountClientRepo.findById(id, tx);
        return appliedProductDiscountClientResponse;
    };
}
exports.GetByIdAppliedProductDiscountClientUseCase = GetByIdAppliedProductDiscountClientUseCase;
;
