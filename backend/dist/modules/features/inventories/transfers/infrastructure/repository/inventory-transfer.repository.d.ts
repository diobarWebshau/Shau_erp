import { InventoryTransferCreateProps, InventoryTransferProps, InventoryTransferUpdateProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { Transaction } from "sequelize";
export declare class InventoryTransferRepository implements IInventoryTransferRepository {
    findAll: (tx?: Transaction) => Promise<InventoryTransferProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<InventoryTransferProps | null>;
    create: (data: InventoryTransferCreateProps, tx?: Transaction) => Promise<InventoryTransferProps>;
    update: (id: number, data: InventoryTransferUpdateProps, tx?: Transaction) => Promise<InventoryTransferProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
