import { inventoryOrchestratorCreateProps, inventoryOrchestratorResponseProps } from "../../domain/inventory-orchestrator.type";
import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { IInventoryRepository } from "@src/modules/core/inventory/domain/inventory.repository.interface";
interface ICreateInventoryOrchestratorUseCase {
    inventoryRepo: IInventoryRepository;
    inventoryLocationItemRepo: IInventoryLocationItemRepository;
}
export declare class CreateInventoryOrchestratorUseCase {
    private readonly inventoryLocationItemRepo;
    private readonly inventoryRepo;
    constructor({ inventoryRepo, inventoryLocationItemRepo }: ICreateInventoryOrchestratorUseCase);
    create: (data: inventoryOrchestratorCreateProps[]) => Promise<inventoryOrchestratorResponseProps[]>;
}
export {};
