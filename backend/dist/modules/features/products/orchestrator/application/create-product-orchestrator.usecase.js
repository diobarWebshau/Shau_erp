"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductOrchestratorUseCase = void 0;
const create_product_discount_range_usecase_1 = require("../../../../features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase");
const create_product_process_usecase_1 = require("../../../../features/products/assigments/product-process/application/use-cases/create-product-process.usecase");
const create_product_input_usecase_1 = require("../../../../features/products/assigments/product-input/application/use-cases/create-product-input.usecase");
const create_product_usecase_1 = require("../../../../core/product/application/use-cases/create-product.usecase");
const create_process_usecase_1 = require("../../../../core/process/application/use-cases/create-process.usecase");
class CreateProductOrchestratorUseCase {
    createProductUseCase;
    createProductInputUseCase;
    createProductProcessUseCase;
    createProductDiscountRangeUseCase;
    createProcess;
    constructor({ productRepo, discountRangeRepo, productInputRepo, productProcessRepo, inputRepo, processRepo }) {
        this.createProductUseCase = new create_product_usecase_1.CreateProductUseCase(productRepo);
        this.createProductInputUseCase = new create_product_input_usecase_1.CreateProductInputUseCase(productInputRepo, productRepo, inputRepo);
        this.createProductProcessUseCase = new create_product_process_usecase_1.CreateProductProcessUseCase(productProcessRepo, productRepo, processRepo);
        this.createProductDiscountRangeUseCase = new create_product_discount_range_usecase_1.CreateProductDiscountRangeUseCase(discountRangeRepo, productRepo);
        this.createProcess = new create_process_usecase_1.CreateProcessUseCase(processRepo);
    }
    ;
    async execute(data) {
        // ? CREATE PRODUCT-PROCESS 
        const { product, product_discount_ranges, product_processes, products_inputs } = data;
        const productCreateResponse = await this.createProductUseCase.execute(product);
        // *************** ProductInputs ***************
        const productInputCreates = products_inputs.map((pi) => ({
            ...pi,
            product_id: productCreateResponse.id,
            product: productCreateResponse
        }));
        const productInputResponses = [];
        for (const productInput of productInputCreates) {
            const productInputResponse = await this.createProductInputUseCase.execute(productInput);
            productInputResponses.push(productInputResponse);
        }
        ;
        // *************** ProductProcess ***************
        const productProcessForAssign = product_processes.filter(pp => pp.process_id !== undefined);
        const productProcessForCreate = product_processes.filter(pp => pp.process_id === undefined);
        const productProcessForAssignAux = productProcessForAssign.map((pp) => ({
            ...pp,
            product_id: productCreateResponse.id
        }));
        const productProcessForCreateAux = productProcessForCreate.map((pp) => ({
            ...pp,
            product_id: productCreateResponse.id
        }));
        const productProcessResponses = [];
        for (const productProcess of productProcessForAssignAux) {
            const productProcessResponse = await this.createProductProcessUseCase.execute(productProcess);
            productProcessResponses.push(productProcessResponse);
        }
        ;
        for (const productProcess of productProcessForCreateAux) {
            const createProcess = {
                name: productProcess.product?.name ?? "",
                description: productProcess.process?.name,
            };
            const processCreateResponse = await this.createProcess.execute(createProcess);
            const createProductProcess = {
                process_id: processCreateResponse.id,
                product_id: productProcess.product_id,
                sort_order: productProcess.sort_order
            };
            const productProcessCreateResponse = await this.createProductProcessUseCase.execute(createProductProcess);
            productProcessResponses.push(productProcessCreateResponse);
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
