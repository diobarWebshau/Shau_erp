import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { Transaction } from "sequelize";


export class DeleteInventoryLocationItemUseCase {
    private readonly repo: IInventoryLocationItemRepository;
    constructor(repo: IInventoryLocationItemRepository) {
        this.repo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<void> =>
        await this.repo.delete(id, tx);
};