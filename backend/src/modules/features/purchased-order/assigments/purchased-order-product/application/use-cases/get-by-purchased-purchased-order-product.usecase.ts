import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { Transaction } from "sequelize";

export class GetByPurchasedOrderIdPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    constructor(repo: IPurchasedOrderProductRepository) {
        this.purchasedOrderProductRepo = repo;
    };
    execute = async (purchase_order_id: number, tx?: Transaction): Promise<PurchasedOrderProductProps[]> => {
        const purchasedOrderProductResponse: PurchasedOrderProductProps[] = await this.purchasedOrderProductRepo.findByPurchasedId(purchase_order_id, tx);
        return purchasedOrderProductResponse;
    };
};