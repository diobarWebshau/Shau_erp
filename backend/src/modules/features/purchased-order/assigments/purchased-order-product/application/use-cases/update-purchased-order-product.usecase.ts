import { PurchasedOrderProductProps, PurchasedOrderProductUpdateProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductUpdateDto } from "../dto/purchased-order-product.model.schema";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { Transaction } from "sequelize";

const mapPopUpdateDtoToDomain = (data: PurchasedOrderProductUpdateDto): PurchasedOrderProductUpdateProps => {
    const { original_price, qty, recorded_price, ...popRest } = data;
    return ({
        ...popRest,
        ...(
            original_price !== undefined
                ? { original_price: DecimalVO.from(original_price) }
                : {}
        ),
        ...(
            qty !== undefined
                ? { qty: DecimalVO.from(qty) }
                : {}
        ),
        ...(
            recorded_price !== undefined
                ? { recorded_price: DecimalVO.from(recorded_price) }
                : {}
        ),
    });
};

export class UpdatePurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    constructor(repo: IPurchasedOrderProductRepository) {
        this.purchasedOrderProductRepo = repo;
    };
    execute = async (id: number, data: PurchasedOrderProductUpdateDto, tx?: Transaction): Promise<PurchasedOrderProductProps> => {
        const purchasedOrderProductResponse: PurchasedOrderProductProps = await this.purchasedOrderProductRepo.update(id, mapPopUpdateDtoToDomain(data), tx);
        return purchasedOrderProductResponse;
    };
};