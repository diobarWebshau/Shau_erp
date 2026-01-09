import { ProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/infrastructure/repository/product-discount-range.repository";
import { ProductInputProcessRepository } from "../../assigments/product-input-process/infrastructure/repository/product-input-process.repository";
import { CreateProductOrchestratorSchema, UpdateProductOrchestratorSchema } from "../application/dto/product-orchestrator.endpoint.schema";
import { ProductProcessRepository } from "../../assigments/product-process/infrastructure/repository/product-process.repository";
import { ProductInputRepository } from "../../assigments/product-input/infrastructure/repository/product-input.repository";
import { mapProductQueryOrchestratorDomainToDto } from "@modules/query/product/infrastructure/http/produt-query.controller"
import { ProductQueryRepository } from "@modules/query/product/infrastructure/repository/product-query.repository";
import { UpdateProductOrchestratorUseCase } from "../application/use-cases/update-product-orchestrator.usecase";
import { CreateProductOrchestratorUseCase } from "../application/use-cases/create-product-orchestrator.usecase";
import { ProductRepository } from "@modules/core/product/infrastructure/repository/producto.repository";
import ProcessRepository from "@modules/core/process/infrastructure/repository/process.repository";
import { InputRepository } from "@modules/core/input/infrastructure/repository/input.repository";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { LocalFileCleanupService } from "@shared/files/local-file-cleanup.service";
import { ProductOrchestrator } from "../domain/product-orchestrator.types";

export class ProductOrchestratorController {
    private readonly createProductOrchestrator: CreateProductOrchestratorUseCase;
    private readonly updateProductOrchestrator: UpdateProductOrchestratorUseCase;
    private readonly productInputProcessRepo: ProductInputProcessRepository;
    private readonly productDiscountRepo: ProductDiscountRangeRepository;
    private readonly productProcessRepo: ProductProcessRepository;
    private readonly productQueryRepo: ProductQueryRepository;
    private readonly productInputRepo: ProductInputRepository;
    private readonly fileCleaner: LocalFileCleanupService;
    private readonly processRepo: ProcessRepository;

    private readonly inputRepo: InputRepository;
    private readonly repo: ProductRepository;
    constructor() {
        this.repo = new ProductRepository();
        this.fileCleaner = new LocalFileCleanupService();
        this.inputRepo = new InputRepository();
        this.processRepo = new ProcessRepository();
        this.productProcessRepo = new ProductProcessRepository();
        this.productInputRepo = new ProductInputRepository();
        this.productDiscountRepo = new ProductDiscountRangeRepository();
        this.productInputProcessRepo = new ProductInputProcessRepository();
        this.productQueryRepo = new ProductQueryRepository();
        this.updateProductOrchestrator = new UpdateProductOrchestratorUseCase({
            processRepo: this.processRepo,
            inputRepo: this.inputRepo,
            productRepo: this.repo,
            productProcessRepo: this.productProcessRepo,
            productInputRepo: this.productInputRepo,
            discountRangeRepo: this.productDiscountRepo,
            productInputProcessRepo: this.productInputProcessRepo,
            fileCleanup: this.fileCleaner,
            productQuery: this.productQueryRepo
        });
        this.createProductOrchestrator = new CreateProductOrchestratorUseCase({
            processRepo: this.processRepo,
            inputRepo: this.inputRepo,
            productRepo: this.repo,
            productProcessRepo: this.productProcessRepo,
            productInputRepo: this.productInputRepo,
            discountRangeRepo: this.productDiscountRepo,
            productInputProcessRepo: this.productInputProcessRepo,
            fileCleanup: this.fileCleaner,
            productQuery: this.productQueryRepo
        });
    };

    create = async (req: ApiRequest<CreateProductOrchestratorSchema>, res: ApiResponse<CreateProductOrchestratorSchema>) => {
        const { payload, photo }: CreateProductOrchestratorSchema["body"] = req.body;
        const updatePayload = {
            ...payload,
            product: {
                ...payload.product,
                ...(
                    photo ? {
                        photo: photo ?? null
                    } : {}
                )
            },
        }
        const productOrchestratorResponse: ProductOrchestrator = await this.createProductOrchestrator.execute(updatePayload);
        const productOrchestratorResult = await mapProductQueryOrchestratorDomainToDto(productOrchestratorResponse);
        return res.status(201).send(productOrchestratorResult);
    };

    update = async (req: ApiRequest<UpdateProductOrchestratorSchema>, res: ApiResponse<UpdateProductOrchestratorSchema>) => {
        const { payload, photo }: UpdateProductOrchestratorSchema["body"] = req.body;
        const { id }: UpdateProductOrchestratorSchema["params"] = req.params;
        const updatePayload = {
            ...payload,
            product: {
                ...payload.product,
                ...(
                    photo ? {
                        photo: photo ?? null
                    } : {}
                )
            },
        }
        const productOrchestratorResponse: ProductOrchestrator = await this.updateProductOrchestrator.execute(Number(id), updatePayload);
        const productOrchestratorResult = await mapProductQueryOrchestratorDomainToDto(productOrchestratorResponse);
        return res.status(200).send(productOrchestratorResult);
    }
};

