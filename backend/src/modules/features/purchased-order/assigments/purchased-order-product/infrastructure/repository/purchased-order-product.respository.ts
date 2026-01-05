import { PurchasedOrderProductCreateProps, PurchasedOrderProductProps, PurchasedOrderProductUpdateProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductModel } from "../orm/purchased-order-product.orm";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

const mapModelToDomain = (model: PurchasedOrderProductModel): PurchasedOrderProductProps => {
    const json: PurchasedOrderProductProps = model.toJSON();
    return {
        ...json,
        original_price: Number(json.original_price),
        recorded_price: Number(json.original_price),
        qty: Number(json.qty)
    };
};

export class PurchasedOrderProductRepository implements IPurchasedOrderProductRepository {
    findAll = async (tx?: Transaction): Promise<PurchasedOrderProductProps[]> => {
        const purchasedOrderProductResponses: PurchasedOrderProductModel[] = await PurchasedOrderProductModel.findAll({ transaction: tx });
        const purchasedOrderProductResponseFormatted: PurchasedOrderProductProps[] = purchasedOrderProductResponses.map(mapModelToDomain);
        return purchasedOrderProductResponseFormatted;
    }
    findById = async (id: number, tx?: Transaction): Promise<PurchasedOrderProductProps | null> => {
        const purchasedOrderProductResponse: PurchasedOrderProductModel | null = await PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!purchasedOrderProductResponse) return null;
        const purchasedOrderProductResponseFormatted: PurchasedOrderProductProps = mapModelToDomain(purchasedOrderProductResponse);
        return purchasedOrderProductResponseFormatted;

    }
    findByPurchasedId = async (purchase_order_id: number, tx?: Transaction): Promise<PurchasedOrderProductProps[]> => {
        const purchasedOrderProductResponses: PurchasedOrderProductModel[] = await PurchasedOrderProductModel.findAll({
            where: {
                purchase_order_id: purchase_order_id
            },
            transaction: tx
        });
        const purchasedOrderProductResponseFormatted: PurchasedOrderProductProps[] = purchasedOrderProductResponses.map(mapModelToDomain);
        return purchasedOrderProductResponseFormatted;
    }
    create = async (data: PurchasedOrderProductCreateProps, tx?: Transaction): Promise<PurchasedOrderProductProps> => {
        const purchasedOrderProductResponse: PurchasedOrderProductModel = await PurchasedOrderProductModel.create(data, {
            transaction: tx
        });
        const purchasedOrderResponseFormatted: PurchasedOrderProductProps = mapModelToDomain(purchasedOrderProductResponse);
        return purchasedOrderResponseFormatted;
    }
    update = async (id: number, data: PurchasedOrderProductUpdateProps, tx?: Transaction): Promise<PurchasedOrderProductProps> => {
        const existing: PurchasedOrderProductModel | null = await PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El producto de la orden de compra que se desea actualizar no fue posible encontrarlo."
        );
        await PurchasedOrderProductModel.update(data, {
            where: { id },
            transaction: tx,
        });
        const updated: PurchasedOrderProductModel | null = await PurchasedOrderProductModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el producto de la orden de compra.");
        return mapModelToDomain(updated);

    }
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: PurchasedOrderProductModel | null = await PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro el producto de la orden de compra que se pretende eliminar."
        );
        const deleted: number = await PurchasedOrderProductModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el producto de la orden de compra.");
        return;
    }
}