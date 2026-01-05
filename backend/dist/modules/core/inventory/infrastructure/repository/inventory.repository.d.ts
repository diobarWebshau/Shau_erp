import type { InventoryCreateProps, InventoryProps, InventoryUpdateProps } from "../../domain/inventory.types";
import type { IInventoryRepository } from "../../domain/inventory.repository.interface";
import type { Transaction } from "sequelize";
export declare class InventoryRepository implements IInventoryRepository {
    findAll: (tx?: Transaction) => Promise<InventoryProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<InventoryProps | null>;
    create: (data: InventoryCreateProps, tx?: Transaction) => Promise<InventoryProps>;
    update: (id: number, data: InventoryUpdateProps, tx?: Transaction) => Promise<InventoryProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
