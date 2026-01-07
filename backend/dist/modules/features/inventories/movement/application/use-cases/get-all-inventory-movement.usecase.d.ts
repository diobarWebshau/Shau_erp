import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { InventoryMovementProps } from "../../domain/inventory-movement.types";
import { Transaction } from "sequelize";
export declare class GetAllInventoryMovementUseCase {
    private readonly repo;
    constructor(repo: IInventoryMovementRepository);
    execute: (tx?: Transaction) => Promise<InventoryMovementProps[]>;
}
