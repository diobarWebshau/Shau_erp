import { ProductionLineProductCreateProps, ProductionLineProductProps, ProductionLineProductUpdateProps } from "../../assigments/production-line-product/domain/production-line-product.types";
import { ProductionLineProductResponseDto } from "../../assigments/production-line-product/application/dto/production-line-product.model.schema";
import { ProductionLineCreateProps, ProductionLineProps } from "@modules/core/production-line/domain/production-line.types";
import { ProductionLineResponseDto } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { ProductResponseDto } from "@src/modules/core/product/application/dto/product.model.schema";


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

type ProductionLineOrchestratorProps = ProductionLineProps & {
    production_line_products: ProductionLineProductProps[]
};

type ProductionLineProductOrchestratorProps = ProductionLineProductProps & {
    product: ProductProps,
    production_line: ProductionLineProps
};

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 PRODUCTION-LINE-PRODUCT                      |
// --------------------------------------------------

type ProductionLineProductOrchestratorCreateProps = NoProductionLineId &
    Omit<ProductionLineProductCreateProps, "production_line_id">;

// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR CREATE    |
// --------------------------------------------------

interface ProductionLineOrchestratorCreateProps {
    production_line: ProductionLineCreateProps,
    production_line_products: Array<ProductionLineProductOrchestratorCreateProps>
};

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 PRODUCTION-LINE-PRODUCT                      |
// --------------------------------------------------

type ProductionLineProductOrchestratorUpdateProps = UpdateById<ProductionLineProductUpdateProps>;

interface ProductionLineProductManager {
    added: Array<ProductionLineProductOrchestratorCreateProps>,
    updated: Array<ProductionLineProductOrchestratorUpdateProps>,
    deleted: Array<ProductionLineProductResponseDto>
}

// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR UPDATE    |
// --------------------------------------------------

interface ProductionLineOrchestratorUpdateProps {
    production_line: ProductionLineCreateProps,
    production_line_products_manager: ProductionLineProductManager
};


// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================


type ProductionLineProductOrchestratorResponseProps = ProductionLineProductResponseDto & {
    product: ProductResponseDto,
    production_line: ProductionLineResponseDto
};

interface ProductionLineOrchestrator {
    production_line: ProductionLineProps,
    production_line_products: ProductionLineProductOrchestratorProps[]
};

interface ProductionLineOrchestratorResponseProps {
    production_line: ProductionLineResponseDto,
    production_line_products: Array<ProductionLineProductOrchestratorResponseProps>
};

// =========================================================================================
// |                                    IMPORTS                                            |
// =========================================================================================

export type {
    // *******************  Props (CANÓNICO) ******************
    ProductionLineOrchestratorProps,
    ProductionLineProductOrchestratorProps,

    // ******************* CREATE (REQUEST) ******************
    ProductionLineProductOrchestratorCreateProps,
    ProductionLineOrchestratorCreateProps,

    // ******************* UPDATE (REQUEST) ******************
    ProductionLineProductOrchestratorUpdateProps,
    ProductionLineOrchestratorUpdateProps,

    // ******************* RESPONSE ******************
    ProductionLineOrchestrator,
    ProductionLineOrchestratorResponseProps
}

