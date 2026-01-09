import { PurchasedOrderProductAttributes, PurchasedOrderProductCreateAttributes, PurchasedOrderProductModel, PurchasedOrderProductUpdateAttributes } from "../orm/purchased-order-product.orm";
import { PurchasedOrderProductCreateProps, PurchasedOrderProductProps, PurchasedOrderProductUpdateProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

const mapPopModelToDomain = (model: PurchasedOrderProductModel): PurchasedOrderProductProps => {
    const popAttr: PurchasedOrderProductAttributes = model.toJSON();
    return {
        ...popAttr,
        original_price: DecimalVO.from(popAttr.original_price),
        recorded_price: DecimalVO.from(popAttr.original_price),
        qty: DecimalVO.from(popAttr.qty)
    };
};

const mapPopCreateDomainToModel = (data: PurchasedOrderProductCreateProps): PurchasedOrderProductCreateAttributes => {
    return ({
        ...data,
        original_price: data.original_price.toString(),
        qty: data.qty.toString(),
        recorded_price: data.recorded_price.toString(),
    });
};

const mapPopUpdateDomainToModel = (data: PurchasedOrderProductUpdateProps): PurchasedOrderProductUpdateAttributes => {
    const { original_price, qty, recorded_price, ...popRest } = data;
    return ({
        ...popRest,
        ...(
            original_price !== undefined ? { original_price: original_price.toString() } : {}
        ),
        ...(
            qty !== undefined ? { qty: qty.toString() } : {}
        ),
        ...(
            recorded_price !== undefined ? { recorded_price: recorded_price.toString() } : {}
        )
    });
};

export class PurchasedOrderProductRepository implements IPurchasedOrderProductRepository {
    findAll = async (tx?: Transaction): Promise<PurchasedOrderProductProps[]> => {
        const purchasedOrderProductResponses: PurchasedOrderProductModel[] = await PurchasedOrderProductModel.findAll({ transaction: tx });
        const purchasedOrderProductResponseFormatted: PurchasedOrderProductProps[] = purchasedOrderProductResponses.map(mapPopModelToDomain);
        return purchasedOrderProductResponseFormatted;
    }
    findById = async (id: number, tx?: Transaction): Promise<PurchasedOrderProductProps | null> => {
        const purchasedOrderProductResponse: PurchasedOrderProductModel | null = await PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!purchasedOrderProductResponse) return null;
        const purchasedOrderProductResponseFormatted: PurchasedOrderProductProps = mapPopModelToDomain(purchasedOrderProductResponse);
        return purchasedOrderProductResponseFormatted;

    }
    findByPurchasedId = async (purchase_order_id: number, tx?: Transaction): Promise<PurchasedOrderProductProps[]> => {
        const purchasedOrderProductResponses: PurchasedOrderProductModel[] = await PurchasedOrderProductModel.findAll({
            where: {
                purchase_order_id: purchase_order_id
            },
            transaction: tx
        });
        const purchasedOrderProductResponseFormatted: PurchasedOrderProductProps[] = purchasedOrderProductResponses.map(mapPopModelToDomain);
        return purchasedOrderProductResponseFormatted;
    }
    create = async (data: PurchasedOrderProductCreateProps, tx?: Transaction): Promise<PurchasedOrderProductProps> => {
        const purchasedOrderProductResponse: PurchasedOrderProductModel = await PurchasedOrderProductModel.create(mapPopCreateDomainToModel(data), {
            transaction: tx
        });
        const purchasedOrderResponseFormatted: PurchasedOrderProductProps = mapPopModelToDomain(purchasedOrderProductResponse);
        return purchasedOrderResponseFormatted;
    }
    update = async (id: number, data: PurchasedOrderProductUpdateProps, tx?: Transaction): Promise<PurchasedOrderProductProps> => {
        const existing: PurchasedOrderProductModel | null = await PurchasedOrderProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El producto de la orden de compra que se desea actualizar no fue posible encontrarlo."
        );
        const existingDomain = mapPopModelToDomain(existing);
        const updateData = mapPopUpdateDomainToModel(data);
        if (!Object.keys(updateData).length) return existingDomain;
        await PurchasedOrderProductModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        const updated: PurchasedOrderProductModel | null = await PurchasedOrderProductModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el producto de la orden de compra.");
        return mapPopModelToDomain(updated);

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