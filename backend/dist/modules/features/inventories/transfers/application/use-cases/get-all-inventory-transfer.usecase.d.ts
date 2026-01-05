import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { InventoryTransferResponseSchemaDto } from "../dto/inventory-tranfer.model.schema";
import { Transaction } from "sequelize";
export declare class GetAllInventoryTransferUseCase {
    private readonly inventoryTransferRepo;
    constructor(inventoryTransferRepo: InventoryTransferRepository);
    execute: (tx?: Transaction) => Promise<InventoryTransferResponseSchemaDto[]>;
}
