import { InventoryTransferProps } from "../../domain/inventory-tranfer.types";
import { IInventoryTransferRepository } from "../../domain/inventory-tranfer.repository.interface";
import { InventoryTransferUpdateDto } from "../dto/inventory-tranfer.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateInventoryTransferUseCase {
    private readonly inventoryTransferRepo;
    constructor(inventoryTransferRepo: IInventoryTransferRepository);
    execute: (id: number, data: InventoryTransferUpdateDto, tx?: Transaction) => Promise<InventoryTransferProps>;
}
