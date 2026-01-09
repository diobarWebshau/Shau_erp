import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderProps } from "../../domain/purchased-order.types";
import { Transaction } from "sequelize";


export class GetAllPurchasedOrderUseCase {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor(repo: IPurchasedOrderRepository) {
        this.purchasedOrderRepo = repo;
    };

    execute = async (tx?: Transaction): Promise<PurchasedOrderProps[]> => {
        const purchasedOrderResponses: PurchasedOrderProps[] = await this.purchasedOrderRepo.findAll(tx);
        return purchasedOrderResponses;
    };
};