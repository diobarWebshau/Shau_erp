import { PurchasedOrderProductQueryResponseSchemaDto } from "../dto/purchased-order-product-query.model.schema";
import { IPurchasedOrderProductQueryRespository } from "../../domain/purchased-order-product-query.repository";
import { Transaction } from "sequelize";
export declare class GetByPurchasedPurchasedOrderProductQueryUseCase {
    private readonly purchasedOrderProductQueryRepo;
    constructor(repo: IPurchasedOrderProductQueryRespository);
    execute: (purchase_order_id: number, tx?: Transaction) => Promise<PurchasedOrderProductQueryResponseSchemaDto[]>;
}
