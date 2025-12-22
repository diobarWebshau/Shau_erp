import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
import { ProductOrchestratorCreate, ProductOrchestratorResponse } from "../domain/product-orchestrator.types";
import { IProductRepository } from "../../../../core/product/domain/product.repository.interface";
import { IProductQueryRepository } from "../../query/domain/product-query.repository";
import { IInputRepository } from "../../../../core/input/domain/input.repository.interface";
import { IProcessRepository } from "../../../../core/process/domain/process.repository";
interface CreateProductOrchestratorUseCaseProps {
    productRepo: IProductRepository;
    inputRepo: IInputRepository;
    productProcessRepo: IProductProcessRepository;
    productInputRepo: IProductInputRepository;
    discountRangeRepo: IProductDiscountRangeRepository;
    productQueryRepo: IProductQueryRepository;
    processRepo: IProcessRepository;
}
export declare class CreateProductOrchestratorUseCase {
    private createProductUseCase;
    private createProductInputUseCase;
    private createProductProcessUseCase;
    private createProductDiscountRangeUseCase;
    private createProcess;
    constructor({ productRepo, discountRangeRepo, productInputRepo, productProcessRepo, inputRepo, processRepo }: CreateProductOrchestratorUseCaseProps);
    execute(data: ProductOrchestratorCreate): Promise<ProductOrchestratorResponse>;
}
export {};
