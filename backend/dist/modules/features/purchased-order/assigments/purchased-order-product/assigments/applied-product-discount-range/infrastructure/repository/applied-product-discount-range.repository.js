"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedProductDiscountRangeRepository = void 0;
const applied_product_discount_range_orm_1 = require("../orm/applied-product-discount-range.orm");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const mapModelToDomain = (model) => {
    const json = model.toJSON();
    return {
        ...json,
        max_qty: Number(json.max_qty),
        min_qty: Number(json.min_qty),
        unit_discount: Number(json.unit_discount),
    };
};
class AppliedProductDiscountRangeRepository {
    findAll = async (tx) => {
        const appliedProductDiscountRangeReponses = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findAll({ transaction: tx });
        const appliedProductDiscountRangeReponsesFormatted = appliedProductDiscountRangeReponses.map(mapModelToDomain);
        return appliedProductDiscountRangeReponsesFormatted;
    };
    findById = async (id, tx) => {
        const appliedProductDiscountRangeReponse = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findByPk(id, { transaction: tx });
        if (!appliedProductDiscountRangeReponse)
            return null;
        const appliedProductDiscountRangeReponsesFormatted = mapModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponsesFormatted;
    };
    findByPopId = async (purchase_order_product_id, tx) => {
        const appliedProductDiscountRangeReponse = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findOne({
            where: { purchase_order_product_id: purchase_order_product_id },
            transaction: tx
        });
        if (!appliedProductDiscountRangeReponse)
            return null;
        const appliedProductDiscountRangeReponsesFormatted = mapModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponsesFormatted;
    };
    create = async (data, tx) => {
        const appliedProductDiscountRangeReponse = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.create(data, {
            transaction: tx
        });
        const appliedProductDiscountRangeReponseFormatted = mapModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponseFormatted;
    };
    update = async (id, data, tx) => {
        const existing = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El descuento de rango aplicado al producto de la orden de compra que se desea actualizar no fue posible encontrarlo.");
        await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.update(data, {
            where: { id },
            transaction: tx,
        });
        const updated = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el descuento de rango aplicado al producto de la orden de compra.");
        return mapModelToDomain(updated);
    };
    delete = async (id, tx) => {
        const existing = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el descuento de rango aplicado al producto de la orden de compra que se pretende eliminar.");
        const deleted = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el descuento de rango aplicado al producto de la orden de compra.");
        return;
    };
}
exports.AppliedProductDiscountRangeRepository = AppliedProductDiscountRangeRepository;
;
