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

const productionLineProductCreateOrchestratorSchema = productionLineProductCreateSchema.omit({
    production_line_id: true
}).extend({ production_line_id: z.undefined().optional() }).strict();

// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR CREATE    |
// --------------------------------------------------

const productionLineCreateOrchestratorSchema = z.object({
    production_line: productionLineCreateSchema,
    production_line_products: z.array(productionLineProductCreateOrchestratorSchema)
});

const productionLineCreateRequestOrchestratorSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val).pipe(productionLineCreateOrchestratorSchema))
});

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 Production-Line-Product                      |
// --------------------------------------------------

const productionLineProductUpdateOrchestratorSchema = productionLineProductUpdateSchema.extend({
    id: z.number().int()
});

// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR UPDATE    |
// --------------------------------------------------

const productionLineProductManagerSchema = z.object({
    added: z.array(productionLineProductCreateOrchestratorSchema),
    updated: z.array(productionLineProductUpdateOrchestratorSchema),
    deleted: z.array(productionLineProductResponseSchema)
});

const productionLineUpdateRequestOrchestratorSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val).pipe(productionLineProductManagerSchema))
});

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

const productionLineProductResponseOrchestratorSchema = productionLineProductResponseSchema.extend({
    product: productResponseSchema,
    production_line: productionLineResponseSchema
});

const productionLineResponseOrchestratorSchema = z.object({
    production_line: productionLineResponseSchema,
    production_line_products: z.array(productionLineProductResponseOrchestratorSchema)
});

// =========================================================================================
// |                        ORCHESTRATOR — DTO                                             |
// =========================================================================================

type ProductionLineProductCreateOrchestratorDto = z.infer<typeof productionLineProductCreateOrchestratorSchema>;
type ProductionLineCreateOrchestratorDto = z.infer<typeof productionLineCreateOrchestratorSchema>;
type ProductionLineCreateRequestOrchestratorDto = z.infer<typeof productionLineCreateRequestOrchestratorSchema>;
type ProductionLineProductUpdateOrchestratorDto = z.infer<typeof productionLineProductUpdateOrchestratorSchema>;
type ProductionLineProductManagerSchemaDto = z.infer<typeof productionLineProductManagerSchema>;
type ProductionLineUpdateRequestOrchestratorDto = z.infer<typeof productionLineUpdateRequestOrchestratorSchema>;
type ProductionLineProductResponseOrchestratorDto = z.infer<typeof productionLineProductResponseOrchestratorSchema>;
type ProductionLineResponseOrchestratorDto = z.infer<typeof productionLineResponseOrchestratorSchema>;

export {
    // ******************* CREATE (REQUEST) ******************
    productionLineProductCreateOrchestratorSchema,
    productionLineCreateOrchestratorSchema,
    productionLineCreateRequestOrchestratorSchema,
    // ******************* UPDATE (REQUEST) ******************
    productionLineProductUpdateOrchestratorSchema,
    productionLineProductManagerSchema,
    productionLineUpdateRequestOrchestratorSchema,
    // ******************* RESPONSE (REQUEST) ******************
    productionLineProductResponseOrchestratorSchema,
    productionLineResponseOrchestratorSchema
}

export type {
    // ******************* CREATE (REQUEST) ******************
    ProductionLineProductCreateOrchestratorDto,
    ProductionLineCreateOrchestratorDto,
    ProductionLineCreateRequestOrchestratorDto,
    // ******************* UPDATE (REQUEST) ******************
    ProductionLineProductUpdateOrchestratorDto,
    ProductionLineProductManagerSchemaDto,
    ProductionLineUpdateRequestOrchestratorDto,
    // ******************* RESPONSE (REQUEST) ******************
    ProductionLineProductResponseOrchestratorDto,
    ProductionLineResponseOrchestratorDto
};