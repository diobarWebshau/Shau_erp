import { CreateProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase";
import { ProductDiscountRangeCreateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import { CreateProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/create-product-process.usecase";
import { CreateProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/create-product-input.usecase";
import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { ProductProcessCreateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
import { ProductInputCreateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
import {
    ProductOrchestratorCreate, ProductOrchestratorResponse,
    ProductProcessAssignExisting, ProductProcessCreateNew,
    ProductProcessCreateOrchestrated,
    ProductProcessOrchestratorBase
} from "../domain/product-orchestrator.types";
import { CreateProductUseCase } from "@modules/core/product/application/use-cases/create-product.usecase";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { IProcessRepository } from "@modules/core/process/domain/process.repository";
import { CreateProcessUseCase } from "@modules/core/process/application/use-cases/create-process.usecase";
import { ProcessProps } from "@modules/core/process/domain/process.types";
import { ProductInputProcessCreateProps, ProductInputProcessProps } from "../../assigments/product-input-process/domain/product-input-process.types";
import { CreateProductInputProcessUseCase } from "../../assigments/product-input-process/application/use-cases/create-product-input-process.usecase";
import { IProductInputProcessRepository } from "../../assigments/product-input-process/domain/product-input-process.repository.interface";
import { GetProductInputByIdProductInputUseCase } from "../../assigments/product-input/application/use-cases/get-product-input-by-id-product-input.usecase";
import HttpError from "@shared/errors/http/http-error";

interface CreateProductOrchestratorUseCaseProps {
    productRepo: IProductRepository,
    inputRepo: IInputRepository,
    productProcessRepo: IProductProcessRepository,
    productInputRepo: IProductInputRepository,
    discountRangeRepo: IProductDiscountRangeRepository,
    processRepo: IProcessRepository,
    productInputProcessRepo: IProductInputProcessRepository
}

export class CreateProductOrchestratorUseCase {

    private createProductUseCase: CreateProductUseCase;

    private createProductInputUseCase: CreateProductInputUseCase;
    private getProductInputByIdProductInput: GetProductInputByIdProductInputUseCase;

    private createProductProcessUseCase: CreateProductProcessUseCase;
    private createProductDiscountRangeUseCase: CreateProductDiscountRangeUseCase;
    private createProductInputProcessUseCase: CreateProductInputProcessUseCase;
    private createProcess: CreateProcessUseCase;

    constructor({ productRepo, discountRangeRepo, productInputRepo, productProcessRepo, inputRepo, processRepo, productInputProcessRepo }: CreateProductOrchestratorUseCaseProps) {
        this.createProductUseCase = new CreateProductUseCase(productRepo);
        this.createProductInputUseCase = new CreateProductInputUseCase(productInputRepo, productRepo, inputRepo);
        this.createProductProcessUseCase = new CreateProductProcessUseCase(productProcessRepo, productRepo, processRepo);
        this.getProductInputByIdProductInput = new GetProductInputByIdProductInputUseCase(productInputRepo);
        this.createProductDiscountRangeUseCase = new CreateProductDiscountRangeUseCase(discountRangeRepo, productRepo);
        this.createProcess = new CreateProcessUseCase(processRepo);
        this.createProductInputProcessUseCase = new CreateProductInputProcessUseCase(productInputProcessRepo, productRepo, productInputRepo, productProcessRepo);
    };

    async execute(data: ProductOrchestratorCreate): Promise<ProductOrchestratorResponse> {
        // ? CREATE PRODUCT-PROCESS 
        const { product, product_discount_ranges, product_processes, products_inputs } = data;
        const productCreateResponse: ProductProps = await this.createProductUseCase.execute(product);


        // *************** ProductInputs ***************

        const productInputCreates: ProductInputCreateProps[] = products_inputs.map((pi) => ({
            input_id: pi.input_id,
            equivalence: pi.equivalence,
            product_id: productCreateResponse.id,
        }));

        const productInputResponses: ProductInputProps[] = [];
        for (const productInput of productInputCreates) {
            const productInputResponse: ProductInputProps = await this.createProductInputUseCase.execute(productInput);
            productInputResponses.push(productInputResponse);
        };

        // *************** ProductProcess ***************

        const isAssignExisting = (pp: ProductProcessCreateOrchestrated): pp is ProductProcessAssignExisting =>
            "process_id" in pp && typeof pp.process_id === "number";

        const isCreateNew = (pp: ProductProcessCreateOrchestrated): pp is ProductProcessCreateNew =>
            !("process_id" in pp) && "process" in pp;

        const productProcessForAssign: ProductProcessAssignExisting[] = product_processes.filter(isAssignExisting);
        const productProcessForCreate: ProductProcessCreateNew[] = product_processes.filter(isCreateNew);
        const productProcessResponses: ProductProcessOrchestratorBase[] = [];
        for (const productProcess of productProcessForAssign) {
            const { product_input_process, process, product, ...ppFlat } = productProcess;

            const createProductProcess: ProductProcessCreateProps = {
                ...ppFlat,
                product_id: productCreateResponse.id,
            };
            const productProcessResponse: ProductProcessProps =
                await this.createProductProcessUseCase.execute(createProductProcess);

            const productInputProcessArray: ProductInputProcessProps[] = [];
            if (product_input_process && product_input_process.length) {
                for (const pip of productProcess.product_input_process) {
                    const getProductInput =
                        await this.getProductInputByIdProductInput.execute(productCreateResponse.id, pip.product_input.input_id);
                    if (!getProductInput) {
                        throw new HttpError(404, `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productCreateResponse.id}.`);
                    };
                    const createPip: ProductInputProcessCreateProps = {
                        qty: pip.qty,
                        product_input_id: getProductInput.id,
                        product_process_id: productProcessResponse.id,
                        product_id: productCreateResponse.id,
                    };
                    const productInputProcessResponse: ProductInputProcessProps = await this.createProductInputProcessUseCase.execute(createPip);
                    productInputProcessArray.push(productInputProcessResponse);
                };
            }
            const productProcessWithRelationship: ProductProcessOrchestratorBase = {
                ...productProcessResponse,
                product_input_process: productInputProcessArray
            };
            productProcessResponses.push(productProcessWithRelationship);
        }

        for (const productProcess of productProcessForCreate) {
            const { product_input_process, process, sort_order } = productProcess;
            const processCreateResponse: ProcessProps =
                await this.createProcess.execute(process);
            const createProductProcess: ProductProcessCreateProps = {
                process_id: processCreateResponse.id,
                product_id: productCreateResponse.id,
                sort_order: sort_order
            };
            const productProcessCreateResponse: ProductProcessProps =
                await this.createProductProcessUseCase.execute(createProductProcess);
            const productInputProcessArray: ProductInputProcessProps[] = [];
            if (product_input_process && product_input_process?.length) {
                for (const pip of productProcess.product_input_process) {
                    const getProductInput =
                        await this.getProductInputByIdProductInput.execute(productCreateResponse.id, pip.product_input.input_id);
                    if (!getProductInput) {
                        throw new HttpError(404, `El insumo con ID ${pip.product_input.input_id} no está asignado al producto con ID ${productCreateResponse.id}.`);
                    };
                    const createPip: ProductInputProcessCreateProps = {
                        qty: pip.qty,
                        product_input_id: getProductInput.id,
                        product_process_id: productProcessCreateResponse.id,
                        product_id: productCreateResponse.id,
                    };
                    const productInputProcessResponse: ProductInputProcessProps = await this.createProductInputProcessUseCase.execute(createPip);
                    productInputProcessArray.push(productInputProcessResponse);
                };
            }
            const productProcessWithRelationship: ProductProcessOrchestratorBase = {
                ...productProcessCreateResponse,
                product_input_process: productInputProcessArray
            };
            productProcessResponses.push(productProcessWithRelationship);
        };

        // *************** ProductDiscountRange ***************

        const productDiscountRangeCreates: ProductDiscountRangeCreateProps[] = product_discount_ranges.map(
            (pdr): ProductDiscountRangeCreateProps => ({
                ...pdr,
                product_id: productCreateResponse.id
            })
        );

        const productDiscountRangeResponses: ProductDiscountRangeProps[] = [];
        for (const productDiscount of productDiscountRangeCreates) {
            const productDiscountResponse: ProductDiscountRangeProps = await this.createProductDiscountRangeUseCase.execute(productDiscount);
            productDiscountRangeResponses.push(productDiscountResponse);
        };

        // *************** Response ***************

        const productResponse: ProductOrchestratorResponse = {
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
        }

        return productResponse;
    }
};