"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderRepository = void 0;
const purchased_order_orm_1 = require("../orm/purchased-order.orm");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const mapModelToDomain = (model) => {
    const json = model.toJSON();
    return {
        ...json,
        total_price: Number(json.total_price)
    };
};
class PurchasedOrderRepository {
    findAll = async (tx) => {
        const purchasedOrderResponses = await purchased_order_orm_1.PurchasedOrderModel.findAll({ transaction: tx });
        const purchasedOrderResponsesFormatted = purchasedOrderResponses.map(mapModelToDomain);
        return purchasedOrderResponsesFormatted;
    };
    findById = async (id, tx) => {
        const purchasedOrderResponse = await purchased_order_orm_1.PurchasedOrderModel.findOne({
            where: { id: id }, transaction: tx
        });
        if (!purchasedOrderResponse)
            return null;
        const purchasedOrderResponsesFormatted = mapModelToDomain(purchasedOrderResponse);
        return purchasedOrderResponsesFormatted;
    };
    create = async (data, tx) => {
        const purchasedOrderResponse = await purchased_order_orm_1.PurchasedOrderModel.create(data, {
            transaction: tx
        });
        const purchasedOrderResponseFormatted = mapModelToDomain(purchasedOrderResponse);
        return purchasedOrderResponseFormatted;
    };
    update = async (id, data, tx) => {
        const existing = await purchased_order_orm_1.PurchasedOrderModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "La orden de compra que se desea actualizar no fue posible encontrarlo.");
        await purchased_order_orm_1.PurchasedOrderModel.update(data, {
            where: { id },
            transaction: tx,
        });
        const updated = await purchased_order_orm_1.PurchasedOrderModel.findByPk(id, {
            transaction: tx,
            attributes: purchased_order_orm_1.PurchasedOrderModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la orden de compra.");
        return mapModelToDomain(updated);
    };
    delete = async (id, tx) => {
        const existing = await purchased_order_orm_1.PurchasedOrderModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la orden de compra que se pretende eliminar.");
        const deleted = await purchased_order_orm_1.PurchasedOrderModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar la orden de compra.");
        return;
    };
}
exports.PurchasedOrderRepository = PurchasedOrderRepository;
;
