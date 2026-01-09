import { AppliedProductDiscountClientCreateProps, AppliedProductDiscountClientProps, AppliedProductDiscountClientUpdateProps } from "../../domain/applied-product-discount-client.types";
import { AppliedProductDiscountClientAttributes, AppliedProductDiscountClientCreateAttributes, AppliedProductDiscountClientModel, AppliedProductDiscountClientUpdateAttributes } from "../orm/applied-product-discount-client.orm";
import { IAppliedProductDiscountClientRepository } from "../../domain/applied-product-discount-client.repository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";


const mapAppliedProductDiscountClientModelToDomain = (model: AppliedProductDiscountClientModel): AppliedProductDiscountClientProps => {
    const appcAttr: AppliedProductDiscountClientAttributes = model.toJSON();
    return {
        ...appcAttr,
        discount_percentage: DecimalVO.from(appcAttr.discount_percentage)
    };
};

const mapAppliedProductDiscountClientCreateDomainToModel = (data: AppliedProductDiscountClientCreateProps): AppliedProductDiscountClientCreateAttributes => {
    return ({
        ...data,
        discount_percentage: data.discount_percentage.toString()
    });
};

const mapAppliedProductDiscountClientUpdateDomainToModel = (data: AppliedProductDiscountClientUpdateProps): AppliedProductDiscountClientUpdateAttributes => {
    const { discount_percentage, ...appdRest } = data;
    return ({
        ...appdRest,
        ...(
            discount_percentage !== undefined ? { discount_percentage: discount_percentage.toString() } : {}
        )
    });
};

export class AppliedProductDiscountClientRepository implements IAppliedProductDiscountClientRepository {
    findAll = async (tx?: Transaction): Promise<AppliedProductDiscountClientProps[]> => {
        const appliedProductDiscountClientReponses: AppliedProductDiscountClientModel[] = await AppliedProductDiscountClientModel.findAll({ transaction: tx });
        const appliedProductDiscountClientReponsesFormatted: AppliedProductDiscountClientProps[] = appliedProductDiscountClientReponses.map(mapAppliedProductDiscountClientModelToDomain);
        return appliedProductDiscountClientReponsesFormatted;
    }
    findById = async (id: number, tx?: Transaction): Promise<AppliedProductDiscountClientProps | null> => {
        const appliedProductDiscountClientReponse: AppliedProductDiscountClientModel | null = await AppliedProductDiscountClientModel.findByPk(id, { transaction: tx });
        if (!appliedProductDiscountClientReponse) return null;
        const appliedProductDiscountClientReponsesFormatted: AppliedProductDiscountClientProps = mapAppliedProductDiscountClientModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponsesFormatted;
    }
    findByPopId = async (purchase_order_product_id: number, tx?: Transaction): Promise<AppliedProductDiscountClientProps | null> => {
        const appliedProductDiscountClientReponse: AppliedProductDiscountClientModel | null = await AppliedProductDiscountClientModel.findOne({
            where: { purchase_order_product_id: purchase_order_product_id },
            transaction: tx
        });
        if (!appliedProductDiscountClientReponse) return null;
        const appliedProductDiscountClientReponsesFormatted: AppliedProductDiscountClientProps = mapAppliedProductDiscountClientModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponsesFormatted;
    }
    create = async (data: AppliedProductDiscountClientCreateProps, tx?: Transaction): Promise<AppliedProductDiscountClientProps> => {
        const appliedProductDiscountClientReponse: AppliedProductDiscountClientModel = await AppliedProductDiscountClientModel.create(mapAppliedProductDiscountClientCreateDomainToModel(data), {
            transaction: tx
        });
        const appliedProductDiscountClientReponseFormatted: AppliedProductDiscountClientProps = mapAppliedProductDiscountClientModelToDomain(appliedProductDiscountClientReponse);
        return appliedProductDiscountClientReponseFormatted;
    }
    update = async (id: number, data: AppliedProductDiscountClientUpdateProps, tx?: Transaction): Promise<AppliedProductDiscountClientProps> => {
        const existing: AppliedProductDiscountClientModel | null = await AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El descuento del cliente aplicado al producto de la orden de compra que se desea actualizar no fue posible encontrarlo."
        );
        const existingDomain = mapAppliedProductDiscountClientModelToDomain(existing);
        const updateData = mapAppliedProductDiscountClientUpdateDomainToModel(data);
        if (!Object.keys(updateData)) return existingDomain;
        const [affectedRows] = await AppliedProductDiscountClientModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        if (!affectedRows) return existingDomain;
        const updated: AppliedProductDiscountClientModel | null = await AppliedProductDiscountClientModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el descuento del cliente aplicado al producto de la orden de compra.");
        return mapAppliedProductDiscountClientModelToDomain(updated);
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