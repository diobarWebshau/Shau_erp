"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedProductDiscountRangeController = void 0;
const get_by_pop_applied_product_discount_range_usecase_1 = require("../../application/use-cases/get-by-pop-applied-product-discount-range.usecase");
const get_by_id_applied_product_discount_range_usecase_1 = require("../../application/use-cases/get-by-id-applied-product-discount-range.usecase");
const get_all_applied_product_discount_range_usecase_1 = require("../../application/use-cases/get-all-applied-product-discount-range.usecase");
const create_applied_product_discount_range_usecase_1 = require("../../application/use-cases/create-applied-product-discount-range.usecase");
const delete_applied_product_discount_range_usecase_1 = require("../../application/use-cases/delete-applied-product-discount-range.usecase");
const update_applied_product_discount_range_usecase_1 = require("../../application/use-cases/update-applied-product-discount-range.usecase");
const applied_product_discount_range_repository_1 = require("../repository/applied-product-discount-range.repository");
const mapAppliedProductDiscountRangeDomainToDto = (data) => {
    return ({
        ...data,
        created_at: data.created_at.toISOString(),
        updated_at: data.updated_at.toISOString(),
        max_qty: data.max_qty.toString(),
        min_qty: data.min_qty.toString(),
        unit_discount: data.unit_discount.toString(),
    });
};
class AppliedProductDiscountRangeController {
    appliedProductDiscountRangeRepo;
    createAppliedProductDiscountRangeUse;
    deleteAppliedProductDiscountRangeUseCase;
    updateAppliedProductDiscountRangeUseCase;
    getAllAppliedProductDiscountRangeUseCase;
    getByIdAppliedProductDiscountRangeUseCase;
    getByPopAppliedProductDiscountRangeUseCase;
    constructor() {
        this.appliedProductDiscountRangeRepo = new applied_product_discount_range_repository_1.AppliedProductDiscountRangeRepository();
        this.createAppliedProductDiscountRangeUse = new create_applied_product_discount_range_usecase_1.CreateAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.deleteAppliedProductDiscountRangeUseCase = new delete_applied_product_discount_range_usecase_1.DeleteAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.updateAppliedProductDiscountRangeUseCase = new update_applied_product_discount_range_usecase_1.UpdateAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.getAllAppliedProductDiscountRangeUseCase = new get_all_applied_product_discount_range_usecase_1.GetAllAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.getByIdAppliedProductDiscountRangeUseCase = new get_by_id_applied_product_discount_range_usecase_1.GetByIdAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
        this.getByPopAppliedProductDiscountRangeUseCase = new get_by_pop_applied_product_discount_range_usecase_1.GetByPopAppliedProductDiscountRangeUseCase(this.appliedProductDiscountRangeRepo);
    }
    ;
    getAll = async (_req, res) => {
        const appliedProductDiscountRangeResponse = await this.getAllAppliedProductDiscountRangeUseCase.execute();
        const appliedProductDiscountRangeResult = appliedProductDiscountRangeResponse.map(mapAppliedProductDiscountRangeDomainToDto);
        return res.status(201).json(appliedProductDiscountRangeResult);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const appliedProductDiscountRangeResponse = await this.getByIdAppliedProductDiscountRangeUseCase.execute(Number(id));
        if (!appliedProductDiscountRangeResponse)
            return res.status(404).json(null);
        const appliedProductDiscountRangeResult = mapAppliedProductDiscountRangeDomainToDto(appliedProductDiscountRangeResponse);
        return res.status(201).json(appliedProductDiscountRangeResult);
    };
    getByPop = async (req, res) => {
        const { purchase_order_product_id } = req.params;
        const appliedProductDiscountRangeResponse = await this.getByPopAppliedProductDiscountRangeUseCase.execute(Number(purchase_order_product_id));
        if (!appliedProductDiscountRangeResponse)
            return res.status(404).json(null);
        const appliedProductDiscountRangeResult = mapAppliedProductDiscountRangeDomainToDto(appliedProductDiscountRangeResponse);
        return res.status(201).json(appliedProductDiscountRangeResult);
    };
    create = async (req, res) => {
        const body = req.body;
        const appliedProductDiscountRangeResponse = await this.createAppliedProductDiscountRangeUse.execute(body);
        const appliedProductDiscountRangeResult = mapAppliedProductDiscountRangeDomainToDto(appliedProductDiscountRangeResponse);
        return res.status(201).json(appliedProductDiscountRangeResult);
    };
    update = async (req, res) => {
        const body = req.body;
        const { id } = req.params;
        const appliedProductDiscountRangeResponse = await this.updateAppliedProductDiscountRangeUseCase.execute(Number(id), body);
        const appliedProductDiscountRangeResult = mapAppliedProductDiscountRangeDomainToDto(appliedProductDiscountRangeResponse);
        return res.status(200).json(appliedProductDiscountRangeResult);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteAppliedProductDiscountRangeUseCase.execute(Number(id));
        return res.status(200).json(null);
    };
}
exports.AppliedProductDiscountRangeController = AppliedProductDiscountRangeController;
;
