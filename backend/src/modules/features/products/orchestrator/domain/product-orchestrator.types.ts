import type { ProductDiscountRangeCreateProps, ProductDiscountRangeUpdateProps, ProductDiscountRangeProps } from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";
import type { ProductInputProcessCreateProps, ProductInputProcessProps, ProductInputProcessUpdateProps } from "../../assigments/product-input-process/domain/product-input-process.types";
import type { ProductProcessCreateProps, ProductProcessUpdateProps, ProductProcessProps } from "../../assigments/product-process/domain/product-process.types";
import type { ProductInputCreateProps, ProductInputUpdateProps, ProductInputProps } from "../../assigments/product-input/domain/product-input.types";
import { ProductDiscountRangeResponseDto } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { ProductProcessResponseDto } from "../../assigments/product-process/application/dto/product-process.model.schema";
import type { ProcessCreateProps, ProcessProps, ProcessSearchCriteria } from "@modules/core/process/domain/process.types";
import type { ProductCreateProps, ProductUpdateProps, ProductProps } from "@modules/core/product/domain/product.types";
import { ProductInputResponseDto } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { ProductResponseDto } from "@src/modules/core/product/application/dto/product.model.schema";
import type { InputProps } from "@modules/core/input/domain/input.types";

// =========================================================================================
// |                                 HELPERS TYPED                                         |
// =========================================================================================

// * Tipado que prohibe que un tipo contenga el identificador del producto
type NoProductId = { product_id?: never };

// * Tipo generico que añade el atributo id al tipo enviado como parametro
type UpdateById<TPatch> = { id: number } & TPatch;

// =========================================================================================
// |                         ORCHESTRATOR — BASE (CANÓNICO)                                |
// =========================================================================================

// * Base = shape persistida + relaciones opcionales (para response/include)
// * Nota: aquí rompemos el ciclo de tipos con una versión Lean de ProductProcess.

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

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// 🔹 PRODUCT-INPUT                                 |
// --------------------------------------------------

// * ProductInput SIN product_id
type ProductInputCreateOrchestrator =
    NoProductId &
    Omit<ProductInputCreateProps, "product_id"> & {
        // opcional: si quieres que el payload pueda venir “poblado”
        input?: InputProps;
        product?: ProductProps;
    };

// * ProductInputProcess 
type ProductInputProcessCreateOrchestrator =
    Omit<ProductInputProcessCreateProps, "product_id" | "product_input_id" | "product_process_id"> & {
        qty: ProductInputProcessCreateProps["qty"];
        product_input: ProductInputCreateOrchestrator;
    };

// --------------------------------------------------
// 🔹 PRODUCT-PROCESS                               |
// --------------------------------------------------

// * Caso A: asignar proceso existente
type ProductProcessOrchestratorAssignExisting =
    NoProductId &
    Omit<ProductProcessCreateProps, "product_id"> & {
        process_id: number;
        process?: ProcessProps;
        product?: ProductProps;
        product_input_process: ProductInputProcessCreateOrchestrator[];
    };

// * Caso B: crear proceso nuevo
type ProductProcessOrchestratorCreateNew =
    NoProductId &
    Omit<ProductProcessCreateProps, "product_id" | "process_id"> & {
        process: ProcessCreateProps;
        process_id?: never;
        product?: ProductProps;
        product_input_process: ProductInputProcessCreateOrchestrator[];
    };

// * Unificación del tipado de los casos de Product-Process 
type ProductProcessCreateOrchestrator =
    | ProductProcessOrchestratorAssignExisting
    | ProductProcessOrchestratorCreateNew;

// --------------------------------------------------
// 🔹 PRODUCT-DISCOUNT-RANGE                        |
// --------------------------------------------------

// * Product-Discount-Range en actualización del producto, SIN PRODUCT_ID
type ProductDiscountRangeCreateOrchestrator =
    NoProductId & Omit<ProductDiscountRangeCreateProps, "product_id">;

// * Product-Discount-Range MANAGER
interface ProductOrchestratorCreate {
    product: ProductCreateProps;
    products_inputs: ProductInputCreateOrchestrator[];
    product_processes: ProductProcessCreateOrchestrator[];
    product_discount_ranges: ProductDiscountRangeCreateOrchestrator[];
}

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// 🔹 PRODUCT-INPUT-PROCESS                         |
// --------------------------------------------------

// * Product-Input-Process en actualización con ID
type ProductInputProcessUpdateOrchestrator = UpdateById<ProductInputProcessUpdateProps>;
// * PRODUCT-INPUT-PROCESS (MANAGER)
interface ProductInputProcessManager {
    added: ProductInputProcessCreateOrchestrator[];
    updated: Array<ProductInputProcessUpdateOrchestrator>;
    deleted: Array<ProductInputProcessProps>;
}

// --------------------------------------------------
// 🔹 PRODUCT-PROCESS                               |
// --------------------------------------------------

// * Product-Process en actualizacion con ID, y el manager de ProductInputProcess
type ProductProcessUpdateOrchestrator = UpdateById<ProductProcessUpdateProps> & {
    product_input_process_updated?: ProductInputProcessManager
};
// * PRODUCT-PROCESS (MANAGER)
interface ProductProcessManager {
    added: Array<ProductProcessCreateOrchestrator>,
    updated: Array<ProductProcessUpdateOrchestrator>,
    deleted: Array<ProductProcessProps>
}

// --------------------------------------------------
// 🔹 PRODUCT-INPUT                                 |
// --------------------------------------------------

// * Product-Input en actualizacion con ID
type ProductInputUpdateOrchestrator = UpdateById<ProductInputUpdateProps>;
// * PRODUCT-INPUT (MANAGER)
interface ProductInputManager {
    added: Array<ProductInputCreateOrchestrator>;
    updated: Array<ProductInputUpdateOrchestrator>;
    deleted: Array<ProductInputProps>;
};

// --------------------------------------------------
// 🔹 PRODUCT-DISCOUNT-RANGE                        |
// --------------------------------------------------

// * Product-Discount-Range manager (added/updated/deleted)
type ProductDiscountRangeUpdateOrchestrator = UpdateById<ProductDiscountRangeUpdateProps>;
interface ProductDiscountRangeManager {
    added: ProductDiscountRangeCreateOrchestrator[];
    updated: Array<ProductDiscountRangeUpdateOrchestrator>;
    deleted: Array<ProductDiscountRangeProps>;
};

// --------------------------------------------------
// 🔹 OBJECT PRODUCT ORCHESTRATOR UPDATE            |
// --------------------------------------------------

// * Esquema del objeto para actualizar un producto desde el orquestador
interface ProductUpdateOrchestrator {
    product: ProductUpdateProps; // patch del producto
    products_inputs_manager: ProductInputManager;
    product_processes_manager: ProductProcessManager;
    product_discount_ranges_manager: ProductDiscountRangeManager;
}

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

// Dominio (props) — puede venir lean o con relaciones opcionales (Base)
interface ProductOrchestrator {
    product: ProductProps;
    products_inputs: ProductInputOrchestratorBase[];
    product_processes: ProductProcessOrchestratorBase[];
    product_discount_ranges: ProductDiscountRangeOrchestratorBase[];
}

// * pero permite relaciones opcionales si el backend hace include
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

// =========================================================================================
// |                                    IMPORTS                                            |
// =========================================================================================

export type {

    // *******************  BASE (CANÓNICO) ******************
    ProductInputOrchestratorBase,
    ProductProcessOrchestratorBaseLean,
    ProductProcessOrchestratorBase,
    ProductDiscountRangeOrchestratorBase,
    ProductInputProcessOrchestratorBase,

    // ******************* CREATE (REQUEST) ******************
    ProductInputCreateOrchestrator,
    ProductInputProcessCreateOrchestrator,
    ProductProcessOrchestratorAssignExisting,
    ProductProcessOrchestratorCreateNew,
    ProductProcessCreateOrchestrator,
    ProductDiscountRangeCreateOrchestrator,
    ProductOrchestratorCreate,
    ProductProcessResponseOrchestrator,

    // ******************* UPDATE (REQUEST) ******************
    // ? managers
    ProductInputProcessManager,
    ProductProcessManager,
    ProductInputManager,
    ProductDiscountRangeManager,
    // ? products
    ProductUpdateOrchestrator,
    // ? product input process
    ProductInputProcessUpdateOrchestrator,
    ProductInputProcessProps,
    // ? product process
    ProductProcessUpdateOrchestrator,
    ProductProcessProps,
    // ? product input
    ProductInputUpdateOrchestrator,
    ProductInputProps,
    // ? product discount range
    ProductDiscountRangeUpdateOrchestrator,
    ProductDiscountRangeProps,

    // ******************* SEARCH QUERY ******************
    ProcessSearchCriteria,

    // ******************* RESPONSE ******************
    ProductOrchestrator,
    ProductOrchestratorResponse,
};
