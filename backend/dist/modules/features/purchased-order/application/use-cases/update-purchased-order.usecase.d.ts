import { PurchasedOrderProps } from "../../domain/purchased-order.types";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderUpdateDto } from "../dto/purchased-order.model.schema";
import { Transaction } from "sequelize";
export declare class UpdatePurchasedOrderUseCase {
    private readonly purchasedOrderRepo;
    constructor(repo: IPurchasedOrderRepository);
    execute: (id: number, data: PurchasedOrderUpdateDto, tx?: Transaction) => Promise<PurchasedOrderProps>;
}
