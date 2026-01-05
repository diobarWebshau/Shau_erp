import { InventoryMovementCreateProps, InventoryMovementProps, InventoryMovementUpdateProps } from "../../domain/inventory-movement.types";
import { IInventoryMovementRepository } from "../../domain/inventory-movement.repository.interface";
import { Transaction } from "sequelize";
export declare class InventoryMovementRepository implements IInventoryMovementRepository {
    findAll: (tx?: Transaction) => Promise<InventoryMovementProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<InventoryMovementProps | null>;
    create: (data: InventoryMovementCreateProps, tx?: Transaction) => Promise<InventoryMovementProps>;
    update: (id: number, data: InventoryMovementUpdateProps, tx?: Transaction) => Promise<InventoryMovementProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
