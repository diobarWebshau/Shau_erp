"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedProductDiscountClientController = void 0;
const get_by_pop_applied_product_discount_client_usecase_1 = require("../../application/use-cases/get-by-pop-applied-product-discount-client.usecase");
const get_by_id_applied_product_discount_client_usecase_1 = require("../../application/use-cases/get-by-id-applied-product-discount-client.usecase");
const get_all_applied_product_discount_client_usecase_1 = require("../../application/use-cases/get-all-applied-product-discount-client.usecase");
const create_applied_product_discount_client_usecase_1 = require("../../application/use-cases/create-applied-product-discount-client.usecase");
const delete_applied_product_discount_client_usecase_1 = require("../../application/use-cases/delete-applied-product-discount-client.usecase");
const update_applied_product_discount_client_usecase_1 = require("../../application/use-cases/update-applied-product-discount-client.usecase");
const applied_product_discount_client_repository_1 = require("../repository/applied-product-discount-client.repository");
class AppliedProductDiscountClientController {
    appliedProductDiscountClientRepo;
    createAppliedProductDiscountClientRepo;
    deleteAppliedProductDiscountClientUseCase;
    updateAppliedProductDiscountClientUseCase;
    getAllAppliedProductDiscountClientUseCase;
    getByIdAppliedProductDiscountClientUseCase;
    getByPopAppliedProductDiscountClientUseCase;
    constructor() {
        this.appliedProductDiscountClientRepo = new applied_product_discount_client_repository_1.AppliedProductDiscountClientRepository();
        this.createAppliedProductDiscountClientRepo = new create_applied_product_discount_client_usecase_1.CreateAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.deleteAppliedProductDiscountClientUseCase = new delete_applied_product_discount_client_usecase_1.DeleteAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.updateAppliedProductDiscountClientUseCase = new update_applied_product_discount_client_usecase_1.UpdateAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.getAllAppliedProductDiscountClientUseCase = new get_all_applied_product_discount_client_usecase_1.GetAllAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.getByIdAppliedProductDiscountClientUseCase = new get_by_id_applied_product_discount_client_usecase_1.GetByIdAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
        this.getByPopAppliedProductDiscountClientUseCase = new get_by_pop_applied_product_discount_client_usecase_1.GetByPopAppliedProductDiscountClientUseCase(this.appliedProductDiscountClientRepo);
    }
    ;
    getAll = async (_req, res) => {
        const appliedProductDiscountClientRepo = await this.getAllAppliedProductDiscountClientUseCase.execute();
        return res.status(201).json(appliedProductDiscountClientRepo);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const appliedProductDiscountClientRepo = await this.getByIdAppliedProductDiscountClientUseCase.execute(Number(id));
        return res.status(201).json(appliedProductDiscountClientRepo);
    };
    getByPop = async (req, res) => {
        const { purchase_order_product_id } = req.params;
        const appliedProductDiscountClientRepo = await this.getByPopAppliedProductDiscountClientUseCase.execute(Number(purchase_order_product_id));
        return res.status(201).json(appliedProductDiscountClientRepo);
    };
    create = async (req, res) => {
        const body = req.body;
        const appliedProductDiscountClientRepo = await this.createAppliedProductDiscountClientRepo.execute(body);
        return res.status(201).json(appliedProductDiscountClientRepo);
    };
    update = async (req, res) => {
        const body = req.body;
        const { id } = req.params;
        const appliedProductDiscountClientRepo = await this.updateAppliedProductDiscountClientUseCase.execute(Number(id), body);
        return res.status(200).json(appliedProductDiscountClientRepo);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteAppliedProductDiscountClientUseCase.execute(Number(id));
        return res.status(200).json(null);
    };
}
exports.AppliedProductDiscountClientController = AppliedProductDiscountClientController;
;
