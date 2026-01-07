import { InventoryLocationItemCreateProps, InventoryLocationItemProps, InventoryLocationItemUpdateProps } from "../../domain/inventory-location-item.types";
import InventoryLocationItemModel, { InventoryLocationItemAttributes } from "../orm/inventory-location-item.orm";
import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction } from "sequelize";

const mapInventoryLocationItemModelToDomain = (model: InventoryLocationItemModel): InventoryLocationItemProps => {
    const inventoryLocationItemAttributes: InventoryLocationItemAttributes = model.toJSON();
    return inventoryLocationItemAttributes;
};

export class InventoryLocationItemRepository implements IInventoryLocationItemRepository {
    findAll = async (tx?: Transaction): Promise<InventoryLocationItemProps[]> => {
        const inventoryLocationItemResponses: InventoryLocationItemModel[] = await InventoryLocationItemModel.findAll({ transaction: tx });
        const inventoryLocationItemResponsesFormatted: InventoryLocationItemProps[] = inventoryLocationItemResponses.map(mapInventoryLocationItemModelToDomain);
        return inventoryLocationItemResponsesFormatted;
    };

    findById = async (id: number, tx?: Transaction): Promise<InventoryLocationItemProps | null> => {
        const inventoryLocationItemResponse: InventoryLocationItemModel | null = await InventoryLocationItemModel.findByPk(id, { transaction: tx });
        if (!inventoryLocationItemResponse) return null;
        const inventoryLocationItemResponsesFormatted: InventoryLocationItemProps = mapInventoryLocationItemModelToDomain(inventoryLocationItemResponse);
        return inventoryLocationItemResponsesFormatted;
    };

    findByLocationItem = async (location_id: number, item_id: number, item_type: "product" | "input", tx?: Transaction): Promise<InventoryLocationItemProps | null> => {
        const inventoryLocationItemResponse: InventoryLocationItemModel | null = await InventoryLocationItemModel.findOne({
            where: {
                location_id: location_id,
                item_id: item_id,
                item_type: item_type
            },
            transaction: tx
        });
        if (!inventoryLocationItemResponse) return null;
        const inventoryLocationItemResponsesFormatted: InventoryLocationItemProps = mapInventoryLocationItemModelToDomain(inventoryLocationItemResponse);
        return inventoryLocationItemResponsesFormatted;
    };

    create = async (data: InventoryLocationItemCreateProps, tx?: Transaction): Promise<InventoryLocationItemProps> => {
        const InventoryLocationItemResponse: InventoryLocationItemModel = await InventoryLocationItemModel.create(data, { transaction: tx });
        if (!InventoryLocationItemResponse) throw new HttpError(500, "No fue posible crear la asignacion de inventario del item a la locación.");
        const InventoryLocationItemResponseFormatted: InventoryLocationItemProps = mapInventoryLocationItemModelToDomain(InventoryLocationItemResponse);
        return InventoryLocationItemResponseFormatted;
    };

    update = async (id: number, data: InventoryLocationItemUpdateProps, tx?: Transaction): Promise<InventoryLocationItemProps> => {
        // 1. Verificar existencia
        const existing: InventoryLocationItemModel | null = await InventoryLocationItemModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "La asignacion de inventario del item a la locación indicada que se desea actualizar no fue posible encontrarlo."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await InventoryLocationItemModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return mapInventoryLocationItemModelToDomain(existing);
        // 3. Obtener la locación actualizada
        const updated: InventoryLocationItemModel | null = await InventoryLocationItemModel.findByPk(id, {
            transaction: tx,
            attributes: InventoryLocationItemModel.getAllFields() as ((keyof InventoryLocationItemProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la asignacion de inventario del item a la locación indicada.");
        return mapInventoryLocationItemModelToDomain(updated);
    };

    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: InventoryLocationItemModel | null = await InventoryLocationItemModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro la asignacion de inventario del item a la locación que se pretende eliminar."
        );
        const deleted: number = await InventoryLocationItemModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar la asignacion de inventario del item a la locación indicada.");
        return;
    };

};