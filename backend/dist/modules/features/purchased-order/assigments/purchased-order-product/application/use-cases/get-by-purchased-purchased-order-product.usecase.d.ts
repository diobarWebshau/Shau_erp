import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductResponseSchemaDto } from "../dto/purchased-order-product.model.schema";
import { Transaction } from "sequelize";
export declare class GetByPurchasedOrderIdPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo;
    constructor(repo: IPurchasedOrderProductRepository);
    execute: (purchase_order_id: number, tx?: Transaction) => Promise<PurchasedOrderProductResponseSchemaDto[]>;
}
