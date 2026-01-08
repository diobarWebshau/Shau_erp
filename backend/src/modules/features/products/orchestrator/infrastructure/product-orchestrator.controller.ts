import { ProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/infrastructure/repository/product-discount-range.repository";
import { ProductInputProcessRepository } from "../../assigments/product-input-process/infrastructure/repository/product-input-process.repository";
import { CreateProductOrchestratorSchema, UpdateProductOrchestratorSchema } from "../application/dto/product-orchestrator.endpoint.schema";
import { ProductProcessRepository } from "../../assigments/product-process/infrastructure/repository/product-process.repository";
import { ProductInputRepository } from "../../assigments/product-input/infrastructure/repository/product-input.repository";
import { ProductQueryRepository } from "../../../../query/product/infrastructure/product-query.repository";
import { ProductRepository } from "@modules/core/product/infrastructure/repository/producto.repository";
import { UpdateProductOrchestratorUseCase } from "../application/use-cases/update-product-orchestrator.usecase";
import { CreateProductOrchestratorUseCase } from "../application/create-product-orchestrator.usecase";
import ProcessRepository from "@modules/core/process/infrastructure/repository/process.repository";
import { InputRepository } from "@modules/core/input/infrastructure/repository/input.repository";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductOrchestratorResponseProps } from "../domain/product-orchestrator.types";
import { LocalFileCleanupService } from "@shared/files/local-file-cleanup.service";

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
        const result: ProductOrchestratorResponse = await this.createProductOrchestrator.execute(updatePayload);
        return res.status(201).send(result);
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
        const result: ProductOrchestratorResponse = await this.updateProductOrchestrator.execute(Number(id), updatePayload);
        return res.status(201).send(result);
    }
};

