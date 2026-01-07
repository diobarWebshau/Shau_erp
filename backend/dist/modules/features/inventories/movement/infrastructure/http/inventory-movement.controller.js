"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryMovementController = void 0;
const inventory_location_item_repository_1 = require("../../../posicition/infrastructure/repository/inventory-location-item.repository");
const inventory_query_repository_1 = require("@src/modules/query/inventory/infrastructure/repository/inventory-query.repository");
const get_by_id_inventory_movement_usecase_1 = require("../../application/use-cases/get-by-id-inventory-movement.usecase");
const create_inventory_movement_usecase_1 = require("../../application/use-cases/create-inventory-movement.usecase");
const delete_inventory_movement_usecase_1 = require("../../application/use-cases/delete-inventory-movement.usecase");
const update_inventory_movement_usecase_1 = require("../../application/use-cases/update-inventory-movement.usecase");
const get_all_inventory_movement_usecase_1 = require("../../application/use-cases/get-all-inventory-movement.usecase");
const location_repository_1 = require("@modules/core/location/infrastructure/repository/location.repository");
const producto_repository_1 = require("@modules/core/product/infrastructure/repository/producto.repository");
const input_repository_1 = require("@modules/core/input/infrastructure/repository/input.repository");
const inventory_movement_repository_1 = require("../repository/inventory-movement.repository");
const mapInventoryMovementDomainToDto = (data) => ({
    ...data,
    qty: data.qty.toString(),
    created_at: data.created_at.toISOString()
});
class InventoryMovementController {
    inventoryMovementRepo;
    productRepo;
    inputRepo;
    locationRepo;
    inventoryQueryRepo;
    inventoryLocationItemRepo;
    createInventoryMovementUseCase;
    getByIdInventoryMovementSchema;
    getAllInventoryMovementUseCase;
    updateInventoryMovementUseCase;
    deleteInventoryMovementUseCase;
    constructor() {
        this.inventoryMovementRepo = new inventory_movement_repository_1.InventoryMovementRepository();
        this.inputRepo = new input_repository_1.InputRepository();
        this.productRepo = new producto_repository_1.ProductRepository();
        this.locationRepo = new location_repository_1.LocationRepository();
        this.inventoryLocationItemRepo = new inventory_location_item_repository_1.InventoryLocationItemRepository();
        this.inventoryQueryRepo = new inventory_query_repository_1.InventoryQueryRepository();
        this.createInventoryMovementUseCase = new create_inventory_movement_usecase_1.CreateInventoryMovementUseCase({
            inputRepo: this.inputRepo,
            productRepo: this.productRepo,
            locationRepo: this.locationRepo,
            repo: this.inventoryMovementRepo,
            invetoryLocationItemRepo: this.inventoryLocationItemRepo,
            inventoryQueryRepo: this.inventoryQueryRepo
        });
        this.updateInventoryMovementUseCase = new update_inventory_movement_usecase_1.UpdateInventoryMovementUseCase({
            repo: this.inventoryMovementRepo
        });
        this.getAllInventoryMovementUseCase = new get_all_inventory_movement_usecase_1.GetAllInventoryMovementUseCase(this.inventoryMovementRepo);
        this.getByIdInventoryMovementSchema = new get_by_id_inventory_movement_usecase_1.GetByIdInventoryMovementUseCase(this.inventoryMovementRepo);
        this.deleteInventoryMovementUseCase = new delete_inventory_movement_usecase_1.DeleteInventoryMovementUseCase(this.inventoryMovementRepo);
    }
    ;
    getAll = async (_req, res) => {
        const inventoryMovementResponse = await this.getAllInventoryMovementUseCase.execute();
        const inventoryMovementResult = inventoryMovementResponse.map(mapInventoryMovementDomainToDto);
        return res.status(200).json(inventoryMovementResult);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const inventoryMovementResponse = await this.getByIdInventoryMovementSchema.execute(Number(id));
        return res.status(200).json(inventoryMovementResponse ? mapInventoryMovementDomainToDto(inventoryMovementResponse) : null);
    };
    create = async (req, res) => {
        const body = req.body;
        const inventoryMovementResponse = await this.createInventoryMovementUseCase.execute(body);
        return res.status(201).json(mapInventoryMovementDomainToDto(inventoryMovementResponse));
    };
    update = async (req, res) => {
        const body = req.body;
        const { id } = req.params;
        const inventoryMovementResponse = await this.updateInventoryMovementUseCase.execute(Number(id), body);
        return res.status(200).json(mapInventoryMovementDomainToDto(inventoryMovementResponse));
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteInventoryMovementUseCase.execute(Number(id));
        return res.status(200).json(null);
    };
}
exports.InventoryMovementController = InventoryMovementController;
