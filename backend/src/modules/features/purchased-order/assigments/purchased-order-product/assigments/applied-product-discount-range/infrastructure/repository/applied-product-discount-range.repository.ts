import { AppliedProductDiscountRangeCreateProps, AppliedProductDiscountRangeProps, AppliedProductDiscountRangeUpdateProps } from "../../domain/applied-product-discount-range.types";
import { AppliedProductDiscountRangeAttributes, AppliedProductDiscountRangeCreateAttributes, AppliedProductDiscountRangeModel, AppliedProductDiscountRangeUpdateAttributes } from "../orm/applied-product-discount-range.orm";
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";


const mapAppliedProductDiscountRangeModelToDomain = (model: AppliedProductDiscountRangeModel): AppliedProductDiscountRangeProps => {
    const apdrAttr: AppliedProductDiscountRangeAttributes = model.toJSON();
    return {
        ...apdrAttr,
        max_qty: DecimalVO.from(apdrAttr.max_qty),
        min_qty: DecimalVO.from(apdrAttr.min_qty),
        unit_discount: DecimalVO.from(apdrAttr.unit_discount),
    };
};

const mapAppliedProductDiscountRangeCreateDomainToModel = (data: AppliedProductDiscountRangeCreateProps): AppliedProductDiscountRangeCreateAttributes => {
    return {
        ...data,
        max_qty: data.max_qty.toString(),
        min_qty: data.min_qty.toString(),
        unit_discount: data.unit_discount.toString(),
    };
};

const mapAppliedProductDiscountRangeUpdateDomainToModel = (data: AppliedProductDiscountRangeUpdateProps): AppliedProductDiscountRangeUpdateAttributes => {
    const { max_qty, min_qty, unit_discount, ...apdrRest } = data;
    return {
        ...apdrRest,
        ...(
            max_qty !== undefined
                ? { max_qty: max_qty.toString() } : {}
        ),
        ...(
            min_qty !== undefined
                ? { min_qty: min_qty.toString() } : {}
        ),
        ...(
            unit_discount !== undefined
                ? { unit_discount: unit_discount.toString() } : {}
        )
    };
};


export class AppliedProductDiscountRangeRepository implements IAppliedProductDiscountRangeRepository {
    findAll = async (tx?: Transaction): Promise<AppliedProductDiscountRangeProps[]> => {
        const appliedProductDiscountRangeReponses: AppliedProductDiscountRangeModel[] =
            await AppliedProductDiscountRangeModel.findAll({ transaction: tx });
        const appliedProductDiscountRangeReponsesFormatted: AppliedProductDiscountRangeProps[] =
            appliedProductDiscountRangeReponses.map(mapAppliedProductDiscountRangeModelToDomain);
        return appliedProductDiscountRangeReponsesFormatted;
    }
    findById = async (id: number, tx?: Transaction): Promise<AppliedProductDiscountRangeProps | null> => {
        const appliedProductDiscountRangeReponse: AppliedProductDiscountRangeModel | null = await AppliedProductDiscountRangeModel.findByPk(id, { transaction: tx });
        if (!appliedProductDiscountRangeReponse) return null;
        const appliedProductDiscountRangeReponsesFormatted: AppliedProductDiscountRangeProps =
            mapAppliedProductDiscountRangeModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponsesFormatted;
    }
    findByPopId = async (purchase_order_product_id: number, tx?: Transaction): Promise<AppliedProductDiscountRangeProps | null> => {
        const appliedProductDiscountRangeReponse: AppliedProductDiscountRangeModel | null = await AppliedProductDiscountRangeModel.findOne({
            where: { purchase_order_product_id: purchase_order_product_id },
            transaction: tx
        });
        if (!appliedProductDiscountRangeReponse) return null;
        const appliedProductDiscountRangeReponsesFormatted: AppliedProductDiscountRangeProps =
            mapAppliedProductDiscountRangeModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponsesFormatted;
    }
    create = async (data: AppliedProductDiscountRangeCreateProps, tx?: Transaction): Promise<AppliedProductDiscountRangeProps> => {
        const appliedProductDiscountRangeReponse: AppliedProductDiscountRangeModel = await AppliedProductDiscountRangeModel.create(mapAppliedProductDiscountRangeCreateDomainToModel(data), {
            transaction: tx
        });
        const appliedProductDiscountRangeReponseFormatted: AppliedProductDiscountRangeProps =
            mapAppliedProductDiscountRangeModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponseFormatted;
    }
    update = async (id: number, data: AppliedProductDiscountRangeUpdateProps, tx?: Transaction): Promise<AppliedProductDiscountRangeProps> => {
        const existing: AppliedProductDiscountRangeModel | null = await AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El descuento de rango aplicado al producto de la orden de compra que se desea actualizar no fue posible encontrarlo."
        );
        const existingDomain = mapAppliedProductDiscountRangeModelToDomain(existing);
        const updateData = mapAppliedProductDiscountRangeUpdateDomainToModel(data);
        if (Object.keys(updateData)) return existingDomain;
        await AppliedProductDiscountRangeModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        const updated: AppliedProductDiscountRangeModel | null = await AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el descuento de rango aplicado al producto de la orden de compra.");
        return mapAppliedProductDiscountRangeModelToDomain(updated);

    }
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: AppliedProductDiscountRangeModel | null = await AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro el descuento de rango aplicado al producto de la orden de compra que se pretende eliminar."
        );
        const deleted: number = await AppliedProductDiscountRangeModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el descuento de rango aplicado al producto de la orden de compra.");
        return;
    }
};