import { InventoryOrchestrator } from "../../domain/inventory-orchestrator.type";
import { InventoryOrchestratorCreateDto } from "../dto/inventory-orchestrator.model.schema";
import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { IInventoryRepository } from "@modules/core/inventory/domain/inventory.repository.interface";
interface ICreateInventoryOrchestratorUseCase {
    inventoryRepo: IInventoryRepository;
    inventoryLocationItemRepo: IInventoryLocationItemRepository;
}
export declare class CreateInventoryOrchestratorUseCase {
    private readonly inventoryLocationItemRepo;
    private readonly inventoryRepo;
    constructor({ inventoryRepo, inventoryLocationItemRepo }: ICreateInventoryOrchestratorUseCase);
    create: (data: InventoryOrchestratorCreateDto[]) => Promise<InventoryOrchestrator[]>;
}
export {};
