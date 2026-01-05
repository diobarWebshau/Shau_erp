import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemResponseSchemaDto } from "../dto/inventory-location-item.model.schema";
import { Transaction } from "sequelize";
export declare class GetByLocationItemInventoryLocationItemUseCase {
    private readonly repo;
    constructor(repo: IInventoryLocationItemRepository);
    execute: (location_id: number, item_id: number, item_type: "product" | "input", tx?: Transaction) => Promise<InventoryLocationItemResponseSchemaDto | null>;
}
