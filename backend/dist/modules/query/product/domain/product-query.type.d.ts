import type { ProductOrchestratorResponseProps, ProductOrchestrator, ProductProcessOrchestratorResponseProps, ProductDiscountRangeOrchestratorProps, ProductProcessOrchestratorProps, ProductDiscountRangeOrchestratorResponseProps, ProductInputOrchestratorResponseProp, ProductInputOrchestratorProps } from "@modules/features/products/orchestrator/domain/product-orchestrator.types";
import type { ProductProps, ProductSearchCriteria } from "@modules/core/product/domain/product.types";
import { ProductResponseDto } from "@modules/core/product/application/dto/product.model.schema";
type ProductOrchestratorResult = ProductOrchestratorResponseProps;
type ProductOrchestratorQuery = ProductOrchestrator;
interface ProductFullQueryResult extends ProductProps {
    product_inputs: ProductInputOrchestratorProps[];
    product_processes: ProductProcessOrchestratorProps[];
    product_discount_ranges: ProductDiscountRangeOrchestratorProps[];
}
interface ProductFullQueryResultDto extends ProductResponseDto {
    product_inputs: ProductInputOrchestratorResponseProp[];
    product_processes: ProductProcessOrchestratorResponseProps[];
    product_discount_ranges: ProductDiscountRangeOrchestratorResponseProps[];
}
export type { ProductOrchestratorResult, ProductFullQueryResult, ProductFullQueryResultDto, ProductOrchestratorQuery, ProductSearchCriteria, };
