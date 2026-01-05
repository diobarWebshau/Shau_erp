import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderResponseschemaDto } from "../dto/purchased-order.model.schema";
import { PurchasedOrderProps } from "../../domain/purchased-order.types";
import { Transaction } from "sequelize";


export class GetByIdPurchasedOrderUseCase {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor(repo: IPurchasedOrderRepository) {
        this.purchasedOrderRepo = repo;
    };

    execute = async (id: number, tx?: Transaction): Promise<PurchasedOrderResponseschemaDto | null> => {
        const purchasedOrderResponse: PurchasedOrderProps | null = await this.purchasedOrderRepo.findById(id, tx);
        if (!purchasedOrderResponse) return null;
        const purchasedOrderResult: PurchasedOrderResponseschemaDto = {
            ...purchasedOrderResponse,
            delivery_date: purchasedOrderResponse.delivery_date.toISOString(),
            created_at: purchasedOrderResponse.created_at.toISOString(),
            updated_at: purchasedOrderResponse.updated_at.toISOString()
        }
        return purchasedOrderResult;
    };
};