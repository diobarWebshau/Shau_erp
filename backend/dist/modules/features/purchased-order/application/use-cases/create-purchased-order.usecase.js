"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchasedOrderUseCase = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const mapPurchasedOrderDtoToDomain = (data) => {
    return ({
        ...data,
        total_price: decimal_vo_1.DecimalVO.from(data.total_price),
        delivery_date: data.delivery_date ? new Date(data.delivery_date) : null
    });
};
class CreatePurchasedOrderUseCase {
    purchasedOrderRepo;
    constructor(repo) {
        this.purchasedOrderRepo = repo;
    }
    ;
    execute = async (data, tx) => {
        const purchasedOrderResponse = await this.purchasedOrderRepo.create(mapPurchasedOrderDtoToDomain(data), tx);
        return purchasedOrderResponse;
    };
}
exports.CreatePurchasedOrderUseCase = CreatePurchasedOrderUseCase;
;
