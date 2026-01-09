"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderProductRepository = void 0;
const purchased_order_product_orm_1 = require("../orm/purchased-order-product.orm");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const mapPopModelToDomain = (model) => {
    const popAttr = model.toJSON();
    return {
        ...popAttr,
        original_price: decimal_vo_1.DecimalVO.from(popAttr.original_price),
        recorded_price: decimal_vo_1.DecimalVO.from(popAttr.original_price),
        qty: decimal_vo_1.DecimalVO.from(popAttr.qty)
    };
};
const mapPopCreateDomainToModel = (data) => {
    return ({
        ...data,
        original_price: data.original_price.toString(),
        qty: data.qty.toString(),
        recorded_price: data.recorded_price.toString(),
    });
};
const mapPopUpdateDomainToModel = (data) => {
    const { original_price, qty, recorded_price, ...popRest } = data;
    return ({
        ...popRest,
        ...(original_price !== undefined ? { original_price: original_price.toString() } : {}),
        ...(qty !== undefined ? { qty: qty.toString() } : {}),
        ...(recorded_price !== undefined ? { recorded_price: recorded_price.toString() } : {})
    });
};
class PurchasedOrderProductRepository {
    findAll = async (tx) => {
        const purchasedOrderProductResponses = await purchased_order_product_orm_1.PurchasedOrderProductModel.findAll({ transaction: tx });
        const purchasedOrderProductResponseFormatted = purchasedOrderProductResponses.map(mapPopModelToDomain);
        return purchasedOrderProductResponseFormatted;
    };
    findById = async (id, tx) => {
        const purchasedOrderProductResponse = await purchased_order_product_orm_1.PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!purchasedOrderProductResponse)
            return null;
        const purchasedOrderProductResponseFormatted = mapPopModelToDomain(purchasedOrderProductResponse);
        return purchasedOrderProductResponseFormatted;
    };
    findByPurchasedId = async (purchase_order_id, tx) => {
        const purchasedOrderProductResponses = await purchased_order_product_orm_1.PurchasedOrderProductModel.findAll({
            where: {
                purchase_order_id: purchase_order_id
            },
            transaction: tx
        });
        const purchasedOrderProductResponseFormatted = purchasedOrderProductResponses.map(mapPopModelToDomain);
        return purchasedOrderProductResponseFormatted;
    };
    create = async (data, tx) => {
        const purchasedOrderProductResponse = await purchased_order_product_orm_1.PurchasedOrderProductModel.create(mapPopCreateDomainToModel(data), {
            transaction: tx
        });
        const purchasedOrderResponseFormatted = mapPopModelToDomain(purchasedOrderProductResponse);
        return purchasedOrderResponseFormatted;
    };
    update = async (id, data, tx) => {
        const existing = await purchased_order_product_orm_1.PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El producto de la orden de compra que se desea actualizar no fue posible encontrarlo.");
        const existingDomain = mapPopModelToDomain(existing);
        const updateData = mapPopUpdateDomainToModel(data);
        if (!Object.keys(updateData).length)
            return existingDomain;
        await purchased_order_product_orm_1.PurchasedOrderProductModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        const updated = await purchased_order_product_orm_1.PurchasedOrderProductModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el producto de la orden de compra.");
        return mapPopModelToDomain(updated);
    };
    delete = async (id, tx) => {
        const existing = await purchased_order_product_orm_1.PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el producto de la orden de compra que se pretende eliminar.");
        const deleted = await purchased_order_product_orm_1.PurchasedOrderProductModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el producto de la orden de compra.");
        return;
    };
}
exports.PurchasedOrderProductRepository = PurchasedOrderProductRepository;
