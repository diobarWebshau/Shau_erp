import { productionLineProductOrchestratorResponseSchema, productionLineOrchestratorResponseSchema } from "@modules/features/production-line/orchestrator/application/dto/production-line-orchestrator.model.schema";
import { productionLineResponseSchema, productionLineQuerySchema } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import { ProductionLineQueryDto } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import z from "zod";


const productionLineQueryOrchestratorSchema = productionLineOrchestratorResponseSchema;

const productionLinQueryFullResponseSchema = productionLineResponseSchema.extend({
    production_line_products: z.array(productionLineProductOrchestratorResponseSchema)
});

type ProductionLineQueryFullOrchestratorResponseDto = z.infer<typeof productionLineQueryOrchestratorSchema>;
type ProductionLineQueryFullResponseDto = z.infer<typeof productionLinQueryFullResponseSchema>;

export type {
    ProductionLineQueryFullOrchestratorResponseDto,
    ProductionLineQueryFullResponseDto,
    ProductionLineQueryDto
};

export {
    productionLineQueryOrchestratorSchema,
    productionLinQueryFullResponseSchema,
    productionLineQuerySchema
};