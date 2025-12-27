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
const producto_repository_1 = require("../../../../../modules/core/product/infrastructure/repository/producto.repository");
const process_repository_1 = __importDefault(require("../../../../../modules/core/process/infrastructure/repository/process.repository"));
const update_product_orchestrator_usecase_1 = require("../application/update-product-orchestrator.usecase");
const create_product_orchestrator_usecase_1 = require("../application/create-product-orchestrator.usecase");
const input_repository_1 = require("../../../../../modules/core/input/infrastructure/repository/input.repository");
const product_query_repository_1 = require("../../../../query/product/infrastructure/product-query.repository");
const local_file_cleanup_service_1 = require("../../../../../shared/files/local-file-cleanup.service");
const imageHandlerClass_1 = __importDefault(require("../../../../../helpers/imageHandlerClass"));
class ProductOrchestratorController {
    createProductOrchestrator;
    updateProductOrchestrator;
    productInputProcessRepo;
    productDiscountRepo;
    productProcessRepo;
    productInputRepo;
    fileCleaner;
    processRepo;
    productQueryRepo;
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
    formattResponse = async (response) => {
        return {
            product: {
                ...response.product,
                photo: response.product.photo ? await imageHandlerClass_1.default.convertToBase64(response.product.photo) : null,
                created_at: response.product.created_at.toISOString(),
                updated_at: response.product.updated_at.toISOString(),
            },
            product_discount_ranges: response.product_discount_ranges.map((pdr) => ({
                ...pdr,
                created_at: pdr.created_at.toISOString(),
                updated_at: pdr.updated_at.toISOString(),
            })),
            products_inputs: response.products_inputs,
            product_processes: response.product_processes
        };
    };
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
        const formattResult = await this.formattResponse(result);
        return res.status(201).send(formattResult);
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
        const formattResult = await this.formattResponse(result);
        return res.status(201).send(formattResult);
    };
}
exports.ProductOrchestratorController = ProductOrchestratorController;
;
