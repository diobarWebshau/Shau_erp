import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderResponseschemaDto } from "../dto/purchased-order.model.schema";
import { Transaction } from "sequelize";
export declare class GetByIdPurchasedOrderUseCase {
    private readonly purchasedOrderRepo;
    constructor(repo: IPurchasedOrderRepository);
    execute: (id: number, tx?: Transaction) => Promise<PurchasedOrderResponseschemaDto | null>;
}
