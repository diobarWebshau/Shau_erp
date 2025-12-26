import { ProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/infrastructure/repository/product-discount-range.repository";
import { ProductInputProcessRepository } from "../../assigments/product-input-process/infrastructure/repository/product-input-process.repository";
import { CreateProductOrchestratorSchema, UpdateProductOrchestratorSchema } from "../application/product-orchestrator.endpoint.schema";
import { ProductProcessRepository } from "../../assigments/product-process/infrastructure/repository/product-process.repository";
import { ProductInputRepository } from "../../assigments/product-input/infrastructure/repository/product-input.repository";
import { ProductRepository } from "@src/modules/core/product/infrastructure/repository/producto.repository";
import { ProductOrchestrator, ProductOrchestratorResponse } from "../domain/product-orchestrator.types";
import ProcessRepository from "@src/modules/core/process/infrastructure/repository/process.repository";
import { UpdateProductOrchestratorUseCase } from "../application/update-product-orchestrator.usecase";
import { CreateProductOrchestratorUseCase } from "../application/create-product-orchestrator.usecase";
import { InputRepository } from "@src/modules/core/input/infrastructure/repository/input.repository";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { ProductQueryRepository } from "../../query/infrastructure/product-query.repository";
import { LocalFileCleanupService } from "@src/shared/files/local-file-cleanup.service";
import ImageHandler from "@src/helpers/imageHandlerClass";

export class ProductOrchestratorController {
    private readonly createProductOrchestrator: CreateProductOrchestratorUseCase;
    private readonly updateProductOrchestrator: UpdateProductOrchestratorUseCase;
    private readonly productInputProcessRepo: ProductInputProcessRepository;
    private readonly productDiscountRepo: ProductDiscountRangeRepository;
    private readonly productProcessRepo: ProductProcessRepository;
    private readonly productInputRepo: ProductInputRepository;
    private readonly fileCleaner: LocalFileCleanupService;
    private readonly processRepo: ProcessRepository;
    private readonly productQueryRepo: ProductQueryRepository;

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

    private formattResponse = async (response: ProductOrchestrator): Promise<ProductOrchestratorResponse> => {
        return {
            product: {
                ...response.product,
                photo: response.product.photo ? await ImageHandler.convertToBase64(response.product.photo) : null,
                created_at: response.product.created_at.toISOString(),
                updated_at: response.product.updated_at.toISOString(),
            },
            product_discount_ranges: response.product_discount_ranges.map((pdr) => ({
                ...pdr,
                created_at: pdr.created_at.toISOString(),
                updated_at: pdr.updated_at.toISOString(),
            })),
            products_inputs: response.products_inputs,
            product_processes: response.product_processes
        }
    }

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
        const result: ProductOrchestrator = await this.createProductOrchestrator.execute(updatePayload);
        const formattResult: ProductOrchestratorResponse = await this.formattResponse(result);
        return res.status(201).send(formattResult);
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
        const result: ProductOrchestrator = await this.updateProductOrchestrator.execute(Number(id), updatePayload);
        const formattResult: ProductOrchestratorResponse = await this.formattResponse(result);
        return res.status(201).send(formattResult);
    }
};

