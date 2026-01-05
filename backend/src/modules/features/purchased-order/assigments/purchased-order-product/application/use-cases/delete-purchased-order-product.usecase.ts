import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { Transaction } from "sequelize";

export class DeletePurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    constructor(repo: IPurchasedOrderProductRepository) {
        this.purchasedOrderProductRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<void> => {
        await this.purchasedOrderProductRepo.delete(id, tx);
    };
};