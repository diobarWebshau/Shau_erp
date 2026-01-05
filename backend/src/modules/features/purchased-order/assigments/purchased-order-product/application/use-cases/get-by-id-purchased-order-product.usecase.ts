import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductResponseSchemaDto } from "../dto/purchased-order-product.model.schema";
import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { Transaction } from "sequelize";

export class GetByIdPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    constructor(repo: IPurchasedOrderProductRepository) {
        this.purchasedOrderProductRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<PurchasedOrderProductResponseSchemaDto | null> => {
        const purchasedOrderProductResponse: PurchasedOrderProductProps | null = await this.purchasedOrderProductRepo.findById(id, tx);
        if (!purchasedOrderProductResponse) return null;
        return purchasedOrderProductResponse;
    };
};