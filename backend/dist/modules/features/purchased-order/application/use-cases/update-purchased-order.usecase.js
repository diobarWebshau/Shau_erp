"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchasedOrderUseCase = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const mapPurchasedOrderUpdateDtoToDomain = (data) => {
    const { delivery_date, total_price, ...poRest } = data;
    return ({
        ...poRest,
        ...(delivery_date !== undefined ? { delivery_date: delivery_date ? new Date(delivery_date) : null } : {}),
        ...(total_price !== undefined ? { total_price: decimal_vo_1.DecimalVO.from(total_price) } : {})
    });
};
class UpdatePurchasedOrderUseCase {
    purchasedOrderRepo;
    constructor(repo) {
        this.purchasedOrderRepo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const purchasedOrderResponse = await this.purchasedOrderRepo.update(id, mapPurchasedOrderUpdateDtoToDomain(data), tx);
        return purchasedOrderResponse;
    };
}
exports.UpdatePurchasedOrderUseCase = UpdatePurchasedOrderUseCase;
;
