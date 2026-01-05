import { ProductionLineResponseOrchestratorDto } from "../dto/production-line-orchestrator.model.schema";
import { IProductionLineProductRepository } from "../../../assigments/production-line-product/domain/production-line.repository.interface";
import { IProductionLineQueryRepository } from "@modules/query/production-line/domain/production-line-query.respository.interface";
import { IProductionLineRepository } from "@modules/core/production-line/domain/production-line.repository.interface";
import { ProductionLineCreateOrchestrator } from "../../domain/production-line-orchestrator.types";
interface ICreateProductionLineOrchestratorUseCase {
    productionLineRepo: IProductionLineRepository;
    productionLineProduct: IProductionLineProductRepository;
    productionLineQueryRepo: IProductionLineQueryRepository;
}
export declare class CreateProductionLineOrchestratorUseCase {
    private readonly productionLineRepo;
    private readonly productionLineProductRepo;
    private readonly productionLineQueryRepo;
    constructor({ productionLineProduct, productionLineRepo, productionLineQueryRepo }: ICreateProductionLineOrchestratorUseCase);
    execute: (data: ProductionLineCreateOrchestrator) => Promise<ProductionLineResponseOrchestratorDto>;
}
export {};
