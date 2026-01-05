import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemResponseSchemaDto } from "../dto/inventory-location-item.model.schema";
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
import { Transaction } from "sequelize";

export class GetByLocationItemInventoryLocationItemUseCase {
    private readonly repo: IInventoryLocationItemRepository;
    constructor(repo: IInventoryLocationItemRepository) {
        this.repo = repo;
    };
    execute = async (location_id: number, item_id: number, item_type: "product" | "input", tx?: Transaction): Promise<InventoryLocationItemResponseSchemaDto | null> => {
        const inventroyLocationItemResponses: InventoryLocationItemProps | null = await this.repo.findByLocationItem(
            location_id, item_id, item_type, tx
        );
        if (!inventroyLocationItemResponses) return null;
        const inventroyLocationItemResponsesFormatted: InventoryLocationItemResponseSchemaDto = ({
            ...inventroyLocationItemResponses,
            created_at: inventroyLocationItemResponses.created_at.toISOString(),
            updated_at: inventroyLocationItemResponses.updated_at.toISOString()
        });
        return inventroyLocationItemResponsesFormatted;
    };
};