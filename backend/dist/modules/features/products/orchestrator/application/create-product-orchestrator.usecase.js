"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductOrchestratorUseCase = void 0;
const create_product_discount_range_usecase_1 = require("../../../../features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase");
const create_product_process_usecase_1 = require("../../../../features/products/assigments/product-process/application/use-cases/create-product-process.usecase");
const create_product_input_usecase_1 = require("../../../../features/products/assigments/product-input/application/use-cases/create-product-input.usecase");
const create_product_usecase_1 = require("../../../../core/product/application/use-cases/create-product.usecase");
const create_process_usecase_1 = require("../../../../core/process/application/use-cases/create-process.usecase");
const create_product_input_process_usecase_1 = require("../../assigments/product-input-process/application/use-cases/create-product-input-process.usecase");
const get_product_input_by_id_product_input_usecase_1 = require("../../assigments/product-input/application/use-cases/get-product-input-by-id-product-input.usecase");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
class CreateProductOrchestratorUseCase {
    createProductUseCase;
    createProductInputUseCase;
    getProductInputByIdProductInput;
    createProductProcessUseCase;
    createProductDiscountRangeUseCase;
    createProductInputProcessUseCase;
    createProcess;
    constructor({ productRepo, discountRangeRepo, productInputRepo, productProcessRepo, inputRepo, processRepo, productInputProcessRepo }) {
        this.createProductUseCase = new create_product_usecase_1.CreateProductUseCase(productRepo);
        this.createProductInputUseCase = new create_product_input_usecase_1.CreateProductInputUseCase(productInputRepo, productRepo, inputRepo);
        this.createProductProcessUseCase = new create_product_process_usecase_1.CreateProductProcessUseCase(productProcessRepo, productRepo, processRepo);
        this.getProductInputByIdProductInput = new get_product_input_by_id_product_input_usecase_1.GetProductInputByIdProductInputUseCase(productInputRepo);
        this.createProductDiscountRangeUseCase = new create_product_discount_range_usecase_1.CreateProductDiscountRangeUseCase(discountRangeRepo, productRepo);
        this.createProcess = new create_process_usecase_1.CreateProcessUseCase(processRepo);
        this.createProductInputProcessUseCase = new create_product_input_process_usecase_1.CreateProductInputProcessUseCase(productInputProcessRepo, productRepo, productInputRepo, productProcessRepo);
    }
    ;
    async execute(data) {
        // ? CREATE PRODUCT-PROCESS 
        const { product, product_discount_ranges, product_processes, products_inputs } = data;
        const productCreateResponse = await this.createProductUseCase.execute(product);
        // *************** ProductInputs ***************
        const productInputCreates = products_inputs.map((pi) => ({
            input_id: pi.input_id,
            equivalence: pi.equivalence,
            product_id: productCreateResponse.id,
        }));
        const productInputResponses = [];
        for (const productInput of productInputCreates) {
            const productInputResponse = await this.createProductInputUseCase.execute(productInput);
            productInputResponses.push(productInputResponse);
        }
        ;
        // *************** ProductProcess ***************
        const isAssignExisting = (pp) => "process_id" in pp && typeof pp.process_id === "number";
        const isCreateNew = (pp) => !("process_id" in pp) && "process" in pp;
        const productProcessForAssign = product_processes.filter(isAssignExisting);
        const productProcessForCreate = product_processes.filter(isCreateNew);
        const productProcessResponses = [];
        for (const productProcess of productProcessForAssign) {
            const { product_input_process, process, product, ...ppFlat } = productProcess;
            const createProductProcess = {
                ...ppFlat,
                product_id: productCreateResponse.id,
            };
            const productProcessResponse = await this.createProductProcessUseCase.execute(createProductProcess);
            const productInputProcessArray = [];
            if (product_input_process && product_input_process.length) {
                for (const pip of productProcess.product_input_process) {
                    const getProductInput = await this.getProductInputByIdProductInput.execute(productCreateResponse.id, pip.product_input.input_id);
                    if (!getProductInput) {
                        throw new http_error_1.default(404, `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productCreateResponse.id}.`);
                    }
                    ;
                    const createPip = {
                        qty: pip.qty,
                        product_input_id: getProductInput.id,
                        product_process_id: productProcessResponse.id,
                        product_id: productCreateResponse.id,
                    };
                    const productInputProcessResponse = await this.createProductInputProcessUseCase.execute(createPip);
                    productInputProcessArray.push(productInputProcessResponse);
                }
                ;
            }
            const productProcessWithRelationship = {
                ...productProcessResponse,
                product_input_process: productInputProcessArray
            };
            productProcessResponses.push(productProcessWithRelationship);
        }
        for (const productProcess of productProcessForCreate) {
            const { product_input_process, process, sort_order } = productProcess;
            const processCreateResponse = await this.createProcess.execute(process);
            const createProductProcess = {
                process_id: processCreateResponse.id,
                product_id: productCreateResponse.id,
                sort_order: sort_order
            };
            const productProcessCreateResponse = await this.createProductProcessUseCase.execute(createProductProcess);
            const productInputProcessArray = [];
            if (product_input_process && product_input_process?.length) {
                for (const pip of productProcess.product_input_process) {
                    const getProductInput = await this.getProductInputByIdProductInput.execute(productCreateResponse.id, pip.product_input.input_id);
                    if (!getProductInput) {
                        throw new http_error_1.default(404, `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productCreateResponse.id}.`);
                    }
                    ;
                    const createPip = {
                        qty: pip.qty,
                        product_input_id: getProductInput.id,
                        product_process_id: productProcessCreateResponse.id,
                        product_id: productCreateResponse.id,
                    };
                    const productInputProcessResponse = await this.createProductInputProcessUseCase.execute(createPip);
                    productInputProcessArray.push(productInputProcessResponse);
                }
                ;
            }
            const productProcessWithRelationship = {
                ...productProcessCreateResponse,
                product_input_process: productInputProcessArray
            };
            productProcessResponses.push(productProcessWithRelationship);
        }
        ;
        // *************** ProductDiscountRange ***************
        const productDiscountRangeCreates = product_discount_ranges.map((pdr) => ({
            ...pdr,
            product_id: productCreateResponse.id
        }));
        const productDiscountRangeResponses = [];
        for (const productDiscount of productDiscountRangeCreates) {
            const productDiscountResponse = await this.createProductDiscountRangeUseCase.execute(productDiscount);
            productDiscountRangeResponses.push(productDiscountResponse);
        }
        ;
        // *************** Response ***************
        const productResponse = {
            product: {
                ...productCreateResponse,
                created_at: productCreateResponse.created_at.toISOString(),
                updated_at: productCreateResponse.updated_at.toISOString()
            },
            products_inputs: productInputResponses,
            product_processes: productProcessResponses,
            product_discount_ranges: productDiscountRangeResponses.map((pdr) => ({
                ...pdr,
                created_at: pdr.created_at.toISOString(),
                updated_at: pdr.updated_at.toISOString()
            }))
        };
        return productResponse;
    }
}
exports.CreateProductOrchestratorUseCase = CreateProductOrchestratorUseCase;
;
