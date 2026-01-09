import { PurchasedOrderProps } from "../../domain/purchased-order.types";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderCreateDto } from "../dto/purchased-order.model.schema";
import { Transaction } from "sequelize";
export declare class CreatePurchasedOrderUseCase {
    private readonly purchasedOrderRepo;
    constructor(repo: IPurchasedOrderRepository);
    execute: (data: PurchasedOrderCreateDto, tx?: Transaction) => Promise<PurchasedOrderProps>;
}
