import type { ProductDiscountRangeCreateProps, ProductDiscountRangeUpdateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import type { ProductInputProcessCreateProps, ProductInputProcessProps, ProductInputProcessUpdateProps } from "../../assigments/product-input-process/domain/product-input-process.types";
import type { ProductProcessCreateProps, ProductProcessUpdateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import type { ProductInputCreateProps, ProductInputUpdateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import { ProductDiscountRangeResponseDto } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { ProductProcessResponseDto } from "../../assigments/product-process/application/dto/product-process.model.schema";
import type { ProcessCreateProps, ProcessProps, ProcessSearchCriteria } from "../../../../core/process/domain/process.types";
import type { ProductCreateProps, ProductUpdateProps, ProductProps } from "../../../../core/product/domain/product.types";
import { ProductInputResponseDto } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { ProductResponseDto } from "../../../../../modules/core/product/application/dto/product.model.schema";
import type { InputProps } from "../../../../core/input/domain/input.types";
type NoProductId = {
    product_id?: never;
};
type UpdateById<TPatch> = {
    id: number;
} & TPatch;
type ProductInputOrchestratorBase = ProductInputProps & {
    input?: InputProps;
    product?: ProductProps;
};
type ProductProcessOrchestratorBaseLean = ProductProcessProps & {
    process?: ProcessProps;
    product?: ProductProps;
};
type ProductInputProcessOrchestratorBase = ProductInputProcessProps & {
    product?: ProductProps;
    product_input?: ProductInputOrchestratorBase;
    product_process?: ProductProcessOrchestratorBaseLean;
};
type ProductProcessOrchestratorBase = ProductProcessOrchestratorBaseLean & {
    product_input_process?: ProductInputProcessOrchestratorBase[];
};
type ProductDiscountRangeOrchestratorBase = ProductDiscountRangeProps & {
    product?: ProductProps;
};
type ProductInputCreateOrchestrator = NoProductId & Omit<ProductInputCreateProps, "product_id"> & {
    input?: InputProps;
    product?: ProductProps;
};
type ProductInputProcessCreateOrchestrator = Omit<ProductInputProcessCreateProps, "product_id" | "product_input_id" | "product_process_id"> & {
    qty: ProductInputProcessCreateProps["qty"];
    product_input: ProductInputCreateOrchestrator;
};
type ProductProcessOrchestratorAssignExisting = NoProductId & Omit<ProductProcessCreateProps, "product_id"> & {
    process_id: number;
    process?: ProcessProps;
    product?: ProductProps;
    product_input_process: ProductInputProcessCreateOrchestrator[];
};
type ProductProcessOrchestratorCreateNew = NoProductId & Omit<ProductProcessCreateProps, "product_id" | "process_id"> & {
    process: ProcessCreateProps;
    process_id?: never;
    product?: ProductProps;
    product_input_process: ProductInputProcessCreateOrchestrator[];
};
type ProductProcessCreateOrchestrator = ProductProcessOrchestratorAssignExisting | ProductProcessOrchestratorCreateNew;
type ProductDiscountRangeCreateOrchestrator = NoProductId & Omit<ProductDiscountRangeCreateProps, "product_id">;
interface ProductOrchestratorCreate {
    product: ProductCreateProps;
    products_inputs: ProductInputCreateOrchestrator[];
    product_processes: ProductProcessCreateOrchestrator[];
    product_discount_ranges: ProductDiscountRangeCreateOrchestrator[];
}
type ProductInputProcessUpdateOrchestrator = UpdateById<ProductInputProcessUpdateProps>;
interface ProductInputProcessManager {
    added: ProductInputProcessCreateOrchestrator[];
    updated: Array<ProductInputProcessUpdateOrchestrator>;
    deleted: Array<ProductInputProcessProps>;
}
type ProductProcessUpdateOrchestrator = UpdateById<ProductProcessUpdateProps> & {
    product_input_process_updated?: ProductInputProcessManager;
};
interface ProductProcessManager {
    added: Array<ProductProcessCreateOrchestrator>;
    updated: Array<ProductProcessUpdateOrchestrator>;
    deleted: Array<ProductProcessProps>;
}
type ProductInputUpdateOrchestrator = UpdateById<ProductInputUpdateProps>;
interface ProductInputManager {
    added: Array<ProductInputCreateOrchestrator>;
    updated: Array<ProductInputUpdateOrchestrator>;
    deleted: Array<ProductInputProps>;
}
type ProductDiscountRangeUpdateOrchestrator = UpdateById<ProductDiscountRangeUpdateProps>;
interface ProductDiscountRangeManager {
    added: ProductDiscountRangeCreateOrchestrator[];
    updated: Array<ProductDiscountRangeUpdateOrchestrator>;
    deleted: Array<ProductDiscountRangeProps>;
}
interface ProductUpdateOrchestrator {
    product: ProductUpdateProps;
    products_inputs_manager: ProductInputManager;
    product_processes_manager: ProductProcessManager;
    product_discount_ranges_manager: ProductDiscountRangeManager;
}
interface ProductOrchestrator {
    product: ProductProps;
    products_inputs: ProductInputOrchestratorBase[];
    product_processes: ProductProcessOrchestratorBase[];
    product_discount_ranges: ProductDiscountRangeOrchestratorBase[];
}
type ProductInputResponseOrchestrator = ProductInputResponseDto & {
    input?: InputProps;
    product?: ProductProps;
};
type ProductProcessResponseOrchestrator = ProductProcessResponseDto & {
    process?: ProcessProps;
    product?: ProductProps;
    product_input_process?: ProductInputProcessProps[];
};
type ProductDiscountRangeResponseOrchestrator = ProductDiscountRangeResponseDto & {
    product?: ProductProps;
};
interface ProductOrchestratorResponse {
    product: ProductResponseDto;
    products_inputs: ProductInputResponseOrchestrator[];
    product_processes: ProductProcessResponseOrchestrator[];
    product_discount_ranges: ProductDiscountRangeResponseOrchestrator[];
}
export type { ProductInputOrchestratorBase, ProductProcessOrchestratorBaseLean, ProductProcessOrchestratorBase, ProductDiscountRangeOrchestratorBase, ProductInputProcessOrchestratorBase, ProductInputCreateOrchestrator, ProductInputProcessCreateOrchestrator, ProductProcessOrchestratorAssignExisting, ProductProcessOrchestratorCreateNew, ProductProcessCreateOrchestrator, ProductDiscountRangeCreateOrchestrator, ProductOrchestratorCreate, ProductProcessResponseOrchestrator, ProductInputProcessManager, ProductProcessManager, ProductInputManager, ProductDiscountRangeManager, ProductUpdateOrchestrator, ProductInputProcessUpdateOrchestrator, ProductInputProcessProps, ProductProcessUpdateOrchestrator, ProductProcessProps, ProductInputUpdateOrchestrator, ProductInputProps, ProductDiscountRangeUpdateOrchestrator, ProductDiscountRangeProps, ProcessSearchCriteria, ProductOrchestrator, ProductOrchestratorResponse, };
