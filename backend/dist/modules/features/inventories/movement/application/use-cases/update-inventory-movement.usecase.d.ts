import { InventoryMOvementUpdateAttributes } from "../../infrastructure/orm/inventory-movement.orm";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { InventoryMovementResponseSchemaDto } from "../dto/inventory-movement.model.schema";
import { Transaction } from "sequelize";
interface IUpdateInventoryMovementUseCase {
    repo: IInventoryMovementRepository;
}
export declare class UpdateInventoryMovementUseCase {
    private readonly repo;
    constructor({ repo }: IUpdateInventoryMovementUseCase);
    execute: (id: number, data: InventoryMOvementUpdateAttributes, tx?: Transaction) => Promise<InventoryMovementResponseSchemaDto>;
}
export {};
