import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { Transaction } from "sequelize";


export class GetByIdInventoryTransferUseCase {

    private readonly inventoryTransferRepo: InventoryTransferRepository;

    constructor(inventoryTransferRepo: InventoryTransferRepository) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    };

    execute = async (id: number, tx?: Transaction): Promise<InventoryTransferProps | null> => {
        const inventoryTransactionResponse: InventoryTransferProps | null = await this.inventoryTransferRepo.findById(id, tx);
        return inventoryTransactionResponse;
    }
};