import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { Transaction } from "sequelize";
export declare class GetAllInventoryTransferUseCase {
    private readonly inventoryTransferRepo;
    constructor(inventoryTransferRepo: InventoryTransferRepository);
    execute: (tx?: Transaction) => Promise<InventoryTransferProps[]>;
}
