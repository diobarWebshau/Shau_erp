import { IPurchasedOrderRepository } from "@modules/features/purchased-order/domain/purchased-order.repository.interface";
import { PurchasedOrderProductCreateProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductResponseSchemaDto } from "../dto/purchased-order-product.model.schema";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { Transaction } from "sequelize";
interface ICreatePurchasedOrderProductUseCase {
    purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    productRepo: IProductRepository;
    purchasedOrderRepo: IPurchasedOrderRepository;
}
export declare class CreatePurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo;
    private readonly productRepo;
    private readonly purchasedOrderRepo;
    constructor({ productRepo, purchasedOrderProductRepo, purchasedOrderRepo }: ICreatePurchasedOrderProductUseCase);
    execute: (data: PurchasedOrderProductCreateProps, tx?: Transaction) => Promise<PurchasedOrderProductResponseSchemaDto>;
}
export {};
