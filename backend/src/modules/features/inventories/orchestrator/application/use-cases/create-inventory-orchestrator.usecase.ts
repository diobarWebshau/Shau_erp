import { InventoryOrchestrator, InventoryOrchestratorCreateBatchProps, InventoryOrchestratorCreateProps } from "../../domain/inventory-orchestrator.type";
import { InventoryOrchestratorCreateBatchDto, InventoryOrchestratorCreateDto } from "../dto/inventory-orchestrator.model.schema";
import { IInventoryLocationItemRepository } from "../../../posicition/domain/inventory-location-item.repository.interface";
import { InventoryLocationItemCreateProps } from "../../../posicition/domain/inventory-location-item.types";
import { IInventoryRepository } from "@modules/core/inventory/domain/inventory.repository.interface";
import { InventoryProps } from "@modules/core/inventory/domain/inventory.types";
import { DecimalVO } from "@shared/domain/value-objects/decimal.vo";
import { sequelize } from "@config/mysql/sequelize";
import { Transaction as SequelizeTx } from "sequelize";
import type { Transaction } from "sequelize";

interface ICreateInventoryOrchestratorUseCase {
    inventoryRepo: IInventoryRepository,
    inventoryLocationItemRepo: IInventoryLocationItemRepository
};

const mapInventoryOrchestratorCreateDtoToDomain = (data: InventoryOrchestratorCreateBatchDto): InventoryOrchestratorCreateBatchProps => {
    const formatted = data.map((invOrc: InventoryOrchestratorCreateDto): InventoryOrchestratorCreateProps => {
        const { inventory, inventory_location_item } = invOrc;
        return ({
            inventory: {
                ...inventory,
                maximum_stock: DecimalVO.from(inventory.maximum_stock),
                minimum_stock: DecimalVO.from(inventory.minimum_stock),
                stock: DecimalVO.from(inventory.stock),
            },
            inventory_location_item: inventory_location_item,
        })
    })
    return formatted;
};

export class CreateInventoryOrchestratorUseCase {

    private readonly inventoryLocationItemRepo: IInventoryLocationItemRepository;
    private readonly inventoryRepo: IInventoryRepository;

    constructor({ inventoryRepo, inventoryLocationItemRepo }: ICreateInventoryOrchestratorUseCase) {
        this.inventoryRepo = inventoryRepo;
        this.inventoryLocationItemRepo = inventoryLocationItemRepo;
    };

    create = async (data: InventoryOrchestratorCreateDto[]): Promise<InventoryOrchestrator[]> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const createData = mapInventoryOrchestratorCreateDtoToDomain(data);
            const diobar: InventoryOrchestrator[] = [];
            for (const inv of createData) {
                const { inventory, inventory_location_item }: InventoryOrchestratorCreateProps = inv;
                const inventoryCreateResponse: InventoryProps = await this.inventoryRepo.create(inventory, tx);
                const newInventoryLocationItem: InventoryLocationItemCreateProps = {
                    ...inventory_location_item,
                    inventory_id: inventoryCreateResponse.id
                }
                await this.inventoryLocationItemRepo.create(newInventoryLocationItem, tx);
            };
            await tx.commit();
            return diobar;
        } catch (error) {
            await tx.rollback();
            throw error;
        };
    };
};