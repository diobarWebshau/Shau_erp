import { AppliedProductDiscountClientCreateProps, AppliedProductDiscountClientProps, AppliedProductDiscountClientUpdateProps } from "../../domain/applied-product-discount-client.types";
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { AppliedProductDiscountClientModel } from "../orm/applied-product-discount-client.orm";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";


const mapModelToDomain = (model: AppliedProductDiscountClientModel): AppliedProductDiscountClientProps => {
    const json: AppliedProductDiscountClientProps = model.toJSON();
    return {
        ...json,
        discount_percentage: Number(json.discount_percentage)
    };
};


export class AppliedProductDiscountClientRepository implements IAppliedProductDiscountClientRepository {
    findAll = async (tx?: Transaction): Promise<AppliedProductDiscountClientProps[]> => {
        const appliedProductDiscountClientReponses: AppliedProductDiscountClientModel[] = await AppliedProductDiscountClientModel.findAll({ transaction: tx });
        const appliedProductDiscountClientReponsesFormatted: AppliedProductDiscountClientProps[] = appliedProductDiscountClientReponses.map(mapModelToDomain);
        return appliedProductDiscountClientReponsesFormatted;
    }
    findById = async (id: number, tx?: Transaction): Promise<AppliedProductDiscountClientProps | null> => {
        const appliedProductDiscountClientReponse: AppliedProductDiscountClientModel | null = await AppliedProductDiscountClientModel.findByPk(id, { transaction: tx });
        if (!appliedProductDiscountClientReponse) return null;
        const appliedProductDiscountClientReponsesFormatted: AppliedProductDiscountClientProps = mapModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponsesFormatted;
    }
    findByPopId = async (purchase_order_product_id: number, tx?: Transaction): Promise<AppliedProductDiscountClientProps | null> => {
        const appliedProductDiscountClientReponse: AppliedProductDiscountClientModel | null = await AppliedProductDiscountClientModel.findOne({
            where: { purchase_order_product_id: purchase_order_product_id },
            transaction: tx
        });
        if (!appliedProductDiscountClientReponse) return null;
        const appliedProductDiscountClientReponsesFormatted: AppliedProductDiscountClientProps = mapModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponsesFormatted;
    }
    create = async (data: AppliedProductDiscountClientCreateProps, tx?: Transaction): Promise<AppliedProductDiscountClientProps> => {
        const appliedProductDiscountClientReponse: AppliedProductDiscountClientModel = await AppliedProductDiscountClientModel.create(data, {
            transaction: tx
        });
        const appliedProductDiscountClientReponseFormatted: AppliedProductDiscountClientProps = mapModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponseFormatted;
    }
    update = async (id: number, data: AppliedProductDiscountClientUpdateProps, tx?: Transaction): Promise<AppliedProductDiscountClientProps> => {
        const existing: AppliedProductDiscountClientModel | null = await AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El descuento del cliente aplicado al producto de la orden de compra que se desea actualizar no fue posible encontrarlo."
        );
        await AppliedProductDiscountClientModel.update(data, {
            where: { id },
            transaction: tx,
        });
        const updated: AppliedProductDiscountClientModel | null = await AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el descuento del cliente aplicado al producto de la orden de compra.");
        return mapModelToDomain(updated);

    }
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: AppliedProductDiscountClientModel | null = await AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro el descuento del cliente aplicado al producto de la orden de compra que se pretende eliminar."
        );
        const deleted: number = await AppliedProductDiscountClientModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el descuento del cliente aplicado al producto de la orden de compra.");
        return;
    }
};