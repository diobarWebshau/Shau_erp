import { InventoryTransferCreateProps, InventoryTransferProps, InventoryTransferUpdateProps } from "./inventory-tranfer.types";
import { Transaction } from "sequelize";

export interface IInventoryTransferRepository {
    findAll: (tx?: Transaction) => Promise<InventoryTransferProps[]>,
    findById: (id: number, tx?: Transaction) => Promise<InventoryTransferProps | null>,
    create: (data: InventoryTransferCreateProps, tx?: Transaction) => Promise<InventoryTransferProps>,
    update: (id: number, data: InventoryTransferUpdateProps, tx?: Transaction) => Promise<InventoryTransferProps>,
    delete: (id: number, tx?: Transaction) => Promise<void>
};