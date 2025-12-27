"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductOrchestratorUseCase = void 0;
const create_product_discount_range_usecase_1 = require("../../../../features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase");
const get_product_input_by_id_product_input_usecase_1 = require("../../assigments/product-input/application/use-cases/get-product-input-by-id-product-input.usecase");
const create_product_process_usecase_1 = require("../../../../features/products/assigments/product-process/application/use-cases/create-product-process.usecase");
const create_product_input_process_usecase_1 = require("../../assigments/product-input-process/application/use-cases/create-product-input-process.usecase");
const get_by_id_product_query_orchestrator_usecase_1 = require("../../../../query/product/application/usecase/get-by-id-product-query-orchestrator.usecase");
const create_product_input_usecase_1 = require("../../../../features/products/assigments/product-input/application/use-cases/create-product-input.usecase");
const create_product_usecase_1 = require("../../../../core/product/application/use-cases/create-product.usecase");
const create_process_usecase_1 = require("../../../../core/process/application/use-cases/create-process.usecase");
const sequelize_1 = require("../../../../../config/mysql/sequelize");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
const sequelize_2 = require("sequelize");
class CreateProductOrchestratorUseCase {
    // * CASOS DE USO PARA PRODUCTO
    createProductUseCase;
    getProductOrchestrator;
    // * CASOS DE USO PARA PROCESS
    createProcessUseCase;
    // * CASOS DE USO PARA PRODUCTO-INPUT
    getProductInputByProductInputUseCase;
    createProductInputUseCase;
    // * CASOS DE USO PARA PRODUCT-PROCESS
    createProductProcessUseCase;
    // * CASOS DE USO DE PRODUCT-DISCOUNT-RANGE
    createProductDiscountRangeUseCase;
    // * CASOS DE USO PARA PRODUCTO-INPUT-PROCESS
    createProductInputProcessUseCase;
    // * MANEJO DE IMAGENES
    fileCleanup;
    constructor({ productRepo, discountRangeRepo, productInputRepo, productProcessRepo, inputRepo, processRepo, productInputProcessRepo, fileCleanup, productQuery }) {
        // * CASOS DE USO PARA PRODUCTO
        this.createProductUseCase = new create_product_usecase_1.CreateProductUseCase(productRepo);
        this.getProductOrchestrator = new get_by_id_product_query_orchestrator_usecase_1.GetByIdProductsQueryOrchestratorUseCase(productQuery);
        // * CASOS DE USO PARA PROCESS
        this.createProcessUseCase = new create_process_usecase_1.CreateProcessUseCase(processRepo);
        // * CASOS DE USO PARA PRODUCTO-INPUT
        this.getProductInputByProductInputUseCase = new get_product_input_by_id_product_input_usecase_1.GetProductInputByIdProductInputUseCase(productInputRepo);
        this.createProductInputUseCase = new create_product_input_usecase_1.CreateProductInputUseCase(productInputRepo, productRepo, inputRepo);
        // * CASOS DE USO PARA PRODUCT-PROCESS
        this.createProductProcessUseCase = new create_product_process_usecase_1.CreateProductProcessUseCase(productProcessRepo, productRepo, processRepo);
        // * CASOS DE USO DE PRODUCT-DISCOUNT-RANGE
        this.createProductDiscountRangeUseCase = new create_product_discount_range_usecase_1.CreateProductDiscountRangeUseCase(discountRangeRepo, productRepo);
        // * CASOS DE USO PARA PRODUCTO-INPUT-PROCESS
        this.createProductInputProcessUseCase = new create_product_input_process_usecase_1.CreateProductInputProcessUseCase(productInputProcessRepo, productRepo, productInputRepo, productProcessRepo);
        // * MANEJO DE IMAGENES
        this.fileCleanup = fileCleanup;
    }
    ;
    async execute(data) {
        const tx = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
        });
        let createdProductId = null;
        try {
            // --------------------------------------------------
            // |🔹 DESTRUCTATION                                |
            // --------------------------------------------------
            const { product, product_discount_ranges, product_processes, products_inputs } = data;
            const safeProductsInputs = products_inputs ?? [];
            const safeProductProcesses = product_processes ?? [];
            const safeProductDiscountRanges = product_discount_ranges ?? [];
            // --------------------------------------------------
            // |🔹 PRODUCT                                      |
            // --------------------------------------------------
            const productCreateResponse = await this.createProductUseCase.execute(product, tx);
            createdProductId = productCreateResponse.id;
            // --------------------------------------------------
            // |🔹 PRODUCT-INPUT                                |
            // --------------------------------------------------
            for (const pi of safeProductsInputs) {
                await this.createProductInputUseCase.execute({
                    input_id: pi.input_id,
                    equivalence: pi.equivalence,
                    product_id: productCreateResponse.id,
                }, tx);
            }
            ;
            // --------------------------------------------------
            // |🔹 PRODUCT-PROCESS                              |
            // --------------------------------------------------
            const productProcessForAssign = safeProductProcesses.filter((pp) => ("process_id" in pp) && typeof pp.process_id === "number");
            const productProcessForCreate = safeProductProcesses.filter((pp) => !("process_id" in pp && typeof pp.process_id === "number") && ("process" in pp));
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // |🔸 ASIGNAR PROCESO EXISTENTE                    |
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            for (const pp of productProcessForAssign) {
                const { product_input_process, process, product: _p, ...ppFlat } = pp;
                const productProcessCreateResponse = await this.createProductProcessUseCase.execute({
                    ...ppFlat,
                    product_id: productCreateResponse.id,
                }, tx);
                if (product_input_process?.length) {
                    for (const pip of product_input_process) {
                        const productInputResponse = await this.getProductInputByProductInputUseCase.execute(productCreateResponse.id, pip.product_input.input_id, tx);
                        if (!productInputResponse)
                            throw new http_error_1.default(404, `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productCreateResponse.id}.`);
                        await this.createProductInputProcessUseCase.execute({
                            qty: pip.qty,
                            product_input_id: productInputResponse.id,
                            product_process_id: productProcessCreateResponse.id,
                            product_id: productCreateResponse.id,
                        }, tx);
                    }
                }
            }
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            // |🔸 CREAR UN NUEVO PROCESO                       |
            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            for (const pp of productProcessForCreate) {
                const { product_input_process, process, sort_order } = pp;
                const processCreateResponse = await this.createProcessUseCase.execute(process, tx);
                const productProcessCreateResponse = await this.createProductProcessUseCase.execute({
                    process_id: processCreateResponse.id,
                    product_id: productCreateResponse.id,
                    sort_order,
                }, tx);
                if (product_input_process?.length) {
                    for (const pip of product_input_process) {
                        const productInputResponse = await this.getProductInputByProductInputUseCase.execute(productCreateResponse.id, pip.product_input.input_id, tx);
                        if (!productInputResponse)
                            throw new http_error_1.default(404, `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productCreateResponse.id}.`);
                        await this.createProductInputProcessUseCase.execute({
                            qty: pip.qty,
                            product_input_id: productInputResponse.id,
                            product_process_id: productProcessCreateResponse.id,
                            product_id: productCreateResponse.id,
                        }, tx);
                    }
                }
            }
            // --------------------------------------------------
            // |🔹 PRODUCT-DISCOUNT-RANGE                       |
            // --------------------------------------------------
            for (const pdr of safeProductDiscountRanges) {
                await this.createProductDiscountRangeUseCase.execute({
                    ...pdr,
                    product_id: productCreateResponse.id,
                }, tx);
            }
            // --------------------------------------------------
            // |🔹 COMMIT + RESPONSE                            |
            // --------------------------------------------------
            const productOrchestrator = await this.getProductOrchestrator.execute(productCreateResponse.id, tx);
            if (!productOrchestrator)
                throw new http_error_1.default(500, "No se pudo acceder al producto despues de haber sido creado.");
            await tx.commit();
            return productOrchestrator;
        }
        catch (error) {
            await tx.rollback();
            try {
                if (createdProductId !== null) {
                    this.fileCleanup.scheduleCleanup(`products/${createdProductId}`);
                }
            }
            catch (cleanupErr) {
                console.error("Cleanup scheduling failed:", cleanupErr);
            }
            throw error;
        }
    }
}
exports.CreateProductOrchestratorUseCase = CreateProductOrchestratorUseCase;
;
