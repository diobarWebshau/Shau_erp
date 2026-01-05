import { ProductionLineFullQueryResult, ProductionLineSearchCriteria } from "../../domain/production-line-query.types";
import { IProductionLineQueryRepository } from "../../domain/production-line-query.respository.interface";
import { Transaction } from "sequelize";
export declare class ProductionLineQueryRepository implements IProductionLineQueryRepository {
    getAllProductionLineFullQuery: (query: ProductionLineSearchCriteria, tx?: Transaction) => Promise<ProductionLineFullQueryResult[]>;
    getByIdProductionLineFullQuery: (id: number, tx?: Transaction) => Promise<ProductionLineFullQueryResult | null>;
}
