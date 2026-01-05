import { Transaction } from "sequelize";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderProps, PurchasedOrderUpdateProps } from "../../domain/purchased-order.types";
import { PurchasedOrderResponseschemaDto } from "../dto/purchased-order.model.schema";


export class UpdatePurchasedOrderUseCase {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor(repo: IPurchasedOrderRepository) {
        this.purchasedOrderRepo = repo;
    };

    execute = async (id: number, data: PurchasedOrderUpdateProps, tx?: Transaction): Promise<PurchasedOrderResponseschemaDto> => {
        const purchasedOrderResponse: PurchasedOrderProps = await this.purchasedOrderRepo.update(id, data, tx);
        const purchasedOrderResult: PurchasedOrderResponseschemaDto = {
            ...purchasedOrderResponse,
            delivery_date: purchasedOrderResponse.delivery_date.toISOString(),
            created_at: purchasedOrderResponse.created_at.toISOString(),
            updated_at: purchasedOrderResponse.updated_at.toISOString()
        }
        return purchasedOrderResult;
    };
};