import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
import { ProductOrchestratorCreate, ProductOrchestratorResponse } from "../domain/product-orchestrator.types";
import { IProductRepository } from "../../../../core/product/domain/product.repository.interface";
import { IInputRepository } from "../../../../core/input/domain/input.repository.interface";
import { IProcessRepository } from "../../../../core/process/domain/process.repository";
import { IProductInputProcessRepository } from "../../assigments/product-input-process/domain/product-input-process.repository.interface";
interface CreateProductOrchestratorUseCaseProps {
    productRepo: IProductRepository;
    inputRepo: IInputRepository;
    productProcessRepo: IProductProcessRepository;
    productInputRepo: IProductInputRepository;
    discountRangeRepo: IProductDiscountRangeRepository;
    processRepo: IProcessRepository;
    productInputProcessRepo: IProductInputProcessRepository;
}
export declare class CreateProductOrchestratorUseCase {
    private createProductUseCase;
    private createProductInputUseCase;
    private getProductInputByIdProductInput;
    private createProductProcessUseCase;
    private createProductDiscountRangeUseCase;
    private createProductInputProcessUseCase;
    private createProcess;
    constructor({ productRepo, discountRangeRepo, productInputRepo, productProcessRepo, inputRepo, processRepo, productInputProcessRepo }: CreateProductOrchestratorUseCaseProps);
    execute(data: ProductOrchestratorCreate): Promise<ProductOrchestratorResponse>;
}
export {};
