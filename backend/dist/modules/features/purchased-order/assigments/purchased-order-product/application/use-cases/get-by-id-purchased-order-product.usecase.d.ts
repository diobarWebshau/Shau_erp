import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductResponseSchemaDto } from "../dto/purchased-order-product.model.schema";
import { Transaction } from "sequelize";
export declare class GetByIdPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo;
    constructor(repo: IPurchasedOrderProductRepository);
    execute: (id: number, tx?: Transaction) => Promise<PurchasedOrderProductResponseSchemaDto | null>;
}
