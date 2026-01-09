import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderProps } from "../../domain/purchased-order.types";
import { Transaction } from "sequelize";
export declare class GetAllPurchasedOrderUseCase {
    private readonly purchasedOrderRepo;
    constructor(repo: IPurchasedOrderRepository);
    execute: (tx?: Transaction) => Promise<PurchasedOrderProps[]>;
}
