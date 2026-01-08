import { ProductionLineFullQueryResult } from "../../domain/production-line-query.types";
import { ProductionLineQueryDto } from "../../application/dto/production-line-query.model.schema";
import { IProductionLineQueryRepository } from "../../domain/production-line-query.respository.interface";
import { mapProductQueryToDomain } from "@modules/core/product/infrastructure/http/product-query-mapper";
import { Transaction } from "sequelize";


export class GetAllProductionLineFullQueryUseCase {
    private readonly repo: IProductionLineQueryRepository;
    constructor(repo: IProductionLineQueryRepository) { this.repo = repo };
    async execute(query: ProductionLineQueryDto, tx?: Transaction): Promise<ProductionLineFullQueryResult[]> {
        const productionLineReponses: ProductionLineFullQueryResult[] = await this.repo.getAllProductionLineFullQuery(mapProductQueryToDomain(query), tx);
        return productionLineReponses;
    };
};