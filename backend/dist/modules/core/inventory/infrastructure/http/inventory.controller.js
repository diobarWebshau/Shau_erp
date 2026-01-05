"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const inventory_repository_1 = require("../repository/inventory.repository");
const get_all_inventory_usecase_1 = require("../../application/use-cases/get-all-inventory.usecase");
const get_by_id_inventory_usecase_1 = require("../../application/use-cases/get-by-id-inventory.usecase");
const update_inventory_usecase_1 = require("../../application/use-cases/update-inventory.usecase");
const delete_inventory_usecase_1 = require("../../application/use-cases/delete-inventory.usecase");
const create_inventory_usecase_1 = require("../../application/use-cases/create-inventory.usecase");
class InventoryController {
    repo;
    getAllInventoryUseCase;
    getByIdInventoryUseCase;
    updateInventoryUseCase;
    deleteInventoryUseCase;
    createInventoryUseCase;
    constructor() {
        this.repo = new inventory_repository_1.InventoryRepository();
        this.createInventoryUseCase = new create_inventory_usecase_1.CreateInventoryUseCase(this.repo);
        this.getByIdInventoryUseCase = new get_by_id_inventory_usecase_1.GetByIdInventoryUseCase(this.repo);
        this.getAllInventoryUseCase = new get_all_inventory_usecase_1.GetAllInventoryUseCase(this.repo);
        this.updateInventoryUseCase = new update_inventory_usecase_1.UpdateInventoryUseCase(this.repo);
        this.deleteInventoryUseCase = new delete_inventory_usecase_1.DeleteInventoryUseCase(this.repo);
    }
    ;
    getAll = async (_req, res) => {
        const inventoryResponses = await this.getAllInventoryUseCase.execute();
        return res.status(200).json(inventoryResponses);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const inventoryResponse = await this.getByIdInventoryUseCase.execute(Number(id));
        return res.status(200).json(inventoryResponse);
    };
    create = async (req, res) => {
        const body = req.body;
        const inventoryResponse = await this.createInventoryUseCase.execute(body);
        return res.status(201).json(inventoryResponse);
    };
    update = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const inventoryResponse = await this.updateInventoryUseCase.execute(Number(id), body);
        return res.status(200).json(inventoryResponse);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteInventoryUseCase.execute(Number(id));
        return res.status(200).json(null);
    };
}
exports.InventoryController = InventoryController;
;
