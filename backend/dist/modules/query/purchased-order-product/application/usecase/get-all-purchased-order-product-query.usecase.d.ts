import { PurchasedOrderProductQueryResponse } from "../../domain/purchased-order-product-query.type";
import { IPurchasedOrderProductQueryRespository } from "../../domain/purchased-order-product-query.repository";
import { Transaction } from "sequelize";
export declare class GetAllPurchasedOrderProductQueryUseCase {
    private readonly purchasedOrderProductQueryRepo;
    constructor(repo: IPurchasedOrderProductQueryRespository);
    execute: (tx?: Transaction) => Promise<PurchasedOrderProductQueryResponse[]>;
}
