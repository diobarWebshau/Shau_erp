import { ProductionLineQueryResultDto, ProductionLineSearchCriteria } from "../../domain/production-line-query.types";
import { IProductionLineQueryRepository } from "../../domain/production-line-query.respository.interface";
import { Transaction } from "sequelize";
export declare class GetAllProductionLineFullQueryUseCase {
    private readonly repo;
    constructor(repo: IProductionLineQueryRepository);
    execute(query: ProductionLineSearchCriteria, tx?: Transaction): Promise<ProductionLineQueryResultDto[]>;
}
