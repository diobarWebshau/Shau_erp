"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderProductRepository = void 0;
const purchased_order_product_orm_1 = require("../orm/purchased-order-product.orm");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const mapModelToDomain = (model) => {
    const json = model.toJSON();
    return {
        ...json,
        original_price: Number(json.original_price),
        recorded_price: Number(json.original_price),
        qty: Number(json.qty)
    };
};
class PurchasedOrderProductRepository {
    findAll = async (tx) => {
        const purchasedOrderProductResponses = await purchased_order_product_orm_1.PurchasedOrderProductModel.findAll({ transaction: tx });
        const purchasedOrderProductResponseFormatted = purchasedOrderProductResponses.map(mapModelToDomain);
        return purchasedOrderProductResponseFormatted;
    };
    findById = async (id, tx) => {
        const purchasedOrderProductResponse = await purchased_order_product_orm_1.PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!purchasedOrderProductResponse)
            return null;
        const purchasedOrderProductResponseFormatted = mapModelToDomain(purchasedOrderProductResponse);
        return purchasedOrderProductResponseFormatted;
    };
    findByPurchasedId = async (purchase_order_id, tx) => {
        const purchasedOrderProductResponses = await purchased_order_product_orm_1.PurchasedOrderProductModel.findAll({
            where: {
                purchase_order_id: purchase_order_id
            },
            transaction: tx
        });
        const purchasedOrderProductResponseFormatted = purchasedOrderProductResponses.map(mapModelToDomain);
        return purchasedOrderProductResponseFormatted;
    };
    create = async (data, tx) => {
        const purchasedOrderProductResponse = await purchased_order_product_orm_1.PurchasedOrderProductModel.create(data, {
            transaction: tx
        });
        const purchasedOrderResponseFormatted = mapModelToDomain(purchasedOrderProductResponse);
        return purchasedOrderResponseFormatted;
    };
    update = async (id, data, tx) => {
        const existing = await purchased_order_product_orm_1.PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El producto de la orden de compra que se desea actualizar no fue posible encontrarlo.");
        await purchased_order_product_orm_1.PurchasedOrderProductModel.update(data, {
            where: { id },
            transaction: tx,
        });
        const updated = await purchased_order_product_orm_1.PurchasedOrderProductModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el producto de la orden de compra.");
        return mapModelToDomain(updated);
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
