import { InventoryMovementResponseSchemaDto } from "../../application/dto/inventory-movement.model.schema";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface"
import { InventoryMovementProps } from "../../domain/inventory-movement.types";
import { Transaction } from "sequelize";

export class GetAllInventoryMovementUseCase {

    private readonly repo: IInventoryMovementRepository;

    constructor(repo: IInventoryMovementRepository) {
        this.repo = repo;
    };

    execute = async (tx?: Transaction): Promise<InventoryMovementResponseSchemaDto[]> => {
        const inventoryReponses: InventoryMovementProps[] = await this.repo.findAll(tx);
        const inventoryResponseFormmated: InventoryMovementResponseSchemaDto[] = inventoryReponses.map((im) => ({
            ...im,
            is_locked: Boolean(im.is_locked),
            created_at: im.created_at.toISOString(),
        }));
        return inventoryResponseFormmated;
    };
};