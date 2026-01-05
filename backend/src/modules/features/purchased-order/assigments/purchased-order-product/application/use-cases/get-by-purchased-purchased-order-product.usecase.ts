import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductResponseSchemaDto } from "../dto/purchased-order-product.model.schema";
import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { Transaction } from "sequelize";

export class GetByPurchasedOrderIdPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    constructor(repo: IPurchasedOrderProductRepository) {
        this.purchasedOrderProductRepo = repo;
    };
    execute = async (purchase_order_id: number, tx?: Transaction): Promise<PurchasedOrderProductResponseSchemaDto[]> => {
        const purchasedOrderProductResponse: PurchasedOrderProductProps[] = await this.purchasedOrderProductRepo.findByPurchasedId(purchase_order_id, tx);
        return purchasedOrderProductResponse;
    };
};