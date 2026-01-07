import { InventoryMovementAttributes, InventoryMovementCreateAttributes, InventoryMovementModel, InventoryMovementUpdateAttributes } from "../orm/inventory-movement.orm";
import { InventoryMovementCreateProps, InventoryMovementProps, InventoryMovementUpdateProps } from "../../domain/inventory-movement.types";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { DecimalVO } from "@shared/domain/value-objects/decimal.vo";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";


const mapInventoryMovementModelToDomain = (model: InventoryMovementModel): InventoryMovementProps => {
    const inventoryMovementAttributes: InventoryMovementAttributes = model.toJSON();
    return {
        ...inventoryMovementAttributes,
        reference_id: inventoryMovementAttributes.reference_id ? inventoryMovementAttributes.reference_id : null,
        production_id: inventoryMovementAttributes.production_id ? inventoryMovementAttributes.production_id : null,
        description: inventoryMovementAttributes.description ? inventoryMovementAttributes.description : null,
        qty: DecimalVO.from(inventoryMovementAttributes.qty),
        created_at: inventoryMovementAttributes.created_at instanceof Date ? inventoryMovementAttributes.created_at : new Date(inventoryMovementAttributes.created_at)
    }
};

const mapInventoryMovementCreateDomainToModel = (data: InventoryMovementCreateProps): InventoryMovementCreateAttributes => ({
    ...data,
    qty: data.qty.toString(),
});

const mapInventoryMovementUpdateDomainToModel = (data: InventoryMovementUpdateProps): InventoryMovementUpdateAttributes => {
    const { qty, ...rest } = data;
    return {
        ...rest,
        ...(qty !== undefined
            ? { qty: qty.toString() }
            : {}),
    };
};

export class InventoryMovementRepository implements IInventoryMovementRepository {

    findAll = async (tx?: Transaction): Promise<InventoryMovementProps[]> => {
        const inventoryMovementResponses: InventoryMovementModel[] = await InventoryMovementModel.findAll({ transaction: tx });
        const inventoryMovementResponseFormatted: InventoryMovementProps[] = inventoryMovementResponses.map(mapInventoryMovementModelToDomain);
        return inventoryMovementResponseFormatted;
    };

    findById = async (id: number, tx?: Transaction): Promise<InventoryMovementProps | null> => {
        const inventoryMovementResponse: InventoryMovementModel | null = await InventoryMovementModel.findByPk(id, { transaction: tx });
        if (!inventoryMovementResponse) return null;
        const inventoryMovementResponseFormatted: InventoryMovementProps = mapInventoryMovementModelToDomain(inventoryMovementResponse);
        return inventoryMovementResponseFormatted;
    }
    create = async (data: InventoryMovementCreateProps, tx?: Transaction): Promise<InventoryMovementProps> => {
        const inventoryMovementResponse: InventoryMovementModel = await InventoryMovementModel.create(mapInventoryMovementCreateDomainToModel(data), { transaction: tx });
        if (!inventoryMovementResponse) throw new HttpError(500, "No fue posible crear el nuevo moviemiento de inventario.");
        const inventoryMovementResponseFormatted: InventoryMovementProps = mapInventoryMovementModelToDomain(inventoryMovementResponse);
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
        const existingDomain: InventoryMovementProps = mapInventoryMovementModelToDomain(existing);

        if (!Object.keys(data).length) return existingDomain;

        const [affectedCount] = await InventoryMovementModel.update(
            mapInventoryMovementUpdateDomainToModel(data),
            { where: { id }, transaction: tx }
        );

        if (!affectedCount) return existingDomain;
        const updated: InventoryMovementModel | null = await InventoryMovementModel.findByPk(id, {
            transaction: tx
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el movimiento de inventario.");
        return mapInventoryMovementModelToDomain(updated);
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