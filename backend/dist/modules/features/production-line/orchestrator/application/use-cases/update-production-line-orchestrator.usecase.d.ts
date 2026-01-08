import { ProductionLineOrchestratorUpdateProps, ProductionLineOrchestrator } from "../../domain/production-line-orchestrator.types";
import { IProductionLineProductRepository } from "../../../assigments/production-line-product/domain/production-line.repository.interface";
import { IProductionLineQueryRepository } from "@modules/query/production-line/domain/production-line-query.respository.interface";
import { IProductionLineRepository } from "@modules/core/production-line/domain/production-line.repository.interface";
interface IUpdateProductionLineOrchestratorUseCase {
    productionLineRepo: IProductionLineRepository;
    productionLineProductRepo: IProductionLineProductRepository;
    productionLineQueryRepo: IProductionLineQueryRepository;
}
export declare class UpdateProductionLineOrchestratorUseCase {
    private readonly productionLineRepo;
    private readonly productionLineProductRepo;
    private readonly productionLineQueryRepo;
    constructor({ productionLineProductRepo, productionLineRepo, productionLineQueryRepo }: IUpdateProductionLineOrchestratorUseCase);
    execute: (id: number, data: ProductionLineOrchestratorUpdateProps) => Promise<ProductionLineOrchestrator>;
}
export {};
