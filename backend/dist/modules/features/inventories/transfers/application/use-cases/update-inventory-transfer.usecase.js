"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInventoryTransferUseCase = void 0;
const decimal_vo_1 = require("@shared/domain/value-objects/decimal.vo");
const mapInventoryTransferUpdateDtoToDomain = (data) => {
    const { qty, reason, ...rest } = data;
    return {
        ...rest,
        ...(qty !== undefined ? { qty: decimal_vo_1.DecimalVO.from(qty) } : {}),
    };
};
class UpdateInventoryTransferUseCase {
    inventoryTransferRepo;
    constructor(inventoryTransferRepo) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    }
    ;
    execute = async (id, data, tx) => {
        const updateData = mapInventoryTransferUpdateDtoToDomain(data);
        const inventoryTransferResponse = await this.inventoryTransferRepo.update(id, updateData, tx);
        return inventoryTransferResponse;
    };
}
exports.UpdateInventoryTransferUseCase = UpdateInventoryTransferUseCase;
