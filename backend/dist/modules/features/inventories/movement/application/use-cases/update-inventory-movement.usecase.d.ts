import { InventoryMovementProps } from "../../domain/inventory-movement.types";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { InventoryMovementUpdateDto } from "../dto/inventory-movement.model.schema";
import { Transaction } from "sequelize";
interface IUpdateInventoryMovementUseCase {
    repo: IInventoryMovementRepository;
}
export declare class UpdateInventoryMovementUseCase {
    private readonly repo;
    constructor({ repo }: IUpdateInventoryMovementUseCase);
    execute: (id: number, data: InventoryMovementUpdateDto, tx?: Transaction) => Promise<InventoryMovementProps>;
}
export {};
