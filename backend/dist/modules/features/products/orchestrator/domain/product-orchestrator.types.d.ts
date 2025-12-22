import type { ProductDiscountRangeCreateProps, ProductDiscountRangeUpdateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import type { ProductProcessCreateProps, ProductProcessUpdateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import type { ProductInputCreateProps, ProductInputUpdateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import type { ProductCreateProps, ProductUpdateProps, ProductProps } from "../../../../core/product/domain/product.types";
import type { ProcessCreateProps, ProcessProps, ProcessSearchCriteria } from "../../../../core/process/domain/process.types";
import { InputProps } from "../../../../core/input/domain/input.types";
import { ProductResponseDto } from "../../../../../modules/core/product/application/dto/product.model.schema";
import { ProductInputResponseDto } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { ProductProcessResponseDto } from "../../assigments/product-process/application/dto/product-process.model.schema";
import { ProductDiscountRangeResponseDto } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
type ProductProcessOrchestratorForAsign = Omit<ProductProcessCreateProps, "process_id"> & {
    process_id: number;
    process?: ProcessProps;
    product?: ProductProps;
};
type ProductProcessOrchestratorForCreate = Omit<ProductProcessCreateProps, "process_id"> & {
    process: ProcessCreateProps;
    process_id?: undefined;
    product?: ProductProps;
};
type ProductProcessOrchestratorCreate = ProductProcessOrchestratorForAsign | ProductProcessOrchestratorForCreate;
interface ProductInputOrchestratorCreate extends ProductInputCreateProps {
    input?: InputProps;
    product?: ProductProps;
}
type ProductDiscountRangeOrchestratorCreate = Omit<ProductDiscountRangeCreateProps, "product_id"> & {
    product_id?: undefined;
};
interface ProductOrchestratorCreate {
    product: ProductCreateProps;
    products_inputs: ProductInputOrchestratorCreate[];
    product_processes: ProductProcessOrchestratorCreate[];
    product_discount_ranges: ProductDiscountRangeOrchestratorCreate[];
}
interface ProductProcessOrchestratorUpdate extends ProductProcessUpdateProps {
    id: number;
}
interface ProductInputOrchestratorUpdate extends ProductInputUpdateProps {
    id: number;
}
interface ProductDiscountRangeOrchestratorUpdate extends ProductDiscountRangeUpdateProps {
    id: number;
}
interface ProductProcessManager {
    added: ProductProcessOrchestratorCreate[];
    updated: ProductProcessOrchestratorUpdate[];
    deleted: ProductProcessProps[];
}
interface ProductInputManager {
    added: ProductInputOrchestratorCreate[];
    updated: ProductInputOrchestratorUpdate[];
    deleted: ProductInputProps[];
}
interface ProductDiscountRangeManager {
    added: ProductDiscountRangeOrchestratorCreate[];
    updated: ProductDiscountRangeOrchestratorUpdate[];
    deleted: ProductDiscountRangeProps[];
}
interface ProductOrchestratorUpdate {
    product: ProductUpdateProps;
    products_inputs_manager: ProductInputManager;
    product_processes_manager: ProductProcessManager;
    product_discount_ranges_manager: ProductDiscountRangeManager;
}
interface ProductOrchestrator {
    product: ProductProps;
    products_inputs: ProductInputProps[];
    product_processes: ProductProcessProps[];
    product_discount_ranges: ProductDiscountRangeProps[];
}
interface ProductOrchestratorResponse {
    product: ProductResponseDto;
    products_inputs: ProductInputResponseDto[];
    product_processes: ProductProcessResponseDto[];
    product_discount_ranges: ProductDiscountRangeResponseDto[];
}
export type { ProductProcessOrchestratorCreate, ProductInputOrchestratorCreate, ProductDiscountRangeOrchestratorCreate, ProductOrchestratorCreate, ProductProcessOrchestratorUpdate, ProductInputOrchestratorUpdate, ProductDiscountRangeOrchestratorUpdate, ProductProcessManager, ProductInputManager, ProductDiscountRangeManager, ProductOrchestratorUpdate, ProductProcessOrchestratorForAsign, ProductProcessOrchestratorForCreate, ProcessSearchCriteria, ProductOrchestrator, ProductOrchestratorResponse, };
