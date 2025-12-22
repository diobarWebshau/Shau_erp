import { ProductFullQueryResult, ProductOrchestratorQuery, ProductSearchCriteria } from "../domain/product-query.type";
import { IProductQueryRepository } from "../domain/product-query.repository";
export declare class ProductQueryRepository implements IProductQueryRepository {
    getAllProductFullQueryResult: (query: ProductSearchCriteria) => Promise<ProductFullQueryResult[]>;
    getByIdProductFullQueryResult: (id: number) => Promise<ProductFullQueryResult | null>;
    getAllProductOrchestratorResult: (query: ProductSearchCriteria) => Promise<ProductOrchestratorQuery[]>;
    getByIdProductOrchestratorResult: (id: number) => Promise<ProductOrchestratorQuery | null>;
}
