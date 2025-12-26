import { ProductFullQueryResult, ProductOrchestratorQuery, ProductSearchCriteria } from "../domain/product-query.type";
import { IProductQueryRepository } from "../domain/product-query.repository";
import { Transaction } from "sequelize";
export declare class ProductQueryRepository implements IProductQueryRepository {
    getAllProductFullQueryResult: (query: ProductSearchCriteria, tx?: Transaction) => Promise<ProductFullQueryResult[]>;
    getByIdProductFullQueryResult: (id: number, tx?: Transaction) => Promise<ProductFullQueryResult | null>;
    getAllProductOrchestratorResult: (query: ProductSearchCriteria, tx?: Transaction) => Promise<ProductOrchestratorQuery[]>;
    getByIdProductOrchestratorResult: (id: number, tx?: Transaction) => Promise<ProductOrchestratorQuery | null>;
}
