"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLocationFullQueryUseCase = void 0;
class GetAllLocationFullQueryUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async execute(query, tx) {
        const locationQueryReponses = await this.repo.getAllLocationFullQuery(query, tx);
        return locationQueryReponses;
    }
    ;
}
exports.GetAllLocationFullQueryUseCase = GetAllLocationFullQueryUseCase;
;
