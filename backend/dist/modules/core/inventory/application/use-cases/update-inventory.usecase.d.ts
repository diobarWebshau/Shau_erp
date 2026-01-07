import { InventoryProps } from "../../domain/inventory.types";
import { IInventoryRepository } from "../../domain/inventory.repository.interface";
import { inventoryUpdateDto } from "../dto/inventory.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateInventoryUseCase {
    private readonly repo;
    constructor(repo: IInventoryRepository);
    execute: (id: number, data: inventoryUpdateDto, tx?: Transaction) => Promise<InventoryProps>;
}
