"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryOrchestratorController = void 0;
const create_tranfers_inventory_orchestrator_usecase_1 = require("../application/use-cases/create-tranfers-inventory-orchestrator.usecase");
const inventory_location_item_repository_1 = require("../../posicition/infrastructure/repository/inventory-location-item.repository");
const inventory_query_repository_1 = require("@modules/query/inventory/infrastructure/repository/inventory-query.repository");
const inventory_transfer_repository_1 = require("../../transfers/infrastructure/repository/inventory-transfer.repository");
const create_inventory_orchestrator_usecase_1 = require("../application/use-cases/create-inventory-orchestrator.usecase");
const inventory_repository_1 = require("@modules/core/inventory/infrastructure/repository/inventory.repository");
const mapInventoryTransferDomainToDto = (data) => {
    return {
        ...data,
        created_at: data.created_at.toISOString(),
        updated_at: data.updated_at.toISOString(),
        qty: data.qty.toString()
    };
};
const mapInventoryDomainToDto = (data) => {
    const { inventory, inventory_location_item } = data;
    return {
        inventory: {
            ...inventory,
            created_at: inventory.created_at.toISOString(),
            updated_at: inventory.updated_at.toISOString(),
            maximum_stock: inventory.maximum_stock.toString(),
            minimum_stock: inventory.minimum_stock.toString(),
            stock: inventory.stock.toString()
        },
        inventory_location_item: {
            ...inventory_location_item,
            created_at: inventory_location_item.created_at.toISOString(),
            updated_at: inventory_location_item.updated_at.toISOString(),
        }
    };
};
class InventoryOrchestratorController {
    inventoryRepo;
    inventoryLocationItemRepo;
    createInventoryOrchestratorUseCase;
    inventoryQueryRepo;
    inventoryTransferRepo;
    createTransferInventoryOrchestratorUseCase;
    constructor() {
        this.inventoryRepo = new inventory_repository_1.InventoryRepository();
        this.inventoryLocationItemRepo = new inventory_location_item_repository_1.InventoryLocationItemRepository();
        this.inventoryTransferRepo = new inventory_transfer_repository_1.InventoryTransferRepository();
        this.inventoryQueryRepo = new inventory_query_repository_1.InventoryQueryRepository();
        this.createInventoryOrchestratorUseCase = new create_inventory_orchestrator_usecase_1.CreateInventoryOrchestratorUseCase({
            inventoryLocationItemRepo: this.inventoryLocationItemRepo,
            inventoryRepo: this.inventoryRepo
        });
        this.createTransferInventoryOrchestratorUseCase = new create_tranfers_inventory_orchestrator_usecase_1.CreateTransferInventoryOrchestratorUseCase({
            inventoryLocationItemRepo: this.inventoryLocationItemRepo,
            inventoryQueryRepo: this.inventoryQueryRepo,
            inventoryRepo: this.inventoryRepo,
            inventoryTransferRepo: this.inventoryTransferRepo
        });
    }
    ;
    create = async (req, res) => {
        const body = req.body;
        const inventoryOrchestratorResponse = await this.createInventoryOrchestratorUseCase.create(body);
        const inventoryOrchestratorResult = inventoryOrchestratorResponse.map(mapInventoryDomainToDto);
        return res.status(201).json(inventoryOrchestratorResult);
    };
    craeteTransfer = async (req, res) => {
        const body = req.body;
        const inventoryTransferOrchestratorResponse = await this.createTransferInventoryOrchestratorUseCase.create(body);
        return res.status(201).json(mapInventoryTransferDomainToDto(inventoryTransferOrchestratorResponse));
    };
}
exports.InventoryOrchestratorController = InventoryOrchestratorController;
;
