import { PurchasedOrderCreateProps, PurchasedOrderProps } from "../../domain/purchased-order.types";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderCreateDto } from "../dto/purchased-order.model.schema";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { Transaction } from "sequelize";

const mapPurchasedOrderDtoToDomain = (data: PurchasedOrderCreateDto): PurchasedOrderCreateProps => {
    return ({
        ...data,
        total_price: DecimalVO.from(data.total_price),
        delivery_date: data.delivery_date ? new Date(data.delivery_date) : null
    })
};

export class CreatePurchasedOrderUseCase {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor(repo: IPurchasedOrderRepository) {
        this.purchasedOrderRepo = repo;
    };

    execute = async (data: PurchasedOrderCreateDto, tx?: Transaction): Promise<PurchasedOrderProps> => {
        const purchasedOrderResponse: PurchasedOrderProps = await this.purchasedOrderRepo.create(mapPurchasedOrderDtoToDomain(data), tx);
        return purchasedOrderResponse;
    };
};