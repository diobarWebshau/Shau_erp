import { ProductionLineFullQueryResult } from "../../domain/production-line-query.types";
import { ProductionLineQueryDto } from "../../application/dto/production-line-query.model.schema";
import { IProductionLineQueryRepository } from "../../domain/production-line-query.respository.interface";
import { Transaction } from "sequelize";
export declare class GetAllProductionLineFullQueryUseCase {
    private readonly repo;
    constructor(repo: IProductionLineQueryRepository);
    execute(query: ProductionLineQueryDto, tx?: Transaction): Promise<ProductionLineFullQueryResult[]>;
}
