import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { Transaction } from "sequelize";
export declare class DeletePurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo;
    constructor(repo: IPurchasedOrderProductRepository);
    execute: (id: number, tx?: Transaction) => Promise<void>;
}
