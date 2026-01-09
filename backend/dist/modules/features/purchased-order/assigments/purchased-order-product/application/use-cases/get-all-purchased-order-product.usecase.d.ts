import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { Transaction } from "sequelize";
export declare class GetAllPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo;
    constructor(repo: IPurchasedOrderProductRepository);
    execute: (tx?: Transaction) => Promise<PurchasedOrderProductProps[]>;
}
