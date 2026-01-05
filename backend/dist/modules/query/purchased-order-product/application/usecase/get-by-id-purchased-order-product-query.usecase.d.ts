import { PurchasedOrderProductQueryResponseSchemaDto } from "../dto/purchased-order-product-query.model.schema";
import { IPurchasedOrderProductQueryRespository } from "../../domain/purchased-order-product-query.repository";
import { Transaction } from "sequelize";
export declare class GetByIdPurchasedOrderProductQueryUseCase {
    private readonly purchasedOrderProductQueryRepo;
    constructor(repo: IPurchasedOrderProductQueryRespository);
    execute: (id: number, tx?: Transaction) => Promise<PurchasedOrderProductQueryResponseSchemaDto | null>;
}
