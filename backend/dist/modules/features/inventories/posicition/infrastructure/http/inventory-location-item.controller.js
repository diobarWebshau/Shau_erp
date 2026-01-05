"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryLocationItemController = void 0;
const get_by_location_item_inventory_location_item_usecase_1 = require("../../application/use-cases/get-by-location-item-inventory-location-item.usecase");
const get_by_id_inventory_location_item_usecase_1 = require("../../application/use-cases/get-by-id-inventory-location-item.usecase");
const get_all_inventory_location_item_usecase_1 = require("../../application/use-cases/get-all-inventory-location-item.usecase");
const delete_inventory_location_item_usecase_1 = require("../../application/use-cases/delete-inventory-location-item.usecase");
const update_inventory_location_item_usecase_1 = require("../../application/use-cases/update-inventory-location-item.usecase");
const create_inventory_location_item_usecase_1 = require("../../application/use-cases/create-inventory-location-item.usecase");
const inventory_repository_1 = require("@src/modules/core/inventory/infrastructure/repository/inventory.repository");
const location_repository_1 = require("@src/modules/core/location/infrastructure/repository/location.repository");
const producto_repository_1 = require("@src/modules/core/product/infrastructure/repository/producto.repository");
const input_repository_1 = require("@src/modules/core/input/infrastructure/repository/input.repository");
const inventory_location_item_repository_1 = require("../repository/inventory-location-item.repository");
class InventoryLocationItemController {
    inventoryLocationItemRepo;
    inputRepo;
    productRepo;
    inventoryRepo;
    locationRepo;
    getAllInventoryLocationItemUseCase;
    getByIdInventoryLocationItemUseCase;
    getByLocationItemInventoryLocationItemUseCase;
    updateInventoryLocationItemUseCase;
    createInventoryLocationItemUseCase;
    deleteInventoryLocationItemUseCase;
    constructor() {
        this.inventoryLocationItemRepo = new inventory_location_item_repository_1.InventoryLocationItemRepository();
        this.inputRepo = new input_repository_1.InputRepository();
        this.productRepo = new producto_repository_1.ProductRepository();
        this.inventoryRepo = new inventory_repository_1.InventoryRepository();
        this.locationRepo = new location_repository_1.LocationRepository();
        this.createInventoryLocationItemUseCase = new create_inventory_location_item_usecase_1.CreateInventoryLocationItemUseCase({
            inputRepo: this.inputRepo,
            inventoryRepo: this.inventoryRepo,
            inventoryLocationItemRepo: this.inventoryLocationItemRepo,
            locationRepo: this.locationRepo,
            productRepo: this.productRepo
        });
        this.updateInventoryLocationItemUseCase = new update_inventory_location_item_usecase_1.UpdateInventoryLocationItemUseCase({
            repo: this.inventoryLocationItemRepo
        });
        this.deleteInventoryLocationItemUseCase = new delete_inventory_location_item_usecase_1.DeleteInventoryLocationItemUseCase(this.inventoryLocationItemRepo);
        this.getAllInventoryLocationItemUseCase = new get_all_inventory_location_item_usecase_1.GetAllInventoryLocationItemUseCase(this.inventoryLocationItemRepo);
        this.getByIdInventoryLocationItemUseCase = new get_by_id_inventory_location_item_usecase_1.GetByIdInventoryLocationItemUseCase(this.inventoryLocationItemRepo);
        this.getByLocationItemInventoryLocationItemUseCase = new get_by_location_item_inventory_location_item_usecase_1.GetByLocationItemInventoryLocationItemUseCase(this.inventoryLocationItemRepo);
    }
    ;
    getAll = async (_req, res) => {
        const inventoryLocationItemResponse = await this.getAllInventoryLocationItemUseCase.execute();
        return res.status(200).json(inventoryLocationItemResponse);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const inventoryLocationItemResponse = await this.getByIdInventoryLocationItemUseCase.execute(Number(id));
        return res.status(200).json(inventoryLocationItemResponse);
    };
    getByLocationItem = async (req, res) => {
        const { location_id, item_id, item_type } = req.params;
        const inventoryLocationItemResponse = await this.getByLocationItemInventoryLocationItemUseCase.execute(Number(location_id), Number(item_id), item_type);
        return res.status(200).json(inventoryLocationItemResponse);
    };
    create = async (req, res) => {
        const body = req.body;
        const inventoryLocationItemResponse = await this.createInventoryLocationItemUseCase.execute(body);
        return res.status(201).json(inventoryLocationItemResponse);
    };
    update = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const inventoryLocationItemResponse = await this.updateInventoryLocationItemUseCase.execute(id, body);
        return res.status(200).json(inventoryLocationItemResponse);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteInventoryLocationItemUseCase.execute(id);
        return res.status(200).json(null);
    };
}
exports.InventoryLocationItemController = InventoryLocationItemController;
;
