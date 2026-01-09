"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedProductDiscountRangeRepository = void 0;
const applied_product_discount_range_orm_1 = require("../orm/applied-product-discount-range.orm");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const mapAppliedProductDiscountRangeModelToDomain = (model) => {
    const apdrAttr = model.toJSON();
    return {
        ...apdrAttr,
        max_qty: decimal_vo_1.DecimalVO.from(apdrAttr.max_qty),
        min_qty: decimal_vo_1.DecimalVO.from(apdrAttr.min_qty),
        unit_discount: decimal_vo_1.DecimalVO.from(apdrAttr.unit_discount),
    };
};
const mapAppliedProductDiscountRangeCreateDomainToModel = (data) => {
    return {
        ...data,
        max_qty: data.max_qty.toString(),
        min_qty: data.min_qty.toString(),
        unit_discount: data.unit_discount.toString(),
    };
};
const mapAppliedProductDiscountRangeUpdateDomainToModel = (data) => {
    const { max_qty, min_qty, unit_discount, ...apdrRest } = data;
    return {
        ...apdrRest,
        ...(max_qty !== undefined
            ? { max_qty: max_qty.toString() } : {}),
        ...(min_qty !== undefined
            ? { min_qty: min_qty.toString() } : {}),
        ...(unit_discount !== undefined
            ? { unit_discount: unit_discount.toString() } : {})
    };
};
class AppliedProductDiscountRangeRepository {
    findAll = async (tx) => {
        const appliedProductDiscountRangeReponses = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findAll({ transaction: tx });
        const appliedProductDiscountRangeReponsesFormatted = appliedProductDiscountRangeReponses.map(mapAppliedProductDiscountRangeModelToDomain);
        return appliedProductDiscountRangeReponsesFormatted;
    };
    findById = async (id, tx) => {
        const appliedProductDiscountRangeReponse = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findByPk(id, { transaction: tx });
        if (!appliedProductDiscountRangeReponse)
            return null;
        const appliedProductDiscountRangeReponsesFormatted = mapAppliedProductDiscountRangeModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponsesFormatted;
    };
    findByPopId = async (purchase_order_product_id, tx) => {
        const appliedProductDiscountRangeReponse = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findOne({
            where: { purchase_order_product_id: purchase_order_product_id },
            transaction: tx
        });
        if (!appliedProductDiscountRangeReponse)
            return null;
        const appliedProductDiscountRangeReponsesFormatted = mapAppliedProductDiscountRangeModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponsesFormatted;
    };
    create = async (data, tx) => {
        const appliedProductDiscountRangeReponse = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.create(mapAppliedProductDiscountRangeCreateDomainToModel(data), {
            transaction: tx
        });
        const appliedProductDiscountRangeReponseFormatted = mapAppliedProductDiscountRangeModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponseFormatted;
    };
    update = async (id, data, tx) => {
        const existing = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El descuento de rango aplicado al producto de la orden de compra que se desea actualizar no fue posible encontrarlo.");
        const existingDomain = mapAppliedProductDiscountRangeModelToDomain(existing);
        const updateData = mapAppliedProductDiscountRangeUpdateDomainToModel(data);
        if (Object.keys(updateData))
            return existingDomain;
        await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        const updated = await applied_product_discount_range_orm_1.AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el descuento de rango aplicado al producto de la orden de compra.");
        return mapAppliedProductDiscountRangeModelToDomain(updated);
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
