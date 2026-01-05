import { ProductionLineProductCreateProps, ProductionLineProductProps, ProductionLineProductUpdateProps } from "../../assigments/production-line-product/domain/production-line-product.types";
import { ProductionLineCreateProps, ProductionLineProps} from "@modules/core/production-line/domain/production-line.types";
import { ProductionLineProductResponseDto } from "../../assigments/production-line-product/application/dto/production-line-product.model.schema";
import { ProductionLineResponseDto } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import { ProductProps } from "@modules/core/product/domain/product.types";


// =========================================================================================
// |                                 HELPERS TYPED                                         |
// =========================================================================================

// * Tipado que prohibe que un tipo contenga el identificador del producto
type NoProductionLineId = { production_line_id?: never };

// * Tipo generico que añade el atributo id al tipo enviado como parametro
type UpdateById<TPatch> = { id: number } & TPatch;

// =========================================================================================
// |                         ORCHESTRATOR — BASE (CANÓNICO)                                |
// =========================================================================================

type ProductionLineOrchestratorBase = ProductionLineProps & {
    production_line_products: ProductionLineProductProps[]
};

type ProductionLineProductOrchestratorBase = ProductionLineProductProps & {
    product: ProductProps,
    production_line: ProductionLineProps
};

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 PRODUCTION-LINE-PRODUCT                      |
// --------------------------------------------------

type ProductionLineProductCreateOrchestrator = NoProductionLineId &
    Omit<ProductionLineProductCreateProps, "production_line_id">;

// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR CREATE    |
// --------------------------------------------------

interface ProductionLineCreateOrchestrator {
    production_line: ProductionLineCreateProps,
    production_line_products: ProductionLineProductCreateOrchestrator[]
};

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 PRODUCTION-LINE-PRODUCT                      |
// --------------------------------------------------

type ProductionLineProductUpdateOrchestrator = UpdateById<ProductionLineProductUpdateProps>;

interface ProductionLineProductManager {
    added: Array<ProductionLineProductCreateOrchestrator>,
    updated: Array<ProductionLineProductUpdateOrchestrator>,
    deleted: Array<ProductionLineProductResponseDto>
}

// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR UPDATE    |
// --------------------------------------------------

interface ProductionLineUpdateOrchestrator {
    production_line: ProductionLineCreateProps,
    production_line_products_manager: ProductionLineProductManager
};


// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================


interface ProductionLineOrchestrator {
    production_line: ProductionLineProps,
    production_line_products: ProductionLineProductOrchestratorBase[]
};

interface ProductionLineOrchestratorResponse {
    production_line: ProductionLineResponseDto,
    production_line_products: ProductionLineProductResponseDto
};

// =========================================================================================
// |                                    IMPORTS                                            |
// =========================================================================================

export type {
    // *******************  BASE (CANÓNICO) ******************
    ProductionLineOrchestratorBase,
    ProductionLineProductOrchestratorBase,

    // ******************* CREATE (REQUEST) ******************
    ProductionLineProductCreateOrchestrator,
    ProductionLineCreateOrchestrator,

    // ******************* UPDATE (REQUEST) ******************
    ProductionLineProductUpdateOrchestrator,
    ProductionLineUpdateOrchestrator,

    // ******************* RESPONSE ******************
    ProductionLineOrchestrator,
    ProductionLineOrchestratorResponse
}

