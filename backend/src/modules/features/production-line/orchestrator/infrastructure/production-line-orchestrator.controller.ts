import { CreateProductionLineOrchestratorSchema, UpdateProductionLineOrchestratorSchema } from "../application/dto/production-line-orchestrator.usecase.schema";
import { ProductionLineProductRepository } from "../../assigments/production-line-product/infrastructure/repository/production-line-product.respository";
import { ProductionLineQueryRepository } from "@src/modules/query/production-line/infrastructure/repository/production-line-query.repository";
import { IProductionLineProductRepository } from "../../assigments/production-line-product/domain/production-line.repository.interface";
import { IProductionLineQueryRepository } from "@src/modules/query/production-line/domain/production-line-query.respository.interface";
import { ProductionLineRepository } from "@src/modules/core/production-line/infrastructure/repository/production-line.repository";
import { CreateProductionLineOrchestratorUseCase } from "../application/use-cases/create-production-line-orchestrator.usecase";
import { UpdateProductionLineOrchestratorUseCase } from "../application/use-cases/update-production-line-orchestrator.usecase";
import { IProductionLineRepository } from "@src/modules/core/production-line/domain/production-line.repository.interface";
import { ProductionLineResponseOrchestratorDto } from "../application/dto/production-line-orchestrator.model.schema";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";



export class ProductionLineOrchestratorController {

    private readonly productionLineRepo: IProductionLineRepository;
    private readonly productionLineProductRepo: IProductionLineProductRepository;
    private readonly productionLineQueryRepo: IProductionLineQueryRepository;
    private readonly createProductionLineOrchestratorUseCase: CreateProductionLineOrchestratorUseCase;
    private readonly updateProductionLineOrchestratorUseCase: UpdateProductionLineOrchestratorUseCase;

    constructor() {
        this.productionLineRepo = new ProductionLineRepository();
        this.productionLineProductRepo = new ProductionLineProductRepository();
        this.productionLineQueryRepo = new ProductionLineQueryRepository();
        this.createProductionLineOrchestratorUseCase = new CreateProductionLineOrchestratorUseCase({
            productionLineProduct: this.productionLineProductRepo,
            productionLineRepo: this.productionLineRepo,
            productionLineQueryRepo: this.productionLineQueryRepo
        });
        this.updateProductionLineOrchestratorUseCase = new UpdateProductionLineOrchestratorUseCase({
            productionLineProductRepo: this.productionLineProductRepo,
            productionLineRepo: this.productionLineRepo,
            productionLineQueryRepo: this.productionLineQueryRepo
        })
    };

    create = async (req: ApiRequest<CreateProductionLineOrchestratorSchema>, res: ApiResponse<CreateProductionLineOrchestratorSchema>) => {
        const { payload }: CreateProductionLineOrchestratorSchema["body"] = req.body;
        const plpResponse: ProductionLineResponseOrchestratorDto = await this.createProductionLineOrchestratorUseCase.execute(payload);
        res.status(200).json(plpResponse);
    };

    update = async (req: ApiRequest<UpdateProductionLineOrchestratorSchema>, res: ApiResponse<UpdateProductionLineOrchestratorSchema>) => {
        const { id }: UpdateProductionLineOrchestratorSchema["params"] = req.params;
        const { payload }: UpdateProductionLineOrchestratorSchema["body"] = req.body;
        const plpResponse: ProductionLineResponseOrchestratorDto = await this.updateProductionLineOrchestratorUseCase.execute(Number(id), payload);
        res.status(200).json(plpResponse);
    };
};