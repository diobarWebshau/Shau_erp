import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
import { Transaction } from "sequelize";

export class GetAllInventoryLocationItemUseCase {
    private readonly repo: IInventoryLocationItemRepository;
    constructor(repo: IInventoryLocationItemRepository) {
        this.repo = repo;
    };
    execute = async (tx?: Transaction): Promise<InventoryLocationItemProps[]> => {
        const inventroyLocationItemResponses: InventoryLocationItemProps[] = await this.repo.findAll(tx);
        return inventroyLocationItemResponses;
    }
};