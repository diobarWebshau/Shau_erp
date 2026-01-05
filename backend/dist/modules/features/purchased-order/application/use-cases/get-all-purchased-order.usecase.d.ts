import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderResponseschemaDto } from "../dto/purchased-order.model.schema";
import { Transaction } from "sequelize";
export declare class GetAllPurchasedOrderUseCase {
    private readonly purchasedOrderRepo;
    constructor(repo: IPurchasedOrderRepository);
    execute: (tx?: Transaction) => Promise<PurchasedOrderResponseschemaDto[]>;
}
