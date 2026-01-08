import { ProductionLineProductOrchestratorResponseDto, ProductionLineOrchestratorResponseDto } from "@modules/features/production-line/orchestrator/application/dto/production-line-orchestrator.model.schema";
import { ProductionLineOrchestrator, ProductionLineProductOrchestratorProps } from "@modules/features/production-line/orchestrator/domain/production-line-orchestrator.types";
import { ProductionLineProps, ProductionLineSearchCriteria } from "@modules/core/production-line/domain/production-line.types";
import { ProductionLineResponseDto } from "@modules/core/production-line/application/dto/production-lines.model.schema";

type ProductionLineOrchestratorResult = ProductionLineOrchestratorResponseDto;
type ProductionLineOrchestratorQuery = ProductionLineOrchestrator;

interface ProductionLineFullQueryResult extends ProductionLineProps {
    production_line_products: ProductionLineProductOrchestratorProps[]
};

interface ProductionLineQueryResultResponseDto extends ProductionLineResponseDto {
    production_line_products: ProductionLineProductOrchestratorResponseDto[]
};

export type {
    ProductionLineOrchestratorResult,
    ProductionLineOrchestratorQuery,
    ProductionLineQueryResultResponseDto,
    ProductionLineFullQueryResult,
    ProductionLineSearchCriteria
}