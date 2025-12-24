import { ProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/infrastructure/repository/product-discount-range.repository";
import { ProductInputProcessRepository } from "../../assigments/product-input-process/infrastructure/repository/product-input-process.repository";
import { ProductProcessRepository } from "../../assigments/product-process/infrastructure/repository/product-process.repository";
import { ProductInputRepository } from "../../assigments/product-input/infrastructure/repository/product-input.repository";
import { ProductRepository } from "@src/modules/core/product/infrastructure/repository/producto.repository";
import ProcessRepository from "@src/modules/core/process/infrastructure/repository/process.repository";
import { CreateProductOrchestratorSchema } from "../application/product-orchestrator.endpoint.schema";
import { InputRepository } from "@src/modules/core/input/infrastructure/repository/input.repository";
import { CreateProductOrchestratorUseCase } from "../application/create-product-orchestrator.usecase";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { LocalFileCleanupService } from "@src/shared/files/local-file-cleanup.service";
import { ProductOrchestratorResponse } from "../domain/product-orchestrator.types";

export class ProductOrchestratorController {
    private readonly createProductOrchestrator: CreateProductOrchestratorUseCase;
    private readonly productInputProcessRepo: ProductInputProcessRepository;
    private readonly productDiscountRepo: ProductDiscountRangeRepository;
    private readonly productProcessRepo: ProductProcessRepository;
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
        this.createProductOrchestrator = new CreateProductOrchestratorUseCase({
            processRepo: this.processRepo,
            inputRepo: this.inputRepo,
            productRepo: this.repo,
            productProcessRepo: this.productProcessRepo,
            productInputRepo: this.productInputRepo,
            discountRangeRepo: this.productDiscountRepo,
            productInputProcessRepo: this.productInputProcessRepo,
            fileCleanup: this.fileCleaner
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
        const result: ProductOrchestratorResponse =
            await this.createProductOrchestrator.execute(updatePayload);
        return res.status(201).send(result);
    };
};

