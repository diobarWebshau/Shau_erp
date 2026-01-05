import { InventoryLocationItemCreateProps, InventoryLocationItemProps } from "../../../posicition/domain/inventory-location-item.types";
import { inventoryOrchestratorCreateProps, inventoryOrchestratorResponseProps } from "../../domain/inventory-orchestrator.type";
import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { IInventoryRepository } from "@src/modules/core/inventory/domain/inventory.repository.interface";
import { InventoryProps } from "@src/modules/core/inventory/domain/inventory.types";
import { sequelize } from "@src/config/mysql/sequelize";
import { Transaction as SequelizeTx } from "sequelize";
import type { Transaction } from "sequelize";

interface ICreateInventoryOrchestratorUseCase {
    inventoryRepo: IInventoryRepository,
    inventoryLocationItemRepo: IInventoryLocationItemRepository
};

export class CreateInventoryOrchestratorUseCase {

    private readonly inventoryLocationItemRepo: IInventoryLocationItemRepository;
    private readonly inventoryRepo: IInventoryRepository;

    constructor({ inventoryRepo, inventoryLocationItemRepo }: ICreateInventoryOrchestratorUseCase) {
        this.inventoryRepo = inventoryRepo;
        this.inventoryLocationItemRepo = inventoryLocationItemRepo;
    };

    create = async (data: inventoryOrchestratorCreateProps[]): Promise<inventoryOrchestratorResponseProps[]> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const inventoryOrchestratorArray: inventoryOrchestratorResponseProps[] = [];
            for (const inv of data) {
                const { inventory, inventory_location_item }: inventoryOrchestratorCreateProps = inv;
                const inventoryCreateResponse: InventoryProps = await this.inventoryRepo.create(inventory, tx);
                const newInventoryLocationItem: InventoryLocationItemCreateProps = {
                    ...inventory_location_item,
                    inventory_id: inventoryCreateResponse.id
                }
                const inventoryLocationItemResponse: InventoryLocationItemProps =
                    await this.inventoryLocationItemRepo.create(newInventoryLocationItem, tx);
                const inventoryOrchestrator: inventoryOrchestratorResponseProps = {
                    inventory: {
                        ...inventoryCreateResponse,
                        created_at: inventoryCreateResponse.created_at.toISOString(),
                        updated_at: inventoryCreateResponse.updated_at.toISOString(),
                    },
                    inventory_location_item: {
                        ...inventoryLocationItemResponse,
                        created_at: inventoryLocationItemResponse.created_at.toISOString(),
                        updated_at: inventoryLocationItemResponse.updated_at.toISOString(),
                    }
                };
                inventoryOrchestratorArray.push(inventoryOrchestrator);
            };
            await tx.commit();
            return inventoryOrchestratorArray;
        } catch (error) {
            await tx.rollback();
            throw error;
        };
    };
};