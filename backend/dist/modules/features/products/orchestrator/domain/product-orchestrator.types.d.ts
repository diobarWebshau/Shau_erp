import type { ProductProcessCreateProps, ProductProcessUpdateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import type { ProductDiscountRangeCreateProps, ProductDiscountRangeUpdateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import type { ProductInputCreateProps, ProductInputUpdateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import type { ProductCreateProps, ProductUpdateProps, ProductProps } from "../../../../core/product/domain/product.types";
import type { ProcessCreateProps, ProcessProps } from "../../../../core/process/domain/process.types";
import { InputProps } from "../../../../core/input/domain/input.types";
type ProductProcessOrchestratorCreate = (Omit<ProductProcessCreateProps, "process_id"> & {
    process_id: number;
    process?: ProcessProps;
    product?: ProductProps;
}) | (Omit<ProductProcessCreateProps, "process_id"> & {
    process: ProcessCreateProps;
    process_id?: undefined;
    product?: ProductProps;
});
interface ProductInputOrchestratorCreate extends ProductInputCreateProps {
    input?: InputProps;
    product?: ProductProps;
}
type ProductDiscountRangeOrchestratorCreate = Omit<ProductDiscountRangeCreateProps, "product_id"> & {
    product_id?: undefined;
};
interface ProductOrchestratorCreate {
    product: ProductCreateProps;
    product_inputs: ProductInputOrchestratorCreate[];
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
    product_inputs_manager: ProductInputManager;
    product_processes_manager: ProductProcessManager;
    product_discount_ranges_manager: ProductDiscountRangeManager;
}
interface ProductOrchestratorResponse {
    product: ProductProps;
    product_inputs: ProductInputProps[];
    product_processes: ProductProcessProps[];
    product_discount_ranges: ProductDiscountRangeProps[];
}
export type { ProductProcessOrchestratorCreate, ProductInputOrchestratorCreate, ProductDiscountRangeOrchestratorCreate, ProductOrchestratorCreate, ProductProcessOrchestratorUpdate, ProductInputOrchestratorUpdate, ProductDiscountRangeOrchestratorUpdate, ProductProcessManager, ProductInputManager, ProductDiscountRangeManager, ProductOrchestratorUpdate, ProductOrchestratorResponse };
