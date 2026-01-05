import { Transaction } from "sequelize";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderCreateProps, PurchasedOrderProps } from "../../domain/purchased-order.types";
import { PurchasedOrderResponseschemaDto } from "../dto/purchased-order.model.schema";


export class CreatePurchasedOrderUseCase {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor(repo: IPurchasedOrderRepository) {
        this.purchasedOrderRepo = repo;
    };

    execute = async (data: PurchasedOrderCreateProps, tx?: Transaction): Promise<PurchasedOrderResponseschemaDto> => {
        const purchasedOrderResponse: PurchasedOrderProps = await this.purchasedOrderRepo.create(data, tx);
        const purchasedOrderResult: PurchasedOrderResponseschemaDto = {
            ...purchasedOrderResponse,
            delivery_date: purchasedOrderResponse.delivery_date.toISOString(),
            created_at: purchasedOrderResponse.created_at.toISOString(),
            updated_at: purchasedOrderResponse.updated_at.toISOString()
        }
        return purchasedOrderResult;
    };
};