import { ProductionLineProductCreateProps, ProductionLineProductProps, ProductionLineProductUpdateProps } from "../../assigments/production-line-product/domain/production-line-product.types";
import { ProductionLineCreateProps, ProductionLineProps } from "@modules/core/production-line/domain/production-line.types";
import { ProductionLineProductResponseDto } from "../../assigments/production-line-product/application/dto/production-line-product.model.schema";
import { ProductionLineResponseDto } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import { ProductProps } from "@modules/core/product/domain/product.types";
type NoProductionLineId = {
    production_line_id?: never;
};
type UpdateById<TPatch> = {
    id: number;
} & TPatch;
type ProductionLineOrchestratorBase = ProductionLineProps & {
    production_line_products: ProductionLineProductProps[];
};
type ProductionLineProductOrchestratorBase = ProductionLineProductProps & {
    product: ProductProps;
    production_line: ProductionLineProps;
};
type ProductionLineProductCreateOrchestrator = NoProductionLineId & Omit<ProductionLineProductCreateProps, "production_line_id">;
interface ProductionLineCreateOrchestrator {
    production_line: ProductionLineCreateProps;
    production_line_products: ProductionLineProductCreateOrchestrator[];
}
type ProductionLineProductUpdateOrchestrator = UpdateById<ProductionLineProductUpdateProps>;
interface ProductionLineProductManager {
    added: Array<ProductionLineProductCreateOrchestrator>;
    updated: Array<ProductionLineProductUpdateOrchestrator>;
    deleted: Array<ProductionLineProductResponseDto>;
}
interface ProductionLineUpdateOrchestrator {
    production_line: ProductionLineCreateProps;
    production_line_products_manager: ProductionLineProductManager;
}
interface ProductionLineOrchestrator {
    production_line: ProductionLineProps;
    production_line_products: ProductionLineProductOrchestratorBase[];
}
interface ProductionLineOrchestratorResponse {
    production_line: ProductionLineResponseDto;
    production_line_products: ProductionLineProductResponseDto;
}
export type { ProductionLineOrchestratorBase, ProductionLineProductOrchestratorBase, ProductionLineProductCreateOrchestrator, ProductionLineCreateOrchestrator, ProductionLineProductUpdateOrchestrator, ProductionLineUpdateOrchestrator, ProductionLineOrchestrator, ProductionLineOrchestratorResponse };
