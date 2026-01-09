import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { Transaction } from "sequelize";

export class GetAllPurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    constructor(repo: IPurchasedOrderProductRepository) {
        this.purchasedOrderProductRepo = repo;
    };
    execute = async (tx?: Transaction): Promise<PurchasedOrderProductProps[]> => {
        const purchasedOrderProduct: PurchasedOrderProductProps[] = await this.purchasedOrderProductRepo.findAll(tx);
        return purchasedOrderProduct;
    };
};