import { InventoryTransferAttributes, InventoryTransferCreateAttributes, InventoryTransferModel, InventoryTransferUpdateAttributes } from "../orm/inventory-transfer.orm";
import { InventoryTransferCreateProps, InventoryTransferProps, InventoryTransferUpdateProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";

const mapInventoryTransferModelToDomain = (model: InventoryTransferModel): InventoryTransferProps => {
    const json: InventoryTransferAttributes = model.toJSON();
    return {
        ...json,
        qty: DecimalVO.from(json.qty)
    }
};

const mapInventoryTransferCreateDomainToModel = (data: InventoryTransferCreateProps): InventoryTransferCreateAttributes => {
    return {
        ...data,
        qty: data.qty.toString()
    };
};

const mapInventoryTransferUpdateDomainToModel = (data: InventoryTransferUpdateProps): InventoryTransferUpdateAttributes => {
    const { qty, ...rest } = data;
    return {
        ...rest,
        ...(
            qty !== undefined
                ? { qty: qty.toString() }
                : {}
        )
    };
};

export class InventoryTransferRepository implements IInventoryTransferRepository {
    findAll = async (tx?: Transaction): Promise<InventoryTransferProps[]> => {
        const inventoryTransferResponse: InventoryTransferModel[] = await InventoryTransferModel.findAll({ transaction: tx });
        const inventoryTransferResponseFormatted = inventoryTransferResponse.map(mapInventoryTransferModelToDomain);
        return inventoryTransferResponseFormatted;
    };

    findById = async (id: number, tx?: Transaction): Promise<InventoryTransferProps | null> => {
        const inventoryTransferResponse: InventoryTransferModel | null = await InventoryTransferModel.findByPk(id, { transaction: tx });
        if (!inventoryTransferResponse) return null;
        const inventoryTransferResponseFormatted = mapInventoryTransferModelToDomain(inventoryTransferResponse);
        return inventoryTransferResponseFormatted;
    };

    create = async (data: InventoryTransferCreateProps, tx?: Transaction): Promise<InventoryTransferProps> => {
        const inventoryTransferResponse: InventoryTransferModel = await InventoryTransferModel.create(mapInventoryTransferCreateDomainToModel(data), { transaction: tx });
        if (!inventoryTransferResponse) throw new HttpError(500, "No fue posible crear la transferencia del inventario.");
        const inventoryTransferResponseFormatted: InventoryTransferProps = mapInventoryTransferModelToDomain(inventoryTransferResponse);
        return inventoryTransferResponseFormatted;
    };

    update = async (id: number, data: InventoryTransferUpdateProps, tx?: Transaction): Promise<InventoryTransferProps> => {
        // 1. Verificar existencia
        const existing: InventoryTransferModel | null = await InventoryTransferModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "La transferencia de inventario que se desea actualizar no fue posible encontrarlo."
        );
        const existingDomain = mapInventoryTransferModelToDomain(existing);
        if (!Object.keys(data).length) return existingDomain;
        const [affectedCount]: [affectedCount: number] = await InventoryTransferModel.update(mapInventoryTransferUpdateDomainToModel(data), {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return existingDomain;
        const updated: InventoryTransferModel | null = await InventoryTransferModel.findByPk(id, {
            transaction: tx,
            attributes: InventoryTransferModel.getAllFields() as ((keyof InventoryTransferProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la transferencia del inventario.");
        return mapInventoryTransferModelToDomain(updated);
    };

    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: InventoryTransferModel | null = await InventoryTransferModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro la transferencia de inventario que se pretende eliminar."
        );
        const deleted: number = await InventoryTransferModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar la transferencia de inventario indicada.");
        return;
    };
};