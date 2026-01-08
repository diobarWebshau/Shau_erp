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
import { InputResponseDto } from "@src/modules/core/input/application/dto/input.model.schema";
import { ProcessResponseDto } from "@src/modules/core/process/application/dto/process.model.schema";
import { ProductInputProcessResponseDto } from "../../assigments/product-input-process/application/dto/product-input-process.model.schema";

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

// * Props = shape persistida + relaciones opcionales (para response/include)
// * Nota: aquí rompemos el ciclo de tipos con una versión Lean de ProductProcess.

type ProductInputOrchestratorProps = ProductInputProps & {
    input: InputProps;
    product: ProductProps;
};

type ProductProcessOrchestratorPropsLean = ProductProcessProps & {
    process: ProcessProps;
    product: ProductProps;
};

type ProductInputProcessOrchestratorProps = ProductInputProcessProps & {
    product: ProductProps;
    product_input: ProductInputOrchestratorProps;
    product_process: ProductProcessOrchestratorPropsLean;
};

type ProductProcessOrchestratorProps = ProductProcessOrchestratorPropsLean & {
    product_input_process: ProductInputProcessOrchestratorProps[];
};

type ProductDiscountRangeOrchestratorProps = ProductDiscountRangeProps & {
    product: ProductProps;
};

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// 🔹 PRODUCT-INPUT                                 |
// --------------------------------------------------

// * ProductInput SIN product_id
type ProductInputOrchestratorCreateProps =
    NoProductId &
    Omit<ProductInputCreateProps, "product_id"> & {
        // opcional: si quieres que el payload pueda venir “poblado”
        input: InputProps;
        product?: ProductProps;
    };

// * ProductInputProcess 
type ProductInputProcessOrchestratorCreateProps =
    Omit<ProductInputProcessCreateProps, "product_id" | "product_input_id" | "product_process_id"> & {
        qty: ProductInputProcessCreateProps["qty"];
        product_input: ProductInputOrchestratorCreateProps;
    };

// --------------------------------------------------
// 🔹 PRODUCT-PROCESS                               |
// --------------------------------------------------

// * Caso A: asignar proceso existente
type ProductProcessOrchestratorAssignExistingProps =
    NoProductId &
    Omit<ProductProcessCreateProps, "product_id"> & {
        process_id: number;
        process?: ProcessProps;
        product?: ProductProps;
        product_input_process: ProductInputProcessOrchestratorCreateProps[];
    };

// * Caso B: crear proceso nuevo
type ProductProcessOrchestratorCreateNewProps =
    NoProductId &
    Omit<ProductProcessCreateProps, "product_id" | "process_id"> & {
        process: ProcessCreateProps;
        process_id?: never;
        product?: ProductProps;
        product_input_process: ProductInputProcessOrchestratorCreateProps[];
    };

// * Unificación del tipado de los casos de Product-Process 
type ProductProcessOrchestratorCreateProps =
    | ProductProcessOrchestratorAssignExistingProps
    | ProductProcessOrchestratorCreateNewProps;

// --------------------------------------------------
// 🔹 PRODUCT-DISCOUNT-RANGE                        |
// --------------------------------------------------

// * Product-Discount-Range en actualización del producto, SIN PRODUCT_ID
type ProductDiscountRangeOrchestratorCreateProps =
    NoProductId & Omit<ProductDiscountRangeCreateProps, "product_id">;

// * Product-Discount-Range MANAGER
interface ProductOrchestratorCreateProps {
    product: ProductCreateProps;
    products_inputs: ProductInputOrchestratorCreateProps[];
    product_processes: ProductProcessOrchestratorCreateProps[];
    product_discount_ranges: ProductDiscountRangeOrchestratorCreateProps[];
}

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// 🔹 PRODUCT-INPUT-PROCESS                         |
// --------------------------------------------------

// * Product-Input-Process en actualización con ID
type ProductInputProcessOrchestratorUpdateProps = UpdateById<ProductInputProcessUpdateProps>;
// * PRODUCT-INPUT-PROCESS (MANAGER)
interface ProductInputProcessManager {
    added: ProductInputProcessOrchestratorCreateProps[];
    updated: Array<ProductInputProcessOrchestratorUpdateProps>;
    deleted: Array<ProductInputProcessProps>;
}

// --------------------------------------------------
// 🔹 PRODUCT-PROCESS                               |
// --------------------------------------------------

// * Product-Process en actualizacion con ID, y el manager de ProductInputProcess
type ProductProcessOrchestratorUpdateProps = UpdateById<ProductProcessUpdateProps> & {
    product_input_process_updated?: ProductInputProcessManager
};
// * PRODUCT-PROCESS (MANAGER)
interface ProductProcessManager {
    added: Array<ProductProcessOrchestratorCreateProps>,
    updated: Array<ProductProcessOrchestratorUpdateProps>,
    deleted: Array<ProductProcessProps>
}

// --------------------------------------------------
// 🔹 PRODUCT-INPUT                                 |
// --------------------------------------------------

// * Product-Input en actualizacion con ID
type ProductInputOrchestratorUpdateProps = UpdateById<ProductInputUpdateProps>;
// * PRODUCT-INPUT (MANAGER)
interface ProductInputManager {
    added: Array<ProductInputOrchestratorCreateProps>;
    updated: Array<ProductInputOrchestratorUpdateProps>;
    deleted: Array<ProductInputProps>;
};

// --------------------------------------------------
// 🔹 PRODUCT-DISCOUNT-RANGE                        |
// --------------------------------------------------

// * Product-Discount-Range manager (added/updated/deleted)
type ProductDiscountRangeOrchestratorUpdateProps = UpdateById<ProductDiscountRangeUpdateProps>;
interface ProductDiscountRangeManager {
    added: ProductDiscountRangeOrchestratorCreateProps[];
    updated: Array<ProductDiscountRangeOrchestratorUpdateProps>;
    deleted: Array<ProductDiscountRangeProps>;
};

// --------------------------------------------------
// 🔹 OBJECT PRODUCT ORCHESTRATOR UPDATE            |
// --------------------------------------------------

// * Esquema del objeto para actualizar un producto desde el orquestador
interface ProductOrchestratorUpdateProps {
    product: ProductUpdateProps; // patch del producto
    products_inputs_manager: ProductInputManager;
    product_processes_manager: ProductProcessManager;
    product_discount_ranges_manager: ProductDiscountRangeManager;
}

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

// Dominio (props) — puede venir lean o con relaciones opcionales (Props)
interface ProductOrchestrator {
    product: ProductProps;
    products_inputs: ProductInputOrchestratorProps[];
    product_processes: ProductProcessOrchestratorProps[];
    product_discount_ranges: ProductDiscountRangeOrchestratorProps[];
}

// * pero permite relaciones opcionales si el backend hace include
type ProductInputOrchestratorResponseProp = ProductInputResponseDto & {
    input: InputResponseDto;
    product: ProductResponseDto;
};

type ProductProcessOrchestratorResponseProps = ProductProcessResponseDto & {
    process: ProcessResponseDto;
    product: ProductResponseDto;
    product_input_process: ProductInputProcessResponseDto[];
};

type ProductDiscountRangeOrchestratorResponseProps = ProductDiscountRangeResponseDto & {
    product: ProductResponseDto;
};

interface ProductOrchestratorResponseProps {
    product: ProductResponseDto;
    products_inputs: ProductInputOrchestratorResponseProp[];
    product_processes: ProductProcessOrchestratorResponseProps[];
    product_discount_ranges: ProductDiscountRangeOrchestratorResponseProps[];
}

// =========================================================================================
// |                                    IMPORTS                                            |
// =========================================================================================

export type {

    // *******************  Props (CANÓNICO) ******************
    ProductInputOrchestratorProps,
    ProductProcessOrchestratorPropsLean,
    ProductProcessOrchestratorProps,
    ProductDiscountRangeOrchestratorProps,
    ProductInputProcessOrchestratorProps,

    // ******************* CREATE (REQUEST) ******************
    ProductInputOrchestratorCreateProps,
    ProductInputProcessOrchestratorCreateProps,
    ProductProcessOrchestratorAssignExistingProps,
    ProductProcessOrchestratorCreateNewProps,
    ProductProcessOrchestratorCreateProps,
    ProductDiscountRangeOrchestratorCreateProps,
    ProductOrchestratorCreateProps,
    ProductProcessOrchestratorResponseProps,

    // ******************* UPDATE (REQUEST) ******************
    // ? managers
    ProductInputProcessManager,
    ProductProcessManager,
    ProductInputManager,
    ProductDiscountRangeManager,
    // ? products
    ProductOrchestratorUpdateProps,
    // ? product input process
    ProductInputProcessOrchestratorUpdateProps,
    ProductInputProcessProps,
    // ? product process
    ProductProcessOrchestratorUpdateProps,
    ProductProcessProps,
    // ? product input
    ProductInputOrchestratorUpdateProps,
    ProductInputProps,
    // ? product discount range
    ProductDiscountRangeOrchestratorUpdateProps,
    ProductDiscountRangeProps,

    // ******************* SEARCH QUERY ******************
    ProcessSearchCriteria,

    // ******************* RESPONSE ******************
    ProductOrchestrator,
    ProductOrchestratorResponseProps,
};
