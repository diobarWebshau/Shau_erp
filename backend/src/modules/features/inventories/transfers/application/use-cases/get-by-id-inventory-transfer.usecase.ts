import { InventoryTransferRepository } from "../../infrastructure/repository/inventory-transfer.repository";
import { InventoryTransferResponseSchemaDto } from "../dto/inventory-tranfer.model.schema";
import { InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { Transaction } from "sequelize";


export class GetByIdInventoryTransferUseCase {

    private readonly inventoryTransferRepo: InventoryTransferRepository;

    constructor(inventoryTransferRepo: InventoryTransferRepository) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    };

    execute = async (id: number, tx?: Transaction): Promise<InventoryTransferResponseSchemaDto | null> => {
        const inventoryTransactionResponse: InventoryTransferProps | null = await this.inventoryTransferRepo.findById(id, tx);
        if (!inventoryTransactionResponse) return null;
        const inventoryTransactionResponsesFormatted: InventoryTransferResponseSchemaDto = {
            ...inventoryTransactionResponse,
            created_at: inventoryTransactionResponse.created_at.toISOString(),
            updated_at: inventoryTransactionResponse.updated_at.toISOString()
        };
        return inventoryTransactionResponsesFormatted;
    }
};