import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { InventoryMovementProps } from "../../domain/inventory-movement.types";
import { Transaction } from "sequelize";
export declare class GetByIdInventoryMovementUseCase {
    private readonly repo;
    constructor(repo: IInventoryMovementRepository);
    execute: (id: number, tx?: Transaction) => Promise<InventoryMovementProps | null>;
}
