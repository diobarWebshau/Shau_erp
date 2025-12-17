import type { ProductDiscountRangeCreateProps, ProductDiscountRangeUpdateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import type { ProductProcessCreateProps, ProductProcessUpdateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import type { ProductInputCreateProps, ProductInputUpdateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import type { ProductCreateProps, ProductUpdateProps, ProductProps } from "@modules/core/product/domain/product.types";
import type { ProcessCreateProps, ProcessProps } from "@modules/core/process/domain/process.types";
import { InputProps } from "@modules/core/input/domain/input.types";

// =========================
// ORCHESTRATOR — CREATE
// =========================

// 🔵 ProductProcess CREATE (existing OR new)
type ProductProcessOrchestratorCreate =
    // A) existing process
    (Omit<ProductProcessCreateProps, "process_id"> & {
        process_id: number;
        process?: ProcessProps;
        product?: ProductProps;
    })
    |
    // B) new process
    (Omit<ProductProcessCreateProps, "process_id"> & {
        process: ProcessCreateProps;
        process_id?: undefined;
        product?: ProductProps;
    });

// 🔵 ProductInput CREATE
interface ProductInputOrchestratorCreate
    extends ProductInputCreateProps {
    input?: InputProps;      // viene desde inputResponseSchema
    product?: ProductProps;
}

// 🔵 Discount Range CREATE
type ProductDiscountRangeOrchestratorCreate =
    Omit<ProductDiscountRangeCreateProps, "product_id"> & {
        product_id?: undefined;
    };

// 🔵 ORCHESTRATOR ROOT CREATE
interface ProductOrchestratorCreate {
    product: ProductCreateProps;
    product_inputs: ProductInputOrchestratorCreate[];
    product_processes: ProductProcessOrchestratorCreate[];
    product_discount_ranges: ProductDiscountRangeOrchestratorCreate[];
}

// =========================
// ORCHESTRATOR — UPDATE
// =========================

// 🔵 ProductProcess UPDATE
interface ProductProcessOrchestratorUpdate
    extends ProductProcessUpdateProps {
    id: number;
}

// 🔵 ProductInput UPDATE
interface ProductInputOrchestratorUpdate
    extends ProductInputUpdateProps {
    id: number;
}

// 🔵 Discount Range UPDATE
interface ProductDiscountRangeOrchestratorUpdate
    extends ProductDiscountRangeUpdateProps {
    id: number;
}


// =========================
// MANAGERS
// =========================

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


// =========================
// ORCHESTRATOR — UPDATE ROOT
// =========================

interface ProductOrchestratorUpdate {
    product: ProductUpdateProps;
    product_inputs_manager: ProductInputManager;
    product_processes_manager: ProductProcessManager;
    product_discount_ranges_manager: ProductDiscountRangeManager;
}



// =========================
// ORCHESTRATOR — RESPONSE
// =========================

interface ProductOrchestratorResponse {
    product: ProductProps;
    product_inputs: ProductInputProps[];
    product_processes: ProductProcessProps[];
    product_discount_ranges: ProductDiscountRangeProps[];
}



export type {
    // CREATE
    ProductProcessOrchestratorCreate,
    ProductInputOrchestratorCreate,
    ProductDiscountRangeOrchestratorCreate,
    ProductOrchestratorCreate,

    // UPDATE
    ProductProcessOrchestratorUpdate,
    ProductInputOrchestratorUpdate,
    ProductDiscountRangeOrchestratorUpdate,
    ProductProcessManager,
    ProductInputManager,
    ProductDiscountRangeManager,
    ProductOrchestratorUpdate,

    // RESPONSE
    ProductOrchestratorResponse
};
