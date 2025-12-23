import { ProductDiscountRangeRepository } from "../../assigments/product-discounts-ranges/infrastructure/repository/product-discount-range.repository";
import { ProductInputProcessRepository } from "../../assigments/product-input-process/infrastructure/repository/product-input-process.repository";
import { ProductProcessRepository } from "../../assigments/product-process/infrastructure/repository/product-process.repository";
import { ProductInputRepository } from "../../assigments/product-input/infrastructure/repository/product-input.repository";
import { ProductRepository } from "@src/modules/core/product/infrastructure/repository/producto.repository";
import ProcessRepository from "@src/modules/core/process/infrastructure/repository/process.repository";
import { InputRepository } from "@src/modules/core/input/infrastructure/repository/input.repository";
import { CreateProductOrchestratorUseCase } from "../application/create-product-orchestrator.usecase";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { CreateProductOrchestratorSchema } from "../application/product-orchestrator.endpoint.schema";


export class ProductOrchestratorController {

    private readonly repo: ProductRepository;
    private readonly processRepo: ProcessRepository;
    private readonly inputRepo: InputRepository;
    private readonly productProcessRepo: ProductProcessRepository;
    private readonly productInputRepo: ProductInputRepository;
    private readonly productDiscountRepo: ProductDiscountRangeRepository;
    private readonly productInputProcessRepo: ProductInputProcessRepository;
    private readonly createProductOrchestrator: CreateProductOrchestratorUseCase;

    constructor() {
        this.repo = new ProductRepository();
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
        });
    };

    create = async (req: ApiRequest<CreateProductOrchestratorSchema>, res: ApiResponse<CreateProductOrchestratorSchema>) => {
        const body = req.body;
        const result = await this.createProductOrchestrator.execute(body);
        return res.status(201).send(result);
    };
};

