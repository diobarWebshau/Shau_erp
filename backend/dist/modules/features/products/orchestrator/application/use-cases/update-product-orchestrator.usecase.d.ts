import { IProductDiscountRangeRepository } from "../../../assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IProductInputProcessRepository } from "../../../assigments/product-input-process/domain/product-input-process.repository.interface";
import { IProductProcessRepository } from "../../../assigments/product-process/domain/product-process.repository.interface";
import { IProductInputRepository } from "../../../assigments/product-input/domain/product-input.repository.interface";
import { IProductQueryRepository } from "@modules/query/product/domain/product-query.repository";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IInputRepository } from "@modules/core/input/domain/input.repository.interface";
import { ProductOrchestratorUpdateDto } from "../dto/product-orchestrator.model.schema";
import { IProcessRepository } from "@modules/core/process/domain/process.repository";
import { ProductOrchestrator } from "../../domain/product-orchestrator.types";
import { IFileCleanupPort } from "@shared/files/file-cleanup.port";
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
    execute(productId: number, data: ProductOrchestratorUpdateDto): Promise<ProductOrchestrator>;
}
export {};
