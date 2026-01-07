import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
import { Transaction } from "sequelize";
export declare class GetAllInventoryLocationItemUseCase {
    private readonly repo;
    constructor(repo: IInventoryLocationItemRepository);
    execute: (tx?: Transaction) => Promise<InventoryLocationItemProps[]>;
}
