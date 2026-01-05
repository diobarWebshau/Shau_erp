import { Transaction } from "sequelize";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderUpdateProps } from "../../domain/purchased-order.types";
import { PurchasedOrderResponseschemaDto } from "../dto/purchased-order.model.schema";
export declare class UpdatePurchasedOrderUseCase {
    private readonly purchasedOrderRepo;
    constructor(repo: IPurchasedOrderRepository);
    execute: (id: number, data: PurchasedOrderUpdateProps, tx?: Transaction) => Promise<PurchasedOrderResponseschemaDto>;
}
