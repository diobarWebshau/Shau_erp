import { CreateProductDiscountRangeUseCase } from "@modules/features/products/assigments/product-discounts-ranges/application/use-cases/create-product-discount-range.usecase";
import { ProductDiscountRangeCreateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import { CreateProductProcessUseCase } from "@modules/features/products/assigments/product-process/application/use-cases/create-product-process.usecase";
import { CreateProductInputUseCase } from "@modules/features/products/assigments/product-input/application/use-cases/create-product-input.usecase";
import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { ProductProcessCreateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
import { ProductInputCreateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
import { ProductOrchestratorCreate, ProductOrchestratorResponse } from "../domain/product-orchestrator.types";
import { CreateProductUseCase } from "@modules/core/product/application/use-cases/create-product.usecase";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IProductQueryRepository } from "../../query/domain/product-query.repository";
import { ProductProps } from "@modules/core/product/domain/product.types";

interface CreateProductOrchestratorUseCaseProps {
    productRepo: IProductRepository,
    productProcessRepo: IProductProcessRepository,
    productInputRepo: IProductInputRepository,
    discountRangeRepo: IProductDiscountRangeRepository,
    productQueryRepo: IProductQueryRepository
}

export class CreateProductOrchestratorUseCase {

    private createProductUseCase: CreateProductUseCase;
    private createProductInputUseCase: CreateProductInputUseCase;
    private createProductProcessUseCase: CreateProductProcessUseCase;
    private createProductDiscountRangeUseCase: CreateProductDiscountRangeUseCase;

    constructor({ productRepo, discountRangeRepo, productInputRepo, productProcessRepo }: CreateProductOrchestratorUseCaseProps) {
        this.createProductUseCase = new CreateProductUseCase(productRepo);
        this.createProductInputUseCase = new CreateProductInputUseCase(productInputRepo);
        this.createProductProcessUseCase = new CreateProductProcessUseCase(productProcessRepo);
        this.createProductDiscountRangeUseCase = new CreateProductDiscountRangeUseCase(discountRangeRepo);
    };

    async execute(data: ProductOrchestratorCreate): Promise<ProductOrchestratorResponse> {
        const { product, product_discount_ranges, product_processes, products_inputs } = data;
        const productCreateResponse: ProductProps = await this.createProductUseCase.execute(product);
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
        const productProcessCreates: ProductProcessCreateProps[] = product_processes.map((pp) => ({
            ...pp,
            product_id: productCreateResponse.id
        }));
        const productProcessResponses: ProductProcessProps[] = [];
        for (const productProcess of productProcessCreates) {
            const productProcessResponse: ProductProcessProps = await this.createProductProcessUseCase.execute(productProcess);
            productProcessResponses.push(productProcessResponse);
        };
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