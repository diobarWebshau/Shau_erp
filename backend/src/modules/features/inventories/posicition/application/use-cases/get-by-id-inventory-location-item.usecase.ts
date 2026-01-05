import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemResponseSchemaDto } from "../dto/inventory-location-item.model.schema";
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
import { Transaction } from "sequelize";

export class GetByIdInventoryLocationItemUseCase {
    private readonly repo: IInventoryLocationItemRepository;
    constructor(repo: IInventoryLocationItemRepository) {
        this.repo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<InventoryLocationItemResponseSchemaDto | null> => {
        const inventroyLocationItemResponses: InventoryLocationItemProps | null = await this.repo.findById(id, tx);
        if (!inventroyLocationItemResponses) return null;
        const inventroyLocationItemResponsesFormatted: InventoryLocationItemResponseSchemaDto = ({
            ...inventroyLocationItemResponses,
            created_at: inventroyLocationItemResponses.created_at.toISOString(),
            updated_at: inventroyLocationItemResponses.updated_at.toISOString()
        });
        return inventroyLocationItemResponsesFormatted;
    };
};