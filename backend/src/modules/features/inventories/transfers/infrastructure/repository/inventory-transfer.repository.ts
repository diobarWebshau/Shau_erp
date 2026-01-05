import { InventoryTransferCreateProps, InventoryTransferProps, InventoryTransferUpdateProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { InventoryTransferModel } from "../orm/inventory-transfer.orm";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";

const mapModelToDomain = (model: InventoryTransferModel): InventoryTransferProps => {
    const json: InventoryTransferProps = model.toJSON();
    return { ...json, qty: Number(json.qty) }
};

export class InventoryTransferRepository implements IInventoryTransferRepository {
    findAll = async (tx?: Transaction): Promise<InventoryTransferProps[]> => {
        const inventoryTransferResponse: InventoryTransferModel[] = await InventoryTransferModel.findAll({ transaction: tx });
        const inventoryTransferResponseFormatted = inventoryTransferResponse.map(mapModelToDomain);
        return inventoryTransferResponseFormatted;
    };

    findById = async (id: number, tx?: Transaction): Promise<InventoryTransferProps | null> => {
        const inventoryTransferResponse: InventoryTransferModel | null = await InventoryTransferModel.findByPk(id, { transaction: tx });
        if (!inventoryTransferResponse) return null;
        const inventoryTransferResponseFormatted = mapModelToDomain(inventoryTransferResponse);
        return inventoryTransferResponseFormatted;
    };

    create = async (data: InventoryTransferCreateProps, tx?: Transaction): Promise<InventoryTransferProps> => {
        const inventoryTransferResponse: InventoryTransferModel = await InventoryTransferModel.create(data, { transaction: tx });
        if (!inventoryTransferResponse) throw new HttpError(500, "No fue posible crear la transferencia del inventario.");
        const inventoryTransferResponseFormatted: InventoryTransferProps = mapModelToDomain(inventoryTransferResponse);
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
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await InventoryTransferModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return mapModelToDomain(existing);
        // 3. Obtener la locación actualizada
        const updated: InventoryTransferModel | null = await InventoryTransferModel.findByPk(id, {
            transaction: tx,
            attributes: InventoryTransferModel.getAllFields() as ((keyof InventoryTransferProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la transferencia del inventario.");
        return mapModelToDomain(updated);
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