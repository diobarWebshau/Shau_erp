"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryQueryController = void 0;
const get_all_like_to_inventory_query_usecase_1 = require("../../application/use-cases/get-all-like-to-inventory-query.usecase");
const get_by_id_inventory_query_usecase_1 = require("../../application/use-cases/get-by-id-inventory-query.usecase");
const get_all_inventory_query_usecase_1 = require("../../application/use-cases/get-all-inventory-query.usecase");
const inventory_query_repository_1 = require("../repository/inventory-query.repository");
const mapInventoryQueryDomainToDto = (data) => {
    return ({
        ...data,
        available: data.available.toString(),
        commited: data.commited.toString(),
        stock: data.stock.toString(),
        minimum_stock: data.minimum_stock.toString(),
        maximum_stock: data.maximum_stock.toString(),
    });
};
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
        const inventoryQueryResponses = await this.getAllInventoryQueryUseCase.execute();
        const inventoryResult = await Promise.all(inventoryQueryResponses.map(mapInventoryQueryDomainToDto));
        return res.status(200).json(inventoryResult);
    };
    getAllLikeTo = async (req, res) => {
        const query = req.query;
        const inventoryQueryResponses = await this.getAllLikeToInventoryQueryUseCase.execute(query);
        const inventoryResult = await Promise.all(inventoryQueryResponses.map(mapInventoryQueryDomainToDto));
        return res.status(200).json(inventoryResult);
    };
    getById = async (req, res) => {
        const { inventory_id } = req.params;
        const responseQuery = await this.getByIdInventoryQueryUseCase.execute(Number(inventory_id));
        if (!responseQuery)
            return res.status(204).json(null);
        const inventoryResult = await mapInventoryQueryDomainToDto(responseQuery);
        return res.status(200).json(inventoryResult);
    };
}
exports.InventoryQueryController = InventoryQueryController;
