import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { Transaction } from "sequelize";
export declare class GetByPurchasedOrderIdPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo;
    constructor(repo: IPurchasedOrderProductRepository);
    execute: (purchase_order_id: number, tx?: Transaction) => Promise<PurchasedOrderProductProps[]>;
}
