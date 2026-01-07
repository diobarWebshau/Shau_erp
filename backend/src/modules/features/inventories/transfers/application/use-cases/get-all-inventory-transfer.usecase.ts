import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { Transaction } from "sequelize";


export class GetAllInventoryTransferUseCase {

    private readonly inventoryTransferRepo: InventoryTransferRepository;

    constructor(inventoryTransferRepo: InventoryTransferRepository) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    };

    execute = async (tx?: Transaction): Promise<InventoryTransferProps[]> => {
        const inventoryTransactionResponses: InventoryTransferProps[] = await this.inventoryTransferRepo.findAll(tx);
        return inventoryTransactionResponses;
    }
};