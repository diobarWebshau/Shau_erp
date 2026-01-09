import { PurchasedOrderAttributes, PurchasedOrderCreateAttributes, PurchasedOrderModel, PurchasedOrderUpdateAttributes } from "../orm/purchased-order.orm";
import { PurchasedOrderCreateProps, PurchasedOrderProps, PurchasedOrderUpdateProps } from "../../domain/purchased-order.types";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";


const mapPurchasedOrderModelToDomain = (model: PurchasedOrderModel): PurchasedOrderProps => {
    const purchasedOrderAttributes: PurchasedOrderAttributes = model.toJSON();
    return {
        ...purchasedOrderAttributes,
        total_price: DecimalVO.from(purchasedOrderAttributes.total_price)
    };
};

const mapPurchasedOrderCreateDomainToModel = (data: PurchasedOrderCreateProps): PurchasedOrderCreateAttributes => {
    return ({
        ...data,
        total_price: data.total_price.toString(),
        delivery_date: data.delivery_date ? data.delivery_date : null
    });
};

const mapPurchasedOrderUpdateDomainToModel = (data: PurchasedOrderUpdateProps): PurchasedOrderUpdateAttributes => {
    const { total_price, delivery_date, ...poRest } = data;

    return {
        ...poRest,
        ...(total_price !== undefined && {
            total_price: total_price.toString(),
        }),
        ...(delivery_date !== undefined && {
            delivery_date,
        }),
    };
};

export class PurchasedOrderRepository implements IPurchasedOrderRepository {

    findAll = async (tx?: Transaction): Promise<PurchasedOrderProps[]> => {
        const purchasedOrderResponses: PurchasedOrderModel[] = await PurchasedOrderModel.findAll({ transaction: tx });
        const purchasedOrderResponsesFormatted: PurchasedOrderProps[] = purchasedOrderResponses.map(mapPurchasedOrderModelToDomain);
        return purchasedOrderResponsesFormatted;
    };

    findById = async (id: number, tx?: Transaction): Promise<PurchasedOrderProps | null> => {
        const purchasedOrderResponse: PurchasedOrderModel | null = await PurchasedOrderModel.findOne({
            where: { id: id }, transaction: tx
        });
        if (!purchasedOrderResponse) return null;
        const purchasedOrderResponsesFormatted: PurchasedOrderProps = mapPurchasedOrderModelToDomain(purchasedOrderResponse);
        return purchasedOrderResponsesFormatted;
    };

    create = async (data: PurchasedOrderCreateProps, tx?: Transaction): Promise<PurchasedOrderProps> => {
        const createData = mapPurchasedOrderCreateDomainToModel(data);
        const purchasedOrderResponse: PurchasedOrderModel = await PurchasedOrderModel.create(createData, {
            transaction: tx
        });
        const purchasedOrderResponseFormatted: PurchasedOrderProps = mapPurchasedOrderModelToDomain(purchasedOrderResponse);
        return purchasedOrderResponseFormatted;
    };

    update = async (id: number, data: PurchasedOrderUpdateProps, tx?: Transaction): Promise<PurchasedOrderProps> => {
        const existing: PurchasedOrderModel | null = await PurchasedOrderModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "La orden de compra que se desea actualizar no fue posible encontrarlo."
        );
        const existingDomain = mapPurchasedOrderModelToDomain(existing);
        const updateData = mapPurchasedOrderUpdateDomainToModel(data);
        if (!Object.keys(existingDomain).length) return existingDomain;
        const [affectedRows] = await PurchasedOrderModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        if (!affectedRows) return existingDomain;
        const updated: PurchasedOrderModel | null = await PurchasedOrderModel.findByPk(id, {
            transaction: tx,
            attributes: PurchasedOrderModel.getAllFields() as ((keyof PurchasedOrderProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la orden de compra.");
        return mapPurchasedOrderModelToDomain(updated);
    };


    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: PurchasedOrderModel | null = await PurchasedOrderModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro la orden de compra que se pretende eliminar."
        );
        const deleted: number = await PurchasedOrderModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar la orden de compra.");
        return;
    };
};