"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAppliedProductDiscountClientUseCase = void 0;
class GetAllAppliedProductDiscountClientUseCase {
    appliedProductDiscountClientRepo;
    constructor(repo) {
        this.appliedProductDiscountClientRepo = repo;
    }
    ;
    execute = async (tx) => {
        const appliedProductDiscountClientResponse = await this.appliedProductDiscountClientRepo.findAll(tx);
        return appliedProductDiscountClientResponse;
    };
}
exports.GetAllAppliedProductDiscountClientUseCase = GetAllAppliedProductDiscountClientUseCase;
;
