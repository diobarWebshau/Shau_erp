import { InventoryMovementResponseSchemaDto } from "../../application/dto/inventory-movement.model.schema";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { Transaction } from "sequelize";
export declare class GetAllInventoryMovementUseCase {
    private readonly repo;
    constructor(repo: IInventoryMovementRepository);
    execute: (tx?: Transaction) => Promise<InventoryMovementResponseSchemaDto[]>;
}
