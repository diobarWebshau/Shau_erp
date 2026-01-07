import { PurchasedOrderFullQueryResultDto, PurchasedOrderSearchCriteria } from "../../domain/purchased-order-query.types";
import { IPurchasedOrderQueryRepository } from "../../domain/purchased-order-query.repository.interface";
import { Transaction } from "sequelize";
export declare class GetAllPurchasedOrderFullQuery {
    private readonly purchasedOrderQueryRepo;
    constructor(repo: IPurchasedOrderQueryRepository);
    execute: (query: PurchasedOrderSearchCriteria, tx?: Transaction) => Promise<PurchasedOrderFullQueryResultDto[]>;
}
