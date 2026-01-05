"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedProductDiscountClientRepository = void 0;
const applied_product_discount_client_orm_1 = require("../orm/applied-product-discount-client.orm");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const mapModelToDomain = (model) => {
    const json = model.toJSON();
    return {
        ...json,
        discount_percentage: Number(json.discount_percentage)
    };
};
class AppliedProductDiscountClientRepository {
    findAll = async (tx) => {
        const appliedProductDiscountClientReponses = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findAll({ transaction: tx });
        const appliedProductDiscountClientReponsesFormatted = appliedProductDiscountClientReponses.map(mapModelToDomain);
        return appliedProductDiscountClientReponsesFormatted;
    };
    findById = async (id, tx) => {
        const appliedProductDiscountClientReponse = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findByPk(id, { transaction: tx });
        if (!appliedProductDiscountClientReponse)
            return null;
        const appliedProductDiscountClientReponsesFormatted = mapModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponsesFormatted;
    };
    findByPopId = async (purchase_order_product_id, tx) => {
        const appliedProductDiscountClientReponse = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findOne({
            where: { purchase_order_product_id: purchase_order_product_id },
            transaction: tx
        });
        if (!appliedProductDiscountClientReponse)
            return null;
        const appliedProductDiscountClientReponsesFormatted = mapModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponsesFormatted;
    };
    create = async (data, tx) => {
        const appliedProductDiscountClientReponse = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.create(data, {
            transaction: tx
        });
        const appliedProductDiscountClientReponseFormatted = mapModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponseFormatted;
    };
    update = async (id, data, tx) => {
        const existing = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El descuento del cliente aplicado al producto de la orden de compra que se desea actualizar no fue posible encontrarlo.");
        await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.update(data, {
            where: { id },
            transaction: tx,
        });
        const updated = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el descuento del cliente aplicado al producto de la orden de compra.");
        return mapModelToDomain(updated);
    };
    delete = async (id, tx) => {
        const existing = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el descuento del cliente aplicado al producto de la orden de compra que se pretende eliminar.");
        const deleted = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el descuento del cliente aplicado al producto de la orden de compra.");
        return;
    };
}
exports.AppliedProductDiscountClientRepository = AppliedProductDiscountClientRepository;
;
