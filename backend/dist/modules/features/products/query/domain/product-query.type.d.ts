import { ProductDiscountRangeResponseDto } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import type { ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import type { ProductOrchestratorResponse, ProductOrchestrator, ProductProcessResponseOrchestrator } from "../../orchestrator/domain/product-orchestrator.types";
import { ProductInputResponseDto } from "../../assigments/product-input/application/dto/product-input.model.schema";
import type { ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import { ProductResponseDto } from "../../../../../modules/core/product/application/dto/product.model.schema";
import type { ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import type { ProductProps, ProductSearchCriteria } from "../../../../core/product/domain/product.types";
type ProductOrchestratorResult = ProductOrchestratorResponse;
type ProductOrchestratorQuery = ProductOrchestrator;
interface ProductFullQueryResult extends ProductProps {
    products_inputs: ProductInputProps[];
    product_processes: ProductProcessProps[];
    product_discount_ranges: ProductDiscountRangeProps[];
}
interface ProductFullQueryResultDto extends ProductResponseDto {
    products_inputs: ProductInputResponseDto[];
    product_processes: ProductProcessResponseOrchestrator[];
    product_discount_ranges: ProductDiscountRangeResponseDto[];
}
export type { ProductOrchestratorResult, ProductFullQueryResult, ProductFullQueryResultDto, ProductOrchestratorQuery, ProductSearchCriteria };
