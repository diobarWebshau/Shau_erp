import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IProductInputProcessRepository } from "../../assigments/product-input-process/domain/product-input-process.repository.interface";
import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
import { IProductRepository } from "../../../../core/product/domain/product.repository.interface";
import { IInputRepository } from "../../../../core/input/domain/input.repository.interface";
import { IProductQueryRepository } from "../../query/domain/product-query.repository";
import { IProcessRepository } from "../../../../core/process/domain/process.repository";
import { IFileCleanupPort } from "../../../../../shared/files/file-cleanup.port";
import { ProductOrchestratorCreate, ProductOrchestrator } from "../domain/product-orchestrator.types";
interface CreateProductOrchestratorUseCaseProps {
    productRepo: IProductRepository;
    inputRepo: IInputRepository;
    productProcessRepo: IProductProcessRepository;
    productInputRepo: IProductInputRepository;
    discountRangeRepo: IProductDiscountRangeRepository;
    processRepo: IProcessRepository;
    productInputProcessRepo: IProductInputProcessRepository;
    fileCleanup: IFileCleanupPort;
    productQuery: IProductQueryRepository;
}
export declare class CreateProductOrchestratorUseCase {
    private readonly createProductUseCase;
    private readonly getProductOrchestrator;
    private readonly createProcessUseCase;
    private readonly getProductInputByProductInputUseCase;
    private readonly createProductInputUseCase;
    private readonly createProductProcessUseCase;
    private readonly createProductDiscountRangeUseCase;
    private readonly createProductInputProcessUseCase;
    private readonly fileCleanup;
    constructor({ productRepo, discountRangeRepo, productInputRepo, productProcessRepo, inputRepo, processRepo, productInputProcessRepo, fileCleanup, productQuery }: CreateProductOrchestratorUseCaseProps);
    execute(data: ProductOrchestratorCreate): Promise<ProductOrchestrator>;
}
export {};
