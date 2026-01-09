import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductUpdateDto } from "../dto/purchased-order-product.model.schema";
import { Transaction } from "sequelize";
export declare class UpdatePurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo;
    constructor(repo: IPurchasedOrderProductRepository);
    execute: (id: number, data: PurchasedOrderProductUpdateDto, tx?: Transaction) => Promise<PurchasedOrderProductProps>;
}
