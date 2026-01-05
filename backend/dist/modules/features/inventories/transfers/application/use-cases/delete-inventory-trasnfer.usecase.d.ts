import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { Transaction } from "sequelize";
export declare class DeleteInventoryTransferUseCase {
    private readonly inventoryTransferRepo;
    constructor(inventoryTransferRepo: InventoryTransferRepository);
    execute: (id: number, tx?: Transaction) => Promise<void>;
}
