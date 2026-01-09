import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { Transaction } from "sequelize";
export declare class GetByIdPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo;
    constructor(repo: IPurchasedOrderProductRepository);
    execute: (id: number, tx?: Transaction) => Promise<PurchasedOrderProductProps | null>;
}
