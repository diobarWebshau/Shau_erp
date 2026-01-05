import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { Transaction } from "sequelize";
export declare class DeletePurchasedOrderUseCase {
    private readonly purchasedOrderRepo;
    constructor(repo: IPurchasedOrderRepository);
    execute: (id: number, tx?: Transaction) => Promise<void>;
}
