import { Transaction } from "sequelize";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderCreateProps } from "../../domain/purchased-order.types";
import { PurchasedOrderResponseschemaDto } from "../dto/purchased-order.model.schema";
export declare class CreatePurchasedOrderUseCase {
    private readonly purchasedOrderRepo;
    constructor(repo: IPurchasedOrderRepository);
    execute: (data: PurchasedOrderCreateProps, tx?: Transaction) => Promise<PurchasedOrderResponseschemaDto>;
}
