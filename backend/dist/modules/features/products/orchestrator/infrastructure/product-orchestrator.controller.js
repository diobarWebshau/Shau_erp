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
const input_repository_1 = require("../../../../../modules/core/input/infrastructure/repository/input.repository");
const create_product_orchestrator_usecase_1 = require("../application/create-product-orchestrator.usecase");
class ProductOrchestratorController {
    repo;
    processRepo;
    inputRepo;
    productProcessRepo;
    productInputRepo;
    productDiscountRepo;
    productInputProcessRepo;
    createProductOrchestrator;
    constructor() {
        this.repo = new producto_repository_1.ProductRepository();
        this.inputRepo = new input_repository_1.InputRepository();
        this.processRepo = new process_repository_1.default();
        this.productProcessRepo = new product_process_repository_1.ProductProcessRepository();
        this.productInputRepo = new product_input_repository_1.ProductInputRepository();
        this.productDiscountRepo = new product_discount_range_repository_1.ProductDiscountRangeRepository();
        this.productInputProcessRepo = new product_input_process_repository_1.ProductInputProcessRepository();
        this.createProductOrchestrator = new create_product_orchestrator_usecase_1.CreateProductOrchestratorUseCase({
            processRepo: this.processRepo,
            inputRepo: this.inputRepo,
            productRepo: this.repo,
            productProcessRepo: this.productProcessRepo,
            productInputRepo: this.productInputRepo,
            discountRangeRepo: this.productDiscountRepo,
            productInputProcessRepo: this.productInputProcessRepo,
        });
    }
    ;
    create = async (req, res) => {
        const body = req.body;
        const result = await this.createProductOrchestrator.execute(body);
        return res.status(201).send(result);
    };
}
exports.ProductOrchestratorController = ProductOrchestratorController;
;
