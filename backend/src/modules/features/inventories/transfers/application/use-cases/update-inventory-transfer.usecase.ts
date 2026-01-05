import { InventoryTransferProps, InventoryTransferUpdateProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { InventoryTransferResponseSchemaDto } from "../dto/inventory-tranfer.model.schema";
import { Transaction } from "sequelize";

export class UpdateInventoryTransferUseCase {

    private readonly inventoryTransferRepo: IInventoryTransferRepository;

    constructor(inventoryTransferRepo: IInventoryTransferRepository) {
        this.inventoryTransferRepo = inventoryTransferRepo;
    };

    execute = async (id: number, data: InventoryTransferUpdateProps, tx?: Transaction) => {
        const inventoryTransferResponse: InventoryTransferProps = await this.inventoryTransferRepo.update(id, data, tx);
        const inventoryTransfer: InventoryTransferResponseSchemaDto = {
            ...inventoryTransferResponse,
            created_at: inventoryTransferResponse.created_at.toISOString(),
            updated_at: inventoryTransferResponse.updated_at.toISOString()
        };
        return inventoryTransfer;
    };
}