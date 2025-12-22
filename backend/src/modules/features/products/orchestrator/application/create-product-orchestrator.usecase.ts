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
    ProductProcessOrchestratorForAsign, ProductProcessOrchestratorForCreate
} from "../domain/product-orchestrator.types";
import { CreateProductUseCase } from "@modules/core/product/application/use-cases/create-product.usecase";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IProductQueryRepository } from "../../query/domain/product-query.repository";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { IProcessRepository } from "@modules/core/process/domain/process.repository";
import { CreateProcessUseCase } from "@modules/core/process/application/use-cases/create-process.usecase";
import { ProcessCreateProps, ProcessProps } from "@modules/core/process/domain/process.types";

interface CreateProductOrchestratorUseCaseProps {
    productRepo: IProductRepository,
    inputRepo: IInputRepository,
    productProcessRepo: IProductProcessRepository,
    productInputRepo: IProductInputRepository,
    discountRangeRepo: IProductDiscountRangeRepository,
    productQueryRepo: IProductQueryRepository,
    processRepo: IProcessRepository
}

export class CreateProductOrchestratorUseCase {

    private createProductUseCase: CreateProductUseCase;
    private createProductInputUseCase: CreateProductInputUseCase;
    private createProductProcessUseCase: CreateProductProcessUseCase;
    private createProductDiscountRangeUseCase: CreateProductDiscountRangeUseCase;
    private createProcess: CreateProcessUseCase;

    constructor({ productRepo, discountRangeRepo, productInputRepo, productProcessRepo, inputRepo, processRepo }: CreateProductOrchestratorUseCaseProps) {
        this.createProductUseCase = new CreateProductUseCase(productRepo);
        this.createProductInputUseCase = new CreateProductInputUseCase(productInputRepo, productRepo, inputRepo);
        this.createProductProcessUseCase = new CreateProductProcessUseCase(productProcessRepo, productRepo, processRepo);
        this.createProductDiscountRangeUseCase = new CreateProductDiscountRangeUseCase(discountRangeRepo, productRepo);
        this.createProcess = new CreateProcessUseCase(processRepo);
    };

    async execute(data: ProductOrchestratorCreate): Promise<ProductOrchestratorResponse> {
        // ? CREATE PRODUCT-PROCESS 
        const { product, product_discount_ranges, product_processes, products_inputs } = data;
        const productCreateResponse: ProductProps = await this.createProductUseCase.execute(product);


        // *************** ProductInputs ***************

        const productInputCreates: ProductInputCreateProps[] = products_inputs.map((pi) => ({
            ...pi,
            product_id: productCreateResponse.id,
            product: productCreateResponse
        }));
        const productInputResponses: ProductInputProps[] = [];
        for (const productInput of productInputCreates) {
            const productInputResponse: ProductInputProps = await this.createProductInputUseCase.execute(productInput);
            productInputResponses.push(productInputResponse);
        };

        // *************** ProductProcess ***************

        const productProcessForAssign: ProductProcessOrchestratorForAsign[] = product_processes.filter(pp => pp.process_id !== undefined);
        const productProcessForCreate: ProductProcessOrchestratorForCreate[] = product_processes.filter(pp => pp.process_id === undefined);
        const productProcessForAssignAux: ProductProcessOrchestratorForAsign[] = productProcessForAssign.map((pp) => ({
            ...pp,
            product_id: productCreateResponse.id
        }));
        const productProcessForCreateAux: ProductProcessOrchestratorForCreate[] = productProcessForCreate.map((pp) => ({
            ...pp,
            product_id: productCreateResponse.id
        }));

        const productProcessResponses: ProductProcessProps[] = [];
        for (const productProcess of productProcessForAssignAux) {
            const productProcessResponse: ProductProcessProps =
                await this.createProductProcessUseCase.execute(productProcess);
            productProcessResponses.push(productProcessResponse);
        };

        for (const productProcess of productProcessForCreateAux) {
            const createProcess: ProcessCreateProps = {
                name: productProcess.product?.name ?? "",
                description: productProcess.process?.name,
            };
            const processCreateResponse: ProcessProps =
                await this.createProcess.execute(createProcess);
            const createProductProcess: ProductProcessCreateProps = {
                process_id: processCreateResponse.id,
                product_id: productProcess.product_id,
                sort_order: productProcess.sort_order
            }
            const productProcessCreateResponse: ProductProcessProps =
                await this.createProductProcessUseCase.execute(createProductProcess);
            productProcessResponses.push(productProcessCreateResponse);
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