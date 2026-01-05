import { PurchasedOrderCreateProps, PurchasedOrderProps, PurchasedOrderUpdateProps } from "../../domain/purchased-order.types";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderModel } from "../orm/purchased-order.orm";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";


const mapModelToDomain = (model: PurchasedOrderModel): PurchasedOrderProps => {
    const json: PurchasedOrderProps = model.toJSON();
    return {
        ...json,
        total_price: Number(json.total_price)
    };
}

export class PurchasedOrderRepository implements IPurchasedOrderRepository {

    findAll = async (tx?: Transaction): Promise<PurchasedOrderProps[]> => {
        const purchasedOrderResponses: PurchasedOrderModel[] = await PurchasedOrderModel.findAll({ transaction: tx });
        const purchasedOrderResponsesFormatted: PurchasedOrderProps[] = purchasedOrderResponses.map(mapModelToDomain);
        return purchasedOrderResponsesFormatted;
    };

    findById = async (id: number, tx?: Transaction): Promise<PurchasedOrderProps | null> => {
        const purchasedOrderResponse: PurchasedOrderModel | null = await PurchasedOrderModel.findOne({
            where: { id: id }, transaction: tx
        });
        if (!purchasedOrderResponse) return null;
        const purchasedOrderResponsesFormatted: PurchasedOrderProps = mapModelToDomain(purchasedOrderResponse);
        return purchasedOrderResponsesFormatted;
    };

    create = async (data: PurchasedOrderCreateProps, tx?: Transaction): Promise<PurchasedOrderProps> => {
        const purchasedOrderResponse: PurchasedOrderModel = await PurchasedOrderModel.create(data, {
            transaction: tx
        });
        const purchasedOrderResponseFormatted: PurchasedOrderProps = mapModelToDomain(purchasedOrderResponse);
        return purchasedOrderResponseFormatted;
    };

    update = async (id: number, data: PurchasedOrderUpdateProps, tx?: Transaction): Promise<PurchasedOrderProps> => {
        const existing: PurchasedOrderModel | null = await PurchasedOrderModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "La orden de compra que se desea actualizar no fue posible encontrarlo."
        );
        await PurchasedOrderModel.update(data, {
            where: { id },
            transaction: tx,
        });
        const updated: PurchasedOrderModel | null = await PurchasedOrderModel.findByPk(id, {
            transaction: tx,
            attributes: PurchasedOrderModel.getAllFields() as ((keyof PurchasedOrderProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la orden de compra.");
        return mapModelToDomain(updated);
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