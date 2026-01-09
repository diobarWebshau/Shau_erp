import { PurchasedOrderProps, PurchasedOrderUpdateProps } from "../../domain/purchased-order.types";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderUpdateDto } from "../dto/purchased-order.model.schema";
import { Transaction } from "sequelize";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";

const mapPurchasedOrderUpdateDtoToDomain = (data: PurchasedOrderUpdateDto): PurchasedOrderUpdateProps => {
    const { delivery_date, total_price, ...poRest } = data;
    return ({
        ...poRest,
        ...(
            delivery_date !== undefined ? { delivery_date: delivery_date ? new Date(delivery_date) : null } : {}
        ),
        ...(
            total_price !== undefined ? { total_price: DecimalVO.from(total_price) } : {}
        )
    })
};

export class UpdatePurchasedOrderUseCase {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor(repo: IPurchasedOrderRepository) {
        this.purchasedOrderRepo = repo;
    };

    execute = async (id: number, data: PurchasedOrderUpdateDto, tx?: Transaction): Promise<PurchasedOrderProps> => {
        const purchasedOrderResponse: PurchasedOrderProps = await this.purchasedOrderRepo.update(id, mapPurchasedOrderUpdateDtoToDomain(data), tx);
        return purchasedOrderResponse;
    };
};

