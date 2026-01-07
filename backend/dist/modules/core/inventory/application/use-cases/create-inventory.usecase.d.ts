import { InventoryProps } from "../../domain/inventory.types";
import { IInventoryRepository } from "../../domain/inventory.repository.interface";
import { inventoryCreateDto } from "../dto/inventory.model.schema";
import { Transaction } from "sequelize";
export declare class CreateInventoryUseCase {
    private readonly repo;
    constructor(repo: IInventoryRepository);
    execute: (data: inventoryCreateDto, tx?: Transaction) => Promise<InventoryProps>;
}
