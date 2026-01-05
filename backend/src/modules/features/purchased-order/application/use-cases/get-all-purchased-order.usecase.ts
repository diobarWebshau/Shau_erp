import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderResponseschemaDto } from "../dto/purchased-order.model.schema";
import { PurchasedOrderProps } from "../../domain/purchased-order.types";
import { Transaction } from "sequelize";


export class GetAllPurchasedOrderUseCase {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor(repo: IPurchasedOrderRepository) {
        this.purchasedOrderRepo = repo;
    };

    execute = async (tx?: Transaction): Promise<PurchasedOrderResponseschemaDto[]> => {
        const purchasedOrderResponses: PurchasedOrderProps[] = await this.purchasedOrderRepo.findAll(tx);
        const purchasedOrderResults: PurchasedOrderResponseschemaDto[] = purchasedOrderResponses.map((po) => ({
            ...po,
            delivery_date: po.delivery_date.toISOString(),
            created_at: po.created_at.toISOString(),
            updated_at: po.updated_at.toISOString()
        }));
        return purchasedOrderResults;
    };
};