import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemResponseSchemaDto } from "../dto/inventory-location-item.model.schema";
import { Transaction } from "sequelize";

export class GetAllInventoryLocationItemUseCase {
    private readonly repo: IInventoryLocationItemRepository;
    constructor(repo: IInventoryLocationItemRepository) {
        this.repo = repo;
    };
    execute = async (tx?: Transaction): Promise<InventoryLocationItemResponseSchemaDto[]> => {
        const inventroyLocationItemResponses = await this.repo.findAll(tx);
        const inventroyLocationItemResponsesFormatted: InventoryLocationItemResponseSchemaDto[] = inventroyLocationItemResponses.map((ili) => ({
            ...ili,
            created_at: ili.created_at.toISOString(),
            updated_at: ili.updated_at.toISOString()
        }));
        return inventroyLocationItemResponsesFormatted;
    }
};