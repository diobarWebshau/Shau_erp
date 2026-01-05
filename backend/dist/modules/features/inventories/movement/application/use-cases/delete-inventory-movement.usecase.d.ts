import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { Transaction } from "sequelize";
export declare class DeleteInventoryMovementUseCase {
    private readonly repo;
    constructor(repo: IInventoryMovementRepository);
    execute: (id: number, tx?: Transaction) => Promise<void>;
}
