import { ProductDiscountRangeReponseSchema } from "../../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema"
import { productOrchestratorResponseSchema } from "@src/modules/features/products/orchestrator/application/product-orchestrator.model.schema"
import { ProductProcessReponseSchema } from "../../../assigments/product-process/application/dto/product-process.model.schema"
import { ProductInputReponseSchema } from "../../../assigments/product-input/application/dto/product-input.model.schema"
import { productResponseSchema, productQuerySchema } from "@modules/core/product/application/dto/product.model.schema"
import z from "zod"

const productQueryOrchestratorSchema = productOrchestratorResponseSchema;

const productQueryFullResponseSchema = productResponseSchema.extend({
    products_inputs: z.array(ProductInputReponseSchema),
    product_processes: z.array(ProductProcessReponseSchema),
    product_discount_ranges: z.array(ProductDiscountRangeReponseSchema)
});

type ProductQueryFullResponseDTO = z.infer<typeof productQueryFullResponseSchema>;
type ProductQueryOrchestorResponseDTO = z.infer<typeof productOrchestratorResponseSchema>;

export type {
    ProductQueryFullResponseDTO,
    ProductQueryOrchestorResponseDTO
};

export {
    productQueryFullResponseSchema,
    productQueryOrchestratorSchema,
    productQuerySchema
};