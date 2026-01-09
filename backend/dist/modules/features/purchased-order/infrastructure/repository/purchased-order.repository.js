"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderRepository = void 0;
const purchased_order_orm_1 = require("../orm/purchased-order.orm");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const mapPurchasedOrderModelToDomain = (model) => {
    const purchasedOrderAttributes = model.toJSON();
    return {
        ...purchasedOrderAttributes,
        total_price: decimal_vo_1.DecimalVO.from(purchasedOrderAttributes.total_price)
    };
};
const mapPurchasedOrderCreateDomainToModel = (data) => {
    return ({
        ...data,
        total_price: data.total_price.toString(),
        delivery_date: data.delivery_date ? data.delivery_date : null
    });
};
const mapPurchasedOrderUpdateDomainToModel = (data) => {
    const { total_price, delivery_date, ...poRest } = data;
    return {
        ...poRest,
        ...(total_price !== undefined && {
            total_price: total_price.toString(),
        }),
        ...(delivery_date !== undefined && {
            delivery_date,
        }),
    };
};
class PurchasedOrderRepository {
    findAll = async (tx) => {
        const purchasedOrderResponses = await purchased_order_orm_1.PurchasedOrderModel.findAll({ transaction: tx });
        const purchasedOrderResponsesFormatted = purchasedOrderResponses.map(mapPurchasedOrderModelToDomain);
        return purchasedOrderResponsesFormatted;
    };
    findById = async (id, tx) => {
        const purchasedOrderResponse = await purchased_order_orm_1.PurchasedOrderModel.findOne({
            where: { id: id }, transaction: tx
        });
        if (!purchasedOrderResponse)
            return null;
        const purchasedOrderResponsesFormatted = mapPurchasedOrderModelToDomain(purchasedOrderResponse);
        return purchasedOrderResponsesFormatted;
    };
    create = async (data, tx) => {
        const createData = mapPurchasedOrderCreateDomainToModel(data);
        const purchasedOrderResponse = await purchased_order_orm_1.PurchasedOrderModel.create(createData, {
            transaction: tx
        });
        const purchasedOrderResponseFormatted = mapPurchasedOrderModelToDomain(purchasedOrderResponse);
        return purchasedOrderResponseFormatted;
    };
    update = async (id, data, tx) => {
        const existing = await purchased_order_orm_1.PurchasedOrderModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "La orden de compra que se desea actualizar no fue posible encontrarlo.");
        const existingDomain = mapPurchasedOrderModelToDomain(existing);
        const updateData = mapPurchasedOrderUpdateDomainToModel(data);
        if (!Object.keys(existingDomain).length)
            return existingDomain;
        const [affectedRows] = await purchased_order_orm_1.PurchasedOrderModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        if (!affectedRows)
            return existingDomain;
        const updated = await purchased_order_orm_1.PurchasedOrderModel.findByPk(id, {
            transaction: tx,
            attributes: purchased_order_orm_1.PurchasedOrderModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la orden de compra.");
        return mapPurchasedOrderModelToDomain(updated);
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
