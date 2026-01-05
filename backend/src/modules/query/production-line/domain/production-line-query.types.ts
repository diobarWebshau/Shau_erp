import { ProductionLineProductResponseOrchestratorDto, ProductionLineResponseOrchestratorDto } from "@modules/features/production-line/orchestrator/application/dto/production-line-orchestrator.model.schema";
import { ProductionLineOrchestrator, ProductionLineProductOrchestratorBase } from "@modules/features/production-line/orchestrator/domain/production-line-orchestrator.types";
import { ProductionLineProps, ProductionLineSearchCriteria } from "@modules/core/production-line/domain/production-line.types";
import { ProductionLineResponseDto } from "@modules/core/production-line/application/dto/production-lines.model.schema";

type ProductionLineOrchestratorResult = ProductionLineResponseOrchestratorDto;
type ProductionLineOrchestratorQuery = ProductionLineOrchestrator;

interface ProductionLineFullQueryResult extends ProductionLineProps {
    production_line_products: ProductionLineProductOrchestratorBase[]
};

interface ProductionLineQueryResultDto extends ProductionLineResponseDto {
    production_line_products: ProductionLineProductResponseOrchestratorDto[]
};

export type {
    ProductionLineOrchestratorResult,
    ProductionLineOrchestratorQuery,
    ProductionLineQueryResultDto,
    ProductionLineFullQueryResult,
    ProductionLineSearchCriteria
}