import { AppliedProductDiscountRangeCreateProps, AppliedProductDiscountRangeProps, AppliedProductDiscountRangeUpdateProps } from "../../domain/applied-product-discount-range.types";
import { IAppliedProductDiscountRangeRepository } from "../../domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeModel } from "../orm/applied-product-discount-range.orm";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";


const mapModelToDomain = (model: AppliedProductDiscountRangeModel): AppliedProductDiscountRangeProps => {
    const json: AppliedProductDiscountRangeProps = model.toJSON();
    return {
        ...json,
        max_qty: Number(json.max_qty),
        min_qty: Number(json.min_qty),
        unit_discount: Number(json.unit_discount),
    };
};

export class AppliedProductDiscountRangeRepository implements IAppliedProductDiscountRangeRepository {
    findAll = async (tx?: Transaction): Promise<AppliedProductDiscountRangeProps[]> => {
        const appliedProductDiscountRangeReponses: AppliedProductDiscountRangeModel[] = await AppliedProductDiscountRangeModel.findAll({ transaction: tx });
        const appliedProductDiscountRangeReponsesFormatted: AppliedProductDiscountRangeProps[] = appliedProductDiscountRangeReponses.map(mapModelToDomain);
        return appliedProductDiscountRangeReponsesFormatted;
    }
    findById = async (id: number, tx?: Transaction): Promise<AppliedProductDiscountRangeProps | null> => {
        const appliedProductDiscountRangeReponse: AppliedProductDiscountRangeModel | null = await AppliedProductDiscountRangeModel.findByPk(id, { transaction: tx });
        if (!appliedProductDiscountRangeReponse) return null;
        const appliedProductDiscountRangeReponsesFormatted: AppliedProductDiscountRangeProps = mapModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponsesFormatted;
    }
    findByPopId = async (purchase_order_product_id: number, tx?: Transaction): Promise<AppliedProductDiscountRangeProps | null> => {
        const appliedProductDiscountRangeReponse: AppliedProductDiscountRangeModel | null = await AppliedProductDiscountRangeModel.findOne({
            where: { purchase_order_product_id: purchase_order_product_id },
            transaction: tx
        });
        if (!appliedProductDiscountRangeReponse) return null;
        const appliedProductDiscountRangeReponsesFormatted: AppliedProductDiscountRangeProps = mapModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponsesFormatted;
    }
    create = async (data: AppliedProductDiscountRangeCreateProps, tx?: Transaction): Promise<AppliedProductDiscountRangeProps> => {
        const appliedProductDiscountRangeReponse: AppliedProductDiscountRangeModel = await AppliedProductDiscountRangeModel.create(data, {
            transaction: tx
        });
        const appliedProductDiscountRangeReponseFormatted: AppliedProductDiscountRangeProps = mapModelToDomain(appliedProductDiscountRangeReponse);
        return appliedProductDiscountRangeReponseFormatted;
    }
    update = async (id: number, data: AppliedProductDiscountRangeUpdateProps, tx?: Transaction): Promise<AppliedProductDiscountRangeProps> => {
        const existing: AppliedProductDiscountRangeModel | null = await AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El descuento de rango aplicado al producto de la orden de compra que se desea actualizar no fue posible encontrarlo."
        );
        await AppliedProductDiscountRangeModel.update(data, {
            where: { id },
            transaction: tx,
        });
        const updated: AppliedProductDiscountRangeModel | null = await AppliedProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el descuento de rango aplicado al producto de la orden de compra.");
        return mapModelToDomain(updated);

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