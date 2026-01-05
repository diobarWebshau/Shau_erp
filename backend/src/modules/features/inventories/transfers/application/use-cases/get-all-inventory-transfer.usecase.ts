import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { InventoryTransferResponseSchemaDto } from "../dto/inventory-tranfer.model.schema";
import { InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { Transaction } from "sequelize";


export class GetAllInventoryTransferUseCase {

    private readonly inventoryTransferRepo: InventoryTransferRepository;

    constructor(inventoryTransferRepo: InventoryTransferRepository) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    };

    execute = async (tx?: Transaction): Promise<InventoryTransferResponseSchemaDto[]> => {
        const inventoryTransactionResponses: InventoryTransferProps[] = await this.inventoryTransferRepo.findAll(tx);
        if (!inventoryTransactionResponses.length) return [];
        const inventoryTransactionResponsesFormatted: InventoryTransferResponseSchemaDto[] = inventoryTransactionResponses.map((it) => ({
            ...it,
            created_at: it.created_at.toISOString(),
            updated_at: it.updated_at.toISOString()
        }));
        return inventoryTransactionResponsesFormatted;
    }
};