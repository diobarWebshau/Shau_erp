import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderProps } from "../../domain/purchased-order.types";
import { Transaction } from "sequelize";
export declare class GetByIdPurchasedOrderUseCase {
    private readonly purchasedOrderRepo;
    constructor(repo: IPurchasedOrderRepository);
    execute: (id: number, tx?: Transaction) => Promise<PurchasedOrderProps | null>;
}
