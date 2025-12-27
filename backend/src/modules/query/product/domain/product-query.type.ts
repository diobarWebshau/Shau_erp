import { ProductDiscountRangeResponseDto } from "@modules/features/products/assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import type { ProductOrchestratorResponse, ProductOrchestrator, ProductProcessResponseOrchestrator } from "@modules/features/products/orchestrator/domain/product-orchestrator.types";
import type { ProductDiscountRangeProps } from "@modules/features/products/assigments/product-discounts-ranges/domain/product-discount-range.types";
import { ProductInputResponseDto } from "@modules/features/products/assigments/product-input/application/dto/product-input.model.schema";
import type { ProductProcessProps } from "@modules/features/products/assigments/product-process/domain/product-process.types";
import type { ProductInputProps } from "@modules/features/products/assigments/product-input/domain/product-input.types";
import type { ProductProps, ProductSearchCriteria } from "@modules/core/product/domain/product.types";
import { ProductResponseDto } from "@modules/core/product/application/dto/product.model.schema";

type ProductOrchestratorResult = ProductOrchestratorResponse;
type ProductOrchestratorQuery = ProductOrchestrator;

interface ProductFullQueryResult extends ProductProps {
    products_inputs: ProductInputProps[],
    product_processes: ProductProcessProps[],
    product_discount_ranges: ProductDiscountRangeProps[]
};

interface ProductFullQueryResultDto extends ProductResponseDto {
    products_inputs: ProductInputResponseDto[],
    product_processes: ProductProcessResponseOrchestrator[],
    product_discount_ranges: ProductDiscountRangeResponseDto[]
};

export type {
    ProductOrchestratorResult,
    ProductFullQueryResult,
    ProductFullQueryResultDto,
    ProductOrchestratorQuery,
    ProductSearchCriteria
};