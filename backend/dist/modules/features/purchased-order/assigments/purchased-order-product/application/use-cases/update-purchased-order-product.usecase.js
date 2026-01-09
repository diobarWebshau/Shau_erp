"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchasedOrderProductUseCase = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const mapPopUpdateDtoToDomain = (data) => {
    const { original_price, qty, recorded_price, ...popRest } = data;
    return ({
        ...popRest,
        ...(original_price !== undefined
            ? { original_price: decimal_vo_1.DecimalVO.from(original_price) }
            : {}),
        ...(qty !== undefined
            ? { qty: decimal_vo_1.DecimalVO.from(qty) }
            : {}),
        ...(recorded_price !== undefined
            ? { recorded_price: decimal_vo_1.DecimalVO.from(recorded_price) }
            : {}),
    });
};
class UpdatePurchasedOrderProductUseCase {
    purchasedOrderProductRepo;
    constructor(repo) {
        this.purchasedOrderProductRepo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const purchasedOrderProductResponse = await this.purchasedOrderProductRepo.update(id, mapPopUpdateDtoToDomain(data), tx);
        return purchasedOrderProductResponse;
    };
}
exports.UpdatePurchasedOrderProductUseCase = UpdatePurchasedOrderProductUseCase;
;
