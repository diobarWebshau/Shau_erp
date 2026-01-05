"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTransferController = void 0;
const get_by_id_inventory_transfer_usecase_1 = require("../../application/use-cases/get-by-id-inventory-transfer.usecase");
const get_all_inventory_transfer_usecase_1 = require("../../application/use-cases/get-all-inventory-transfer.usecase");
const update_inventory_transfer_usecase_1 = require("../../application/use-cases/update-inventory-transfer.usecase");
const delete_inventory_trasnfer_usecase_1 = require("../../application/use-cases/delete-inventory-trasnfer.usecase");
const create_inventory_transfer_usecase_1 = require("../../application/use-cases/create-inventory-transfer.usecase");
const location_repository_1 = require("@modules/core/location/infrastructure/repository/location.repository");
const producto_repository_1 = require("@modules/core/product/infrastructure/repository/producto.repository");
const input_repository_1 = require("@modules/core/input/infrastructure/repository/input.repository");
const inventory_transfer_repository_1 = require("../repository/inventory-transfer.repository");
class InventoryTransferController {
    inventoryTransferRepo;
    locationRepo;
    inputRepo;
    productRepo;
    createInventoryTransferUseCase;
    updateInventoryTransferUseCase;
    getAllInventoryTransferUseCase;
    getByIdInventoryTransferUseCase;
    deleteInventoryTransferUseCase;
    constructor() {
        this.inventoryTransferRepo = new inventory_transfer_repository_1.InventoryTransferRepository();
        this.locationRepo = new location_repository_1.LocationRepository();
        this.productRepo = new producto_repository_1.ProductRepository();
        this.inputRepo = new input_repository_1.InputRepository();
        this.createInventoryTransferUseCase = new create_inventory_transfer_usecase_1.CreateInventoryTransferUseCase({
            inputRepo: this.inputRepo,
            locationRepo: this.locationRepo,
            productRepo: this.productRepo,
            inventoryTransferRepo: this.inventoryTransferRepo
        });
        this.updateInventoryTransferUseCase = new update_inventory_transfer_usecase_1.UpdateInventoryTransferUseCase(this.inventoryTransferRepo);
        this.getAllInventoryTransferUseCase = new get_all_inventory_transfer_usecase_1.GetAllInventoryTransferUseCase(this.inventoryTransferRepo);
        this.getByIdInventoryTransferUseCase = new get_by_id_inventory_transfer_usecase_1.GetByIdInventoryTransferUseCase(this.inventoryTransferRepo);
        this.deleteInventoryTransferUseCase = new delete_inventory_trasnfer_usecase_1.DeleteInventoryTransferUseCase(this.inventoryTransferRepo);
    }
    ;
    getAll = async (_req, res) => {
        const inventoryTransferResponses = await this.getAllInventoryTransferUseCase.execute();
        return res.status(200).json(inventoryTransferResponses);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const inventoryTransferResponse = await this.getByIdInventoryTransferUseCase.execute(Number(id));
        return res.status(200).json(inventoryTransferResponse);
    };
    create = async (req, res) => {
        const body = req.body;
        const inventoryTransferResponse = await this.createInventoryTransferUseCase.execute(body);
        return res.status(201).json(inventoryTransferResponse);
    };
    update = async (req, res) => {
        const body = req.body;
        const { id } = req.params;
        const inventoryTransferResponse = await this.updateInventoryTransferUseCase.execute(Number(id), body);
        return res.status(200).json(inventoryTransferResponse);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteInventoryTransferUseCase.execute(Number(id));
        res.status(200).json(null);
    };
}
exports.InventoryTransferController = InventoryTransferController;
