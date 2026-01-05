"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOrchestratorController = void 0;
const product_discount_range_repository_1 = require("../../assigments/product-discounts-ranges/infrastructure/repository/product-discount-range.repository");
const product_input_process_repository_1 = require("../../assigments/product-input-process/infrastructure/repository/product-input-process.repository");
const product_process_repository_1 = require("../../assigments/product-process/infrastructure/repository/product-process.repository");
const product_input_repository_1 = require("../../assigments/product-input/infrastructure/repository/product-input.repository");
const product_query_repository_1 = require("../../../../query/product/infrastructure/product-query.repository");
const producto_repository_1 = require("@modules/core/product/infrastructure/repository/producto.repository");
const update_product_orchestrator_usecase_1 = require("../application/update-product-orchestrator.usecase");
const create_product_orchestrator_usecase_1 = require("../application/create-product-orchestrator.usecase");
const process_repository_1 = __importDefault(require("@modules/core/process/infrastructure/repository/process.repository"));
const input_repository_1 = require("@modules/core/input/infrastructure/repository/input.repository");
const local_file_cleanup_service_1 = require("@shared/files/local-file-cleanup.service");
class ProductOrchestratorController {
    createProductOrchestrator;
    updateProductOrchestrator;
    productInputProcessRepo;
    productDiscountRepo;
    productProcessRepo;
    productQueryRepo;
    productInputRepo;
    fileCleaner;
    processRepo;
    inputRepo;
    repo;
    constructor() {
        this.repo = new producto_repository_1.ProductRepository();
        this.fileCleaner = new local_file_cleanup_service_1.LocalFileCleanupService();
        this.inputRepo = new input_repository_1.InputRepository();
        this.processRepo = new process_repository_1.default();
        this.productProcessRepo = new product_process_repository_1.ProductProcessRepository();
        this.productInputRepo = new product_input_repository_1.ProductInputRepository();
        this.productDiscountRepo = new product_discount_range_repository_1.ProductDiscountRangeRepository();
        this.productInputProcessRepo = new product_input_process_repository_1.ProductInputProcessRepository();
        this.productQueryRepo = new product_query_repository_1.ProductQueryRepository();
        this.updateProductOrchestrator = new update_product_orchestrator_usecase_1.UpdateProductOrchestratorUseCase({
            processRepo: this.processRepo,
            inputRepo: this.inputRepo,
            productRepo: this.repo,
            productProcessRepo: this.productProcessRepo,
            productInputRepo: this.productInputRepo,
            discountRangeRepo: this.productDiscountRepo,
            productInputProcessRepo: this.productInputProcessRepo,
            fileCleanup: this.fileCleaner,
            productQuery: this.productQueryRepo
        });
        this.createProductOrchestrator = new create_product_orchestrator_usecase_1.CreateProductOrchestratorUseCase({
            processRepo: this.processRepo,
            inputRepo: this.inputRepo,
            productRepo: this.repo,
            productProcessRepo: this.productProcessRepo,
            productInputRepo: this.productInputRepo,
            discountRangeRepo: this.productDiscountRepo,
            productInputProcessRepo: this.productInputProcessRepo,
            fileCleanup: this.fileCleaner,
            productQuery: this.productQueryRepo
        });
    }
    ;
    create = async (req, res) => {
        const { payload, photo } = req.body;
        const updatePayload = {
            ...payload,
            product: {
                ...payload.product,
                ...(photo ? {
                    photo: photo ?? null
                } : {})
            },
        };
        const result = await this.createProductOrchestrator.execute(updatePayload);
        return res.status(201).send(result);
    };
    update = async (req, res) => {
        const { payload, photo } = req.body;
        const { id } = req.params;
        const updatePayload = {
            ...payload,
            product: {
                ...payload.product,
                ...(photo ? {
                    photo: photo ?? null
                } : {})
            },
        };
        const result = await this.updateProductOrchestrator.execute(Number(id), updatePayload);
        return res.status(201).send(result);
    };
}
exports.ProductOrchestratorController = ProductOrchestratorController;
;
