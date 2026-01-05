"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryOrchestratorController = void 0;
const create_inventory_orchestrator_usecase_1 = require("../application/use-cases/create-inventory-orchestrator.usecase");
const inventory_repository_1 = require("@src/modules/core/inventory/infrastructure/repository/inventory.repository");
const inventory_location_item_repository_1 = require("../../posicition/infrastructure/repository/inventory-location-item.repository");
const create_tranfers_inventory_orchestrator_usecase_1 = require("../application/use-cases/create-tranfers-inventory-orchestrator.usecase");
const inventory_transfer_repository_1 = require("../../transfers/infrastructure/repository/inventory-transfer.repository");
const inventory_query_repository_1 = require("@src/modules/query/inventory/infrastructure/repository/inventory-query.repository");
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
        return res.status(201).json(inventoryOrchestratorResponse);
    };
    craeteTransfer = async (req, res) => {
        const body = req.body;
        const inventoryTransferOrchestratorResponse = await this.createTransferInventoryOrchestratorUseCase.create(body);
        return res.status(201).json(inventoryTransferOrchestratorResponse);
    };
}
exports.InventoryOrchestratorController = InventoryOrchestratorController;
;
