import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { Transaction } from "sequelize";
export declare class GetByIdInventoryTransferUseCase {
    private readonly inventoryTransferRepo;
    constructor(inventoryTransferRepo: InventoryTransferRepository);
    execute: (id: number, tx?: Transaction) => Promise<InventoryTransferProps | null>;
}
