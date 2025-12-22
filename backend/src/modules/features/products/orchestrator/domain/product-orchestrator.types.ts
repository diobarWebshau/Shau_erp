import type { ProductDiscountRangeCreateProps, ProductDiscountRangeUpdateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import type { ProductProcessCreateProps, ProductProcessUpdateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import type { ProductInputCreateProps, ProductInputUpdateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import type { ProductCreateProps, ProductUpdateProps, ProductProps } from "@modules/core/product/domain/product.types";
import type { ProcessCreateProps, ProcessProps, ProcessSearchCriteria } from "@modules/core/process/domain/process.types";
import { InputProps } from "@modules/core/input/domain/input.types";
import { ProductResponseDto } from "@src/modules/core/product/application/dto/product.model.schema";
import { ProductInputResponseDto } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { ProductProcessResponseDto } from "../../assigments/product-process/application/dto/product-process.model.schema";
import { ProductDiscountRangeResponseDto } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { } from "../../assigments/product-input-process/application/dto/product-input-process.model.schema";
import { ProductInputProcessCreateProps, ProductInputProcessProps, ProductInputProcessUpdateProps } from "../../assigments/product-input-process/domain/product-input-process.types";

// =========================
// ORCHESTRATOR — CREATE
// =========================

type ProductInputOrchestor = ProductInputCreateProps & {
    input?: InputProps
    product?: ProductProps
};

type ProductInputOrchestorCreate = Omit<ProductInputOrchestor, "">

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

// 🔵 ProductProcess CREATE (existing OR new)
type ProductProcessOrchestratorCreate =
    // A) existing process
    ProductProcessOrchestratorForAsign
    |
    // B) new process
    ProductProcessOrchestratorForCreate


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
    products_inputs: ProductInputOrchestratorCreate[];
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
    products_inputs_manager: ProductInputManager;
    product_processes_manager: ProductProcessManager;
    product_discount_ranges_manager: ProductDiscountRangeManager;
}

// =========================
// ORCHESTRATOR — RESPONSE
// =========================

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
    ProductProcessOrchestratorForAsign,
    ProductProcessOrchestratorForCreate,

    // SEARCH QUERY
    ProcessSearchCriteria,

    // RESPONSE
    ProductOrchestrator,
    ProductOrchestratorResponse,
};
