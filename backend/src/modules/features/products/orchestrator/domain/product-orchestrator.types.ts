import type {
    ProductDiscountRangeCreateProps,
    ProductDiscountRangeUpdateProps,
    ProductDiscountRangeProps,
} from "../../assigments/product-discounts-ranges/domain/product-discount-range.types";

import type {
    ProductInputProcessCreateProps,
    ProductInputProcessProps,
    ProductInputProcessUpdateProps,
} from "../../assigments/product-input-process/domain/product-input-process.types";

import type {
    ProductProcessCreateProps,
    ProductProcessUpdateProps,
    ProductProcessProps,
} from "../../assigments/product-process/domain/product-process.types";

import type {
    ProductInputCreateProps,
    ProductInputUpdateProps,
    ProductInputProps,
} from "../../assigments/product-input/domain/product-input.types";

import type {
    ProcessCreateProps,
    ProcessProps,
    ProcessSearchCriteria,
} from "@modules/core/process/domain/process.types";

import type {
    ProductCreateProps,
    ProductUpdateProps,
    ProductProps,
} from "@modules/core/product/domain/product.types";

import type { InputProps } from "@modules/core/input/domain/input.types";

import { ProductDiscountRangeResponseDto } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { ProductProcessResponseDto } from "../../assigments/product-process/application/dto/product-process.model.schema";
import { ProductInputResponseDto } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { ProductResponseDto } from "@src/modules/core/product/application/dto/product.model.schema";

// =========================
// HELPERS
// =========================

// En CREATE/UPDATE orquestado, el product_id lo resuelve el backend
// - CREATE: usa el id recién creado
// - UPDATE: usa params.productId (si tu endpoint lo trae)
type NoProductId = { product_id?: never };

// Update por id (patch)
type UpdateById<TPatch> = { id: number } & TPatch;

// Delete por objetos completos (lo que tú quieres)
type DeleteObjects<T> = T[];

// =========================
// ORCHESTRATOR — BASE (CANÓNICO)
// =========================
// Base = shape persistida + relaciones opcionales (para response/include)
// Nota: aquí rompemos el ciclo de tipos con una versión Lean de ProductProcess.

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
    // ✅ Lean para evitar ciclo infinito: process -> input_process[] -> process -> ...
    product_process?: ProductProcessOrchestratorBaseLean;
};

type ProductProcessOrchestratorBase = ProductProcessOrchestratorBaseLean & {
    product_input_process?: ProductInputProcessOrchestratorBase[];
};

type ProductDiscountRangeOrchestratorBase = ProductDiscountRangeProps & {
    product?: ProductProps;
};

// =========================
// ORCHESTRATOR — CREATE (REQUEST)
// =========================

// 🔵 ProductInput — create orquestado SIN product_id (tabla puente)
type ProductInputCreateOrchestrated =
    NoProductId &
    Omit<ProductInputCreateProps, "product_id"> & {
        // opcional: si quieres que el payload pueda venir “poblado”
        input?: InputProps;
        product?: ProductProps;
    };

// 🔵 ProductInputProcess — create orquestado
// - qty requerido
// - product_input: referencia a ProductInput create-orquestado
// type ProductInputProcessCreateOrchestrated =
//     Required<Pick<ProductInputProcessCreateProps, "qty">> &
//     Partial<Omit<ProductInputProcessCreateProps, "qty">> & {
//         product_input: ProductInputCreateOrchestrated;
//     };
type ProductInputProcessCreateOrchestrated =
    Omit<ProductInputProcessCreateProps, "product_id" | "product_input_id" | "product_process_id"> & {
        qty: ProductInputProcessCreateProps["qty"];
        product_input: ProductInputCreateOrchestrated;
    };


// 🔵 ProductProcess — create orquestado (existing OR new process)
// Caso A: asignar proceso existente
type ProductProcessAssignExisting =
    NoProductId &
    Omit<ProductProcessCreateProps, "product_id"> & {
        process_id: number;
        process?: ProcessProps;
        product?: ProductProps;
        product_input_process: ProductInputProcessCreateOrchestrated[];
    };

// Caso B: crear proceso nuevo
type ProductProcessCreateNew =
    NoProductId &
    Omit<ProductProcessCreateProps, "product_id" | "process_id"> & {
        process: ProcessCreateProps;
        process_id?: never;
        product?: ProductProps;
        product_input_process: ProductInputProcessCreateOrchestrated[];
    };

type ProductProcessCreateOrchestrated =
    | ProductProcessAssignExisting
    | ProductProcessCreateNew;

// 🔵 DiscountRange — create orquestado SIN product_id
type ProductDiscountRangeCreateOrchestrated =
    NoProductId & Omit<ProductDiscountRangeCreateProps, "product_id">;

// 🔵 ORCHESTRATOR ROOT CREATE (REQUEST)
interface ProductOrchestratorCreate {
    product: ProductCreateProps;
    products_inputs: ProductInputCreateOrchestrated[];
    product_processes: ProductProcessCreateOrchestrated[];
    product_discount_ranges: ProductDiscountRangeCreateOrchestrated[];
}

// =========================
// ORCHESTRATOR — UPDATE (REQUEST)
// =========================

// 🔵 Nested manager de ProductInputProcess (dentro de ProductProcess update)
interface ProductInputProcessManager {
    added: ProductInputProcessCreateOrchestrated[];
    updated: Array<UpdateById<ProductInputProcessUpdateProps>>;
    deleted: DeleteObjects<ProductInputProcessProps>;
}

// 🔵 ProductProcess manager (added/updated/deleted)
interface ProductProcessManager {
    added: ProductProcessCreateOrchestrated[];
    updated: Array<
        UpdateById<ProductProcessUpdateProps> & {
            // si vas a actualizar también el “join” input-process dentro del proceso
            product_input_process_updated?: ProductInputProcessManager;
        }
    >;
    deleted: DeleteObjects<ProductProcessProps>;
}

// 🔵 ProductInput manager (added/updated/deleted)
interface ProductInputManager {
    added: ProductInputCreateOrchestrated[];
    updated: Array<UpdateById<ProductInputUpdateProps>>;
    deleted: DeleteObjects<ProductInputProps>;
}

// 🔵 DiscountRange manager (added/updated/deleted)
interface ProductDiscountRangeManager {
    added: ProductDiscountRangeCreateOrchestrated[];
    updated: Array<UpdateById<ProductDiscountRangeUpdateProps>>;
    deleted: DeleteObjects<ProductDiscountRangeProps>;
}

// 🔵 ORCHESTRATOR ROOT UPDATE (REQUEST)
interface ProductOrchestratorUpdate {
    product: ProductUpdateProps; // patch del producto
    products_inputs_manager: ProductInputManager;
    product_processes_manager: ProductProcessManager;
    product_discount_ranges_manager: ProductDiscountRangeManager;
}

// =========================
// ORCHESTRATOR — RESPONSE
// =========================

// Dominio (props) — puede venir lean o con relaciones opcionales (Base)
interface ProductOrchestrator {
    product: ProductProps;
    products_inputs: ProductInputOrchestratorBase[];
    product_processes: ProductProcessOrchestratorBase[];
    product_discount_ranges: ProductDiscountRangeOrchestratorBase[];
}

// DTO (show) — mantiene tus DTOs, pero permite relaciones opcionales si el backend hace include
type ProductInputResponseOrchestrator = ProductInputResponseDto & {
    input?: InputProps;
    product?: ProductProps;
};

type ProductProcessResponseOrchestrator = ProductProcessResponseDto & {
    process?: ProcessProps;
    product?: ProductProps;
    product_input_process?: ProductInputProcessProps[]; // o su DTO si existe
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

export type {
    // BASE (CANÓNICO)
    ProductInputOrchestratorBase,
    ProductProcessOrchestratorBaseLean,
    ProductProcessOrchestratorBase,
    ProductDiscountRangeOrchestratorBase,
    ProductInputProcessOrchestratorBase,

    // CREATE (REQUEST)
    ProductInputCreateOrchestrated,
    ProductInputProcessCreateOrchestrated,
    ProductProcessAssignExisting,
    ProductProcessCreateNew,
    ProductProcessCreateOrchestrated,
    ProductDiscountRangeCreateOrchestrated,
    ProductOrchestratorCreate,
    ProductProcessResponseOrchestrator,

    // UPDATE (REQUEST)
    ProductInputProcessManager,
    ProductProcessManager,
    ProductInputManager,
    ProductDiscountRangeManager,
    ProductOrchestratorUpdate,

    // SEARCH QUERY
    ProcessSearchCriteria,

    // RESPONSE
    ProductOrchestrator,
    ProductOrchestratorResponse,
};
