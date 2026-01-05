import { PurchasedOrderProductUpdateProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductResponseSchemaDto } from "../dto/purchased-order-product.model.schema";
import { Transaction } from "sequelize";
export declare class UpdatePurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo;
    constructor(repo: IPurchasedOrderProductRepository);
    execute: (id: number, data: PurchasedOrderProductUpdateProps, tx?: Transaction) => Promise<PurchasedOrderProductResponseSchemaDto>;
}
