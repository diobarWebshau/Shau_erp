import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
import { Transaction } from "sequelize";

export class GetByIdInventoryLocationItemUseCase {
    private readonly repo: IInventoryLocationItemRepository;
    constructor(repo: IInventoryLocationItemRepository) {
        this.repo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<InventoryLocationItemProps | null> => {
        const inventroyLocationItemResponses: InventoryLocationItemProps | null = await this.repo.findById(id, tx);
        return inventroyLocationItemResponses;
    };
};