import type { ProductDiscountRangeCreateProps, ProductDiscountRangeUpdateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import type { ProductInputProcessCreateProps, ProductInputProcessProps, ProductInputProcessUpdateProps } from "../../assigments/product-input-process/domain/product-input-process.types";
import type { ProductProcessCreateProps, ProductProcessUpdateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import type { ProductInputCreateProps, ProductInputUpdateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import type { ProcessCreateProps, ProcessProps, ProcessSearchCriteria } from "../../../../core/process/domain/process.types";
import type { ProductCreateProps, ProductUpdateProps, ProductProps } from "../../../../core/product/domain/product.types";
import type { InputProps } from "../../../../core/input/domain/input.types";
import { ProductDiscountRangeResponseDto } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { ProductProcessResponseDto } from "../../assigments/product-process/application/dto/product-process.model.schema";
import { ProductInputResponseDto } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { ProductResponseDto } from "../../../../../modules/core/product/application/dto/product.model.schema";
type NoProductId = {
    product_id?: never;
};
type UpdateById<TPatch> = {
    id: number;
} & TPatch;
type DeleteObjects<T> = T[];
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
type ProductInputCreateOrchestrated = NoProductId & Omit<ProductInputCreateProps, "product_id"> & {
    input?: InputProps;
    product?: ProductProps;
};
type ProductInputProcessCreateOrchestrated = Omit<ProductInputProcessCreateProps, "product_id" | "product_input_id" | "product_process_id"> & {
    qty: ProductInputProcessCreateProps["qty"];
    product_input: ProductInputCreateOrchestrated;
};
type ProductProcessAssignExisting = NoProductId & Omit<ProductProcessCreateProps, "product_id"> & {
    process_id: number;
    process?: ProcessProps;
    product?: ProductProps;
    product_input_process: ProductInputProcessCreateOrchestrated[];
};
type ProductProcessCreateNew = NoProductId & Omit<ProductProcessCreateProps, "product_id" | "process_id"> & {
    process: ProcessCreateProps;
    process_id?: never;
    product?: ProductProps;
    product_input_process: ProductInputProcessCreateOrchestrated[];
};
type ProductProcessCreateOrchestrated = ProductProcessAssignExisting | ProductProcessCreateNew;
type ProductDiscountRangeCreateOrchestrated = NoProductId & Omit<ProductDiscountRangeCreateProps, "product_id">;
interface ProductOrchestratorCreate {
    product: ProductCreateProps;
    products_inputs: ProductInputCreateOrchestrated[];
    product_processes: ProductProcessCreateOrchestrated[];
    product_discount_ranges: ProductDiscountRangeCreateOrchestrated[];
}
interface ProductInputProcessManager {
    added: ProductInputProcessCreateOrchestrated[];
    updated: Array<UpdateById<ProductInputProcessUpdateProps>>;
    deleted: DeleteObjects<ProductInputProcessProps>;
}
interface ProductProcessManager {
    added: ProductProcessCreateOrchestrated[];
    updated: Array<UpdateById<ProductProcessUpdateProps> & {
        product_input_process_updated?: ProductInputProcessManager;
    }>;
    deleted: DeleteObjects<ProductProcessProps>;
}
interface ProductInputManager {
    added: ProductInputCreateOrchestrated[];
    updated: Array<UpdateById<ProductInputUpdateProps>>;
    deleted: DeleteObjects<ProductInputProps>;
}
interface ProductDiscountRangeManager {
    added: ProductDiscountRangeCreateOrchestrated[];
    updated: Array<UpdateById<ProductDiscountRangeUpdateProps>>;
    deleted: DeleteObjects<ProductDiscountRangeProps>;
}
interface ProductOrchestratorUpdate {
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
export type { ProductInputOrchestratorBase, ProductProcessOrchestratorBaseLean, ProductProcessOrchestratorBase, ProductDiscountRangeOrchestratorBase, ProductInputProcessOrchestratorBase, ProductInputCreateOrchestrated, ProductInputProcessCreateOrchestrated, ProductProcessAssignExisting, ProductProcessCreateNew, ProductProcessCreateOrchestrated, ProductDiscountRangeCreateOrchestrated, ProductOrchestratorCreate, ProductProcessResponseOrchestrator, ProductInputProcessManager, ProductProcessManager, ProductInputManager, ProductDiscountRangeManager, ProductOrchestratorUpdate, ProcessSearchCriteria, ProductOrchestrator, ProductOrchestratorResponse, };
