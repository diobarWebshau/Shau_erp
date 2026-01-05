"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInventoryOrchestratorUseCase = void 0;
const sequelize_1 = require("@src/config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
class CreateInventoryOrchestratorUseCase {
    inventoryLocationItemRepo;
    inventoryRepo;
    constructor({ inventoryRepo, inventoryLocationItemRepo }) {
        this.inventoryRepo = inventoryRepo;
        this.inventoryLocationItemRepo = inventoryLocationItemRepo;
    }
    ;
    create = async (data) => {
        const tx = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const inventoryOrchestratorArray = [];
            for (const inv of data) {
                const { inventory, inventory_location_item } = inv;
                const inventoryCreateResponse = await this.inventoryRepo.create(inventory, tx);
                const newInventoryLocationItem = {
                    ...inventory_location_item,
                    inventory_id: inventoryCreateResponse.id
                };
                const inventoryLocationItemResponse = await this.inventoryLocationItemRepo.create(newInventoryLocationItem, tx);
                const inventoryOrchestrator = {
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
            }
            ;
            await tx.commit();
            return inventoryOrchestratorArray;
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
        ;
    };
}
exports.CreateInventoryOrchestratorUseCase = CreateInventoryOrchestratorUseCase;
;
