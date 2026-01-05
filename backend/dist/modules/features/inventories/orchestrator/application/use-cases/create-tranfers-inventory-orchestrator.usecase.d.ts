import { InventoryTransferCreateProps } from "@src/modules/features/inventories/transfers/domain/inventory-tranfer.types";
import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { IInventoryQueryRepository } from "@src/modules/query/inventory/domain/inventory-query.repository.interface";
import { IInventoryTransferRepository } from "../../../transfers/domain/inventory-tranfer.repository.interface";
import { IInventoryRepository } from "@src/modules/core/inventory/domain/inventory.repository.interface";
import { InventoryTransferResponseSchemaDto } from "../dto/inventory-orchestrator.model.schema";
interface ICreateInventoryOrchestratorUseCase {
    inventoryRepo: IInventoryRepository;
    inventoryLocationItemRepo: IInventoryLocationItemRepository;
    inventoryQueryRepo: IInventoryQueryRepository;
    inventoryTransferRepo: IInventoryTransferRepository;
}
export declare class CreateTransferInventoryOrchestratorUseCase {
    private readonly inventoryLocationItemRepo;
    private readonly inventoryRepo;
    private readonly inventoryQueryRepo;
    private readonly inventoryTransferRepo;
    constructor({ inventoryRepo, inventoryLocationItemRepo, inventoryQueryRepo, inventoryTransferRepo }: ICreateInventoryOrchestratorUseCase);
    create: (data: InventoryTransferCreateProps) => Promise<InventoryTransferResponseSchemaDto>;
}
export {};
