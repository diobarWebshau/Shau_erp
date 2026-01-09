"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedProductDiscountClientRepository = void 0;
const applied_product_discount_client_orm_1 = require("../orm/applied-product-discount-client.orm");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const mapAppliedProductDiscountClientModelToDomain = (model) => {
    const appcAttr = model.toJSON();
    return {
        ...appcAttr,
        discount_percentage: decimal_vo_1.DecimalVO.from(appcAttr.discount_percentage)
    };
};
const mapAppliedProductDiscountClientCreateDomainToModel = (data) => {
    return ({
        ...data,
        discount_percentage: data.discount_percentage.toString()
    });
};
const mapAppliedProductDiscountClientUpdateDomainToModel = (data) => {
    const { discount_percentage, ...appdRest } = data;
    return ({
        ...appdRest,
        ...(discount_percentage !== undefined ? { discount_percentage: discount_percentage.toString() } : {})
    });
};
class AppliedProductDiscountClientRepository {
    findAll = async (tx) => {
        const appliedProductDiscountClientReponses = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findAll({ transaction: tx });
        const appliedProductDiscountClientReponsesFormatted = appliedProductDiscountClientReponses.map(mapAppliedProductDiscountClientModelToDomain);
        return appliedProductDiscountClientReponsesFormatted;
    };
    findById = async (id, tx) => {
        const appliedProductDiscountClientReponse = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findByPk(id, { transaction: tx });
        if (!appliedProductDiscountClientReponse)
            return null;
        const appliedProductDiscountClientReponsesFormatted = mapAppliedProductDiscountClientModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponsesFormatted;
    };
    findByPopId = async (purchase_order_product_id, tx) => {
        const appliedProductDiscountClientReponse = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findOne({
            where: { purchase_order_product_id: purchase_order_product_id },
            transaction: tx
        });
        if (!appliedProductDiscountClientReponse)
            return null;
        const appliedProductDiscountClientReponsesFormatted = mapAppliedProductDiscountClientModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponsesFormatted;
    };
    create = async (data, tx) => {
        const appliedProductDiscountClientReponse = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.create(mapAppliedProductDiscountClientCreateDomainToModel(data), {
            transaction: tx
        });
        const appliedProductDiscountClientReponseFormatted = mapAppliedProductDiscountClientModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponseFormatted;
    };
    update = async (id, data, tx) => {
        const existing = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El descuento del cliente aplicado al producto de la orden de compra que se desea actualizar no fue posible encontrarlo.");
        const existingDomain = mapAppliedProductDiscountClientModelToDomain(existing);
        const updateData = mapAppliedProductDiscountClientUpdateDomainToModel(data);
        if (!Object.keys(updateData))
            return existingDomain;
        const [affectedRows] = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        if (!affectedRows)
            return existingDomain;
        const updated = await applied_product_discount_client_orm_1.AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el descuento del cliente aplicado al producto de la orden de compra.");
        return mapAppliedProductDiscountClientModelToDomain(updated);
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
