import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderProps } from "../../domain/purchased-order.types";
import { Transaction } from "sequelize";


export class GetByIdPurchasedOrderUseCase {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor(repo: IPurchasedOrderRepository) {
        this.purchasedOrderRepo = repo;
    };

    execute = async (id: number, tx?: Transaction): Promise<PurchasedOrderProps | null> => {
        const purchasedOrderResponse: PurchasedOrderProps | null = await this.purchasedOrderRepo.findById(id, tx);
        return purchasedOrderResponse;
    };
};