import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemProps } from "../../domain/inventory-location-item.types";
import { Transaction } from "sequelize";
export declare class GetByLocationItemInventoryLocationItemUseCase {
    private readonly repo;
    constructor(repo: IInventoryLocationItemRepository);
    execute: (location_id: number, item_id: number, item_type: "product" | "input", tx?: Transaction) => Promise<InventoryLocationItemProps | null>;
}
