import { productionLineProductResponseOrchestratorSchema, productionLineResponseOrchestratorSchema } from "@modules/features/production-line/orchestrator/application/dto/production-line-orchestrator.model.schema";
import { productionLineResponseSchema, ProductionLineQuerySchema } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import z from "zod";

const productionLineQueryOrchestratorSchema = productionLineResponseOrchestratorSchema;
const productionLinQueryResponseSchema = productionLineResponseSchema.extend({
    production_line_products: z.array(productionLineProductResponseOrchestratorSchema)
});

type ProductionLineQueryFullResponseDto = z.infer<typeof productionLineQueryOrchestratorSchema>;
type ProductionLineQueryFullOrchestratorDto = z.infer<typeof productionLinQueryResponseSchema>;

export type {
    ProductionLineQueryFullResponseDto,
    ProductionLineQueryFullOrchestratorDto
};

export {
    productionLineQueryOrchestratorSchema,
    productionLinQueryResponseSchema,
    ProductionLineQuerySchema
};