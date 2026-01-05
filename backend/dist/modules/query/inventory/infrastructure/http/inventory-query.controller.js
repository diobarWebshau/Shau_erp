"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryQueryController = void 0;
const get_all_like_to_inventory_query_usecase_1 = require("../../application/use-cases/get-all-like-to-inventory-query.usecase");
const get_by_id_inventory_query_usecase_1 = require("../../application/use-cases/get-by-id-inventory-query.usecase");
const get_all_inventory_query_usecase_1 = require("../../application/use-cases/get-all-inventory-query.usecase");
const inventory_query_repository_1 = require("../repository/inventory-query.repository");
class InventoryQueryController {
    inventoryQueryRepo;
    getAllInventoryQueryUseCase;
    getAllLikeToInventoryQueryUseCase;
    getByIdInventoryQueryUseCase;
    constructor() {
        this.inventoryQueryRepo = new inventory_query_repository_1.InventoryQueryRepository();
        this.getAllInventoryQueryUseCase = new get_all_inventory_query_usecase_1.GetAllInventoryQueryUseCase(this.inventoryQueryRepo);
        this.getAllLikeToInventoryQueryUseCase = new get_all_like_to_inventory_query_usecase_1.GetAllLikeToInventoryQueryUseCase(this.inventoryQueryRepo);
        this.getByIdInventoryQueryUseCase = new get_by_id_inventory_query_usecase_1.GetByIdInventoryQueryUseCase(this.inventoryQueryRepo);
    }
    ;
    getAll = async (_req, res) => {
        const responseQuery = await this.getAllInventoryQueryUseCase.execute();
        res.status(200).json(responseQuery);
    };
    getAllLikeTo = async (req, res) => {
        const query = req.query;
        const responseQuery = await this.getAllLikeToInventoryQueryUseCase.execute(query);
        res.status(200).json(responseQuery);
    };
    getById = async (req, res) => {
        const { inventory_id } = req.params;
        const responseQuery = await this.getByIdInventoryQueryUseCase.execute(Number(inventory_id));
        res.status(200).json(responseQuery);
    };
}
exports.InventoryQueryController = InventoryQueryController;
