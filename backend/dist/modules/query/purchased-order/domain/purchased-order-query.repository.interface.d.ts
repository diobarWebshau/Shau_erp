import { PurchasedOrderFullQueryResult, PurchasedOrderSearchCriteria } from "./purchased-order-query.types";
import { Transaction } from "sequelize";
export interface IPurchasedOrderQueryRepository {
    getAllPurchasedOrderFullQueryResult(query: PurchasedOrderSearchCriteria, tx?: Transaction): Promise<PurchasedOrderFullQueryResult[]>;
    getByIdPurchasedOrderFullQueryResult(id: number, tx?: Transaction): Promise<PurchasedOrderFullQueryResult | null>;
}
