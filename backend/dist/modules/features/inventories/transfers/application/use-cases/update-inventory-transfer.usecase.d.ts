import { InventoryTransferUpdateProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { Transaction } from "sequelize";
export declare class UpdateInventoryTransferUseCase {
    private readonly inventoryTransferRepo;
    constructor(inventoryTransferRepo: IInventoryTransferRepository);
    execute: (id: number, data: InventoryTransferUpdateProps, tx?: Transaction) => Promise<{
        item_type: "input" | "product";
        item_id: number;
        item_name: string;
        qty: number;
        reason: string | null;
        status: "completed" | "canceled";
        source_location_id: number;
        destination_location_id: number;
        id: number;
        created_at: string;
        updated_at: string;
    }>;
}
