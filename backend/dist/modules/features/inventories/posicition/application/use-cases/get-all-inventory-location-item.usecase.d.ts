import { IInventoryLocationItemRepository } from "../../domain/inventory-location-item.repository.interface";
import { InventoryLocationItemResponseSchemaDto } from "../dto/inventory-location-item.model.schema";
import { Transaction } from "sequelize";
export declare class GetAllInventoryLocationItemUseCase {
    private readonly repo;
    constructor(repo: IInventoryLocationItemRepository);
    execute: (tx?: Transaction) => Promise<InventoryLocationItemResponseSchemaDto[]>;
}
