import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { Transaction } from "sequelize";


export class DeleteInventoryTransferUseCase {

    private readonly inventoryTransferRepo: InventoryTransferRepository;

    constructor(inventoryTransferRepo: InventoryTransferRepository) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    };

    execute = async (id: number, tx?: Transaction): Promise<void> => {
        await this.inventoryTransferRepo.delete(id, tx);
    };
};