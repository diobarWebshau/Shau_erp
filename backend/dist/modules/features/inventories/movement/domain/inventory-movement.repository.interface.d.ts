import { InventoryMovementCreateProps, InventoryMovementProps, InventoryMovementUpdateProps } from "./inventory-movement.types";
import type { Transaction } from "sequelize";
export interface IInventoryMovementRepository {
    findAll: (tx?: Transaction) => Promise<InventoryMovementProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<InventoryMovementProps | null>;
    create: (data: InventoryMovementCreateProps, tx?: Transaction) => Promise<InventoryMovementProps>;
    update: (id: number, data: InventoryMovementUpdateProps, tx?: Transaction) => Promise<InventoryMovementProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
