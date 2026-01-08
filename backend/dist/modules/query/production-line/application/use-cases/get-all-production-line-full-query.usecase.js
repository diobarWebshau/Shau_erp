"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductionLineFullQueryUseCase = void 0;
const product_query_mapper_1 = require("@modules/core/product/infrastructure/http/product-query-mapper");
class GetAllProductionLineFullQueryUseCase {
    repo;
    constructor(repo) { this.repo = repo; }
    ;
    async execute(query, tx) {
        const productionLineReponses = await this.repo.getAllProductionLineFullQuery((0, product_query_mapper_1.mapProductQueryToDomain)(query), tx);
        return productionLineReponses;
    }
    ;
}
exports.GetAllProductionLineFullQueryUseCase = GetAllProductionLineFullQueryUseCase;
;
