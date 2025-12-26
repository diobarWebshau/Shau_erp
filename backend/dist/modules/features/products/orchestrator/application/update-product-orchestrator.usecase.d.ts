import { ProductOrchestrator } from "../domain/product-orchestrator.types";
import { IProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IProductInputProcessRepository } from "../../assigments/product-input-process/domain/product-input-process.repository.interface";
import { IProductProcessRepository } from "../../assigments/product-process/domain/product-process.repository.interface";
import { IProductInputRepository } from "../../assigments/product-input/domain/product-input.repository.interface";
import { IProductRepository } from "../../../../core/product/domain/product.repository.interface";
import { IInputRepository } from "../../../../core/input/domain/input.repository.interface";
import { IProcessRepository } from "../../../../core/process/domain/process.repository";
import { IProductQueryRepository } from "../../query/domain/product-query.repository";
import { ProductOrchestratorUpdateDTO } from "./product-orchestrator.model.schema";
import { IFileCleanupPort } from "../../../../../shared/files/file-cleanup.port";
interface UpdateProductOrchestratorUseCaseProps {
    productRepo: IProductRepository;
    processRepo: IProcessRepository;
    inputRepo: IInputRepository;
    productProcessRepo: IProductProcessRepository;
    productInputRepo: IProductInputRepository;
    discountRangeRepo: IProductDiscountRangeRepository;
    productInputProcessRepo: IProductInputProcessRepository;
    fileCleanup: IFileCleanupPort;
    productQuery: IProductQueryRepository;
}
export declare class UpdateProductOrchestratorUseCase {
    private readonly productRepo;
    private readonly updateProductUseCase;
    private readonly createProcessUseCase;
    private readonly getProductOrchestrator;
    private readonly getProductInputByProductInputUseCase;
    private readonly createProductInputUseCase;
    private readonly deleteProductInputUseCase;
    private readonly updateProductInputUseCase;
    private readonly createProductProcessUseCase;
    private readonly deleteProductProcessUseCase;
    private readonly updateProductProcessUseCase;
    private readonly createProductInputProcess;
    private readonly updateProductInputProcess;
    private readonly deleteProductInputProcess;
    private readonly createProductDiscountRangeUseCase;
    private readonly deleteProductDiscountRangeUseCase;
    private readonly updateProductDiscountRangeUseCase;
    private readonly fileCleanup;
    constructor({ productInputRepo, discountRangeRepo, productProcessRepo, productRepo, processRepo, inputRepo, productInputProcessRepo, fileCleanup, productQuery }: UpdateProductOrchestratorUseCaseProps);
    execute(productId: number, data: ProductOrchestratorUpdateDTO): Promise<ProductOrchestrator>;
}
export {};
