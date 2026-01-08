import { productionLineProductCreateSchema, productionLineProductResponseSchema, productionLineProductUpdateSchema } from "../../../assigments/production-line-product/application/dto/production-line-product.model.schema";
import { productionLineCreateSchema, productionLineResponseSchema } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import { productResponseSchema } from "@modules/core/product/application/dto/product.model.schema";
import z from "zod";

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 Production-Line-Product                      |
// --------------------------------------------------

const productionLineProductOrchestratorCreateSchema = productionLineProductCreateSchema.omit({
    production_line_id: true
}).extend({ production_line_id: z.undefined().optional() }).strict();

// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR CREATE    |
// --------------------------------------------------

const productionLineOrchestratorCreateSchema = z.object({
    production_line: productionLineCreateSchema,
    production_line_products: z.array(productionLineProductOrchestratorCreateSchema)
});

const productionLineOrchestratorCreateRequestSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val).pipe(productionLineOrchestratorCreateSchema))
});

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 Production-Line-Product                      |
// --------------------------------------------------

const productionLineProductOrchestratorUpdateSchema = productionLineProductUpdateSchema.extend({
    id: z.number().int()
});

// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR UPDATE    |
// --------------------------------------------------

const productionLineProductManagerSchema = z.object({
    added: z.array(productionLineProductOrchestratorCreateSchema),
    updated: z.array(productionLineProductOrchestratorUpdateSchema),
    deleted: z.array(productionLineProductResponseSchema)
});

const productionLineOrchestratorUpdateRequestSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val).pipe(productionLineProductManagerSchema))
});

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

const productionLineProductOrchestratorResponseSchema = productionLineProductResponseSchema.extend({
    product: productResponseSchema,
    production_line: productionLineResponseSchema
});

const productionLineOrchestratorResponseSchema = z.object({
    production_line: productionLineResponseSchema,
    production_line_products: z.array(productionLineProductOrchestratorResponseSchema)
});

// =========================================================================================
// |                        ORCHESTRATOR — DTO                                             |
// =========================================================================================

type ProductionLineProductOrchestratorCreateDto = z.infer<typeof productionLineProductOrchestratorCreateSchema>;
type ProductionLineOrchestratorCreateDto = z.infer<typeof productionLineOrchestratorCreateSchema>;
type ProductionLineOrchestratorCreateRequestDto = z.infer<typeof productionLineOrchestratorCreateRequestSchema>;
type ProductionLineProductOrchestratorUpdateDto = z.infer<typeof productionLineProductOrchestratorUpdateSchema>;
type ProductionLineProductManagerSchemaDto = z.infer<typeof productionLineProductManagerSchema>;
type ProductionLineOrchestratorUpdateRequestDto = z.infer<typeof productionLineOrchestratorUpdateRequestSchema>;
type ProductionLineProductOrchestratorResponseDto = z.infer<typeof productionLineProductOrchestratorResponseSchema>;
type ProductionLineOrchestratorResponseDto = z.infer<typeof productionLineOrchestratorResponseSchema>;

export {
    // ******************* CREATE (REQUEST) ******************
    productionLineProductOrchestratorCreateSchema,
    productionLineOrchestratorCreateSchema,
    productionLineOrchestratorCreateRequestSchema,
    // ******************* UPDATE (REQUEST) ******************
    productionLineProductOrchestratorUpdateSchema,
    productionLineProductManagerSchema,
    productionLineOrchestratorUpdateRequestSchema,
    // ******************* RESPONSE (REQUEST) ******************
    productionLineProductOrchestratorResponseSchema,
    productionLineOrchestratorResponseSchema
}

export type {
    // ******************* CREATE (REQUEST) ******************
    ProductionLineProductOrchestratorCreateDto,
    ProductionLineOrchestratorCreateDto,
    ProductionLineOrchestratorCreateRequestDto,
    // ******************* UPDATE (REQUEST) ******************
    ProductionLineProductOrchestratorUpdateDto,
    ProductionLineProductManagerSchemaDto,
    ProductionLineOrchestratorUpdateRequestDto,
    // ******************* RESPONSE (REQUEST) ******************
    ProductionLineProductOrchestratorResponseDto,
    ProductionLineOrchestratorResponseDto
};