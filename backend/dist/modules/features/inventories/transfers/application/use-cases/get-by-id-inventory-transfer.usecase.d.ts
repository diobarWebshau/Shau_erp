import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { InventoryTransferResponseSchemaDto } from "../dto/inventory-tranfer.model.schema";
import { Transaction } from "sequelize";
export declare class GetByIdInventoryTransferUseCase {
    private readonly inventoryTransferRepo;
    constructor(inventoryTransferRepo: InventoryTransferRepository);
    execute: (id: number, tx?: Transaction) => Promise<InventoryTransferResponseSchemaDto | null>;
}
