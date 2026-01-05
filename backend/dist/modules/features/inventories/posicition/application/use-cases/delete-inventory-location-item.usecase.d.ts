import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { Transaction } from "sequelize";
export declare class DeleteInventoryLocationItemUseCase {
    private readonly repo;
    constructor(repo: IInventoryLocationItemRepository);
    execute: (id: number, tx?: Transaction) => Promise<void>;
}
