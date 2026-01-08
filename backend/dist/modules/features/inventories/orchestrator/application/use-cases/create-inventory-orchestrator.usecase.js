"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInventoryOrchestratorUseCase = void 0;
const decimal_vo_1 = require("@shared/domain/value-objects/decimal.vo");
const sequelize_1 = require("@config/mysql/sequelize");
const sequelize_2 = require("sequelize");
;
const mapInventoryOrchestratorCreateDtoToDomain = (data) => {
    const formatted = data.map((invOrc) => {
        const { inventory, inventory_location_item } = invOrc;
        return ({
            inventory: {
                ...inventory,
                maximum_stock: decimal_vo_1.DecimalVO.from(inventory.maximum_stock),
                minimum_stock: decimal_vo_1.DecimalVO.from(inventory.minimum_stock),
                stock: decimal_vo_1.DecimalVO.from(inventory.stock),
            },
            inventory_location_item: inventory_location_item,
        });
    });
    return formatted;
};
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
            const createData = mapInventoryOrchestratorCreateDtoToDomain(data);
            const diobar = [];
            for (const inv of createData) {
                const { inventory, inventory_location_item } = inv;
                const inventoryCreateResponse = await this.inventoryRepo.create(inventory, tx);
                const newInventoryLocationItem = {
                    ...inventory_location_item,
                    inventory_id: inventoryCreateResponse.id
                };
                await this.inventoryLocationItemRepo.create(newInventoryLocationItem, tx);
            }
            ;
            await tx.commit();
            return diobar;
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
