import { InventoryMOvementUpdateAttributes } from "../../infrastructure/orm/inventory-movement.orm";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface"
import { InventoryMovementResponseSchemaDto } from "../dto/inventory-movement.model.schema";
import { InventoryMovementProps } from "../../domain/inventory-movement.types";
import { Transaction } from "sequelize";

interface IUpdateInventoryMovementUseCase {
    repo: IInventoryMovementRepository,
}

export class UpdateInventoryMovementUseCase {

    private readonly repo: IInventoryMovementRepository;

    constructor({ repo }: IUpdateInventoryMovementUseCase) {
        this.repo = repo;
    };

    execute = async (id: number, data: InventoryMOvementUpdateAttributes, tx?: Transaction): Promise<InventoryMovementResponseSchemaDto> => {
        const inventoryMovementResponse: InventoryMovementProps = await this.repo.update(id, data, tx);
        const inventoryMovementResponseFormatted: InventoryMovementResponseSchemaDto = {
            ...inventoryMovementResponse,
            is_locked: Boolean(inventoryMovementResponse.is_locked),
            created_at: inventoryMovementResponse.created_at.toISOString()
        }
        return inventoryMovementResponseFormatted;
    };
}; 