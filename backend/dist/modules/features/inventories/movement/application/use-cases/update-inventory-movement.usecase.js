"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInventoryMovementUseCase = void 0;
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const mapInventoryMovementUpdateDtoToDomain = (data) => {
    const { qty, ...rest } = data;
    return ({
        ...rest,
        ...(qty !== undefined
            ? { qty: decimal_vo_1.DecimalVO.from(qty) }
            : {})
    });
};
class UpdateInventoryMovementUseCase {
    repo;
    constructor({ repo }) {
        this.repo = repo;
    }
    ;
    execute = async (id, data, tx) => {
        const inventoryMovementResponse = await this.repo.update(id, mapInventoryMovementUpdateDtoToDomain(data), tx);
        return inventoryMovementResponse;
    };
}
exports.UpdateInventoryMovementUseCase = UpdateInventoryMovementUseCase;
;
