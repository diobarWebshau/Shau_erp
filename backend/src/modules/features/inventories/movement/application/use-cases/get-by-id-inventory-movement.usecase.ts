import { InventoryMovementResponseSchemaDto } from "../../application/dto/inventory-movement.model.schema";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface"
import { InventoryMovementProps } from "../../domain/inventory-movement.types";
import { Transaction } from "sequelize";

export class GetByIdInventoryMovementUseCase {

    private readonly repo: IInventoryMovementRepository;

    constructor(repo: IInventoryMovementRepository) {
        this.repo = repo;
    };

    execute = async (id: number, tx?: Transaction): Promise<InventoryMovementResponseSchemaDto | null> => {
        const inventoryReponse: InventoryMovementProps | null = await this.repo.findById(id, tx);
        if (!inventoryReponse) return null;
        const inventoryResponseFormmated: InventoryMovementResponseSchemaDto = {
            ...inventoryReponse,
            is_locked: Boolean(inventoryReponse.is_locked),
            created_at: inventoryReponse.created_at.toISOString(),
        }
        return inventoryResponseFormmated;
    };
};