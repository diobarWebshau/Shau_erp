import { InventoryMovementCreateProps, InventoryMovementProps, InventoryMovementUpdateProps } from "../../domain/inventory-movement.types";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { InventoryMovementModel } from "../orm/inventory-movement.orm";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";


const mapModelToDomain = (model: InventoryMovementModel): InventoryMovementProps => {
    const json: InventoryMovementProps = model.toJSON();
    return {
        ...json,
        qty: Number(json.qty)
    }
};

export class InventoryMovementRepository implements IInventoryMovementRepository {

    findAll = async (tx?: Transaction): Promise<InventoryMovementProps[]> => {
        const inventoryMovementResponses: InventoryMovementModel[] = await InventoryMovementModel.findAll({ transaction: tx });
        const inventoryMovementResponseFormatted: InventoryMovementProps[] = inventoryMovementResponses.map(mapModelToDomain);
        return inventoryMovementResponseFormatted;
    };

    findById = async (id: number, tx?: Transaction): Promise<InventoryMovementProps | null> => {
        const inventoryMovementResponse: InventoryMovementModel | null = await InventoryMovementModel.findByPk(id, { transaction: tx });
        if (!inventoryMovementResponse) return null;
        const inventoryMovementResponseFormatted: InventoryMovementProps = mapModelToDomain(inventoryMovementResponse);
        return inventoryMovementResponseFormatted;
    }
    create = async (data: InventoryMovementCreateProps, tx?: Transaction): Promise<InventoryMovementProps> => {
        const inventoryMovementResponse: InventoryMovementModel = await InventoryMovementModel.create(data, { transaction: tx });
        if (!inventoryMovementResponse) throw new HttpError(500, "No fue posible crear el nuevo moviemiento de inventario.");
        const inventoryMovementResponseFormatted: InventoryMovementProps = mapModelToDomain(inventoryMovementResponse);
        return inventoryMovementResponseFormatted;

    };
    update = async (id: number, data: InventoryMovementUpdateProps, tx?: Transaction): Promise<InventoryMovementProps> => {
        // 1. Verificar existencia
        const existing: InventoryMovementModel | null = await InventoryMovementModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El movimiento de inventario que se desea actualizar no fue posible encontrarlo."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await InventoryMovementModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return mapModelToDomain(existing);
        // 3. Obtener la locación actualizada
        const updated: InventoryMovementModel | null = await InventoryMovementModel.findByPk(id, {
            transaction: tx,
            attributes: InventoryMovementModel.getAllFields() as ((keyof InventoryMovementProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el movimiento de inventario.");
        return mapModelToDomain(updated);
    };
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: InventoryMovementModel | null = await InventoryMovementModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro el movimiento de inventario que se pretende eliminar."
        );
        const deleted: number = await InventoryMovementModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el movimiento de inventario.");
        return;
    };
};