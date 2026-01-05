import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductResponseSchemaDto } from "../dto/purchased-order-product.model.schema";
import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { Transaction } from "sequelize";

export class GetAllPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    constructor(repo: IPurchasedOrderProductRepository) {
        this.purchasedOrderProductRepo = repo;
    };
    execute = async (tx?: Transaction): Promise<PurchasedOrderProductResponseSchemaDto[]> => {
        const purchasedOrderProduct: PurchasedOrderProductProps[] = await this.purchasedOrderProductRepo.findAll(tx);
        return purchasedOrderProduct;
    };
};