import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { Transaction } from "sequelize";

export class DeletePurchasedOrderUseCase {
    private readonly purchasedOrderRepo: IPurchasedOrderRepository;
    constructor(repo: IPurchasedOrderRepository) {
        this.purchasedOrderRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<void> => {
        await this.purchasedOrderRepo.delete(id, tx);
    };
};