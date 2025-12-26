import { ProductDiscountRangeCreateSchema, ProductDiscountRangeReponseSchema, ProductDiscountRangeUpdateSchema } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { productInputProcessCreateSchema, productInputProcessReponseSchema, productInputProcessUpdateSchema } from "../../assigments/product-input-process/application/dto/product-input-process.model.schema";
import { ProductProcessCreateSchema, ProductProcessReponseSchema, ProductProcessUpdateSchema } from "../../assigments/product-process/application/dto/product-process.model.schema";
import { ProductInputCreateSchema, ProductInputReponseSchema, ProductInputUpdateSchema } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { productCreateSchema, productResponseSchema, productUpdateSchema, productQuerySchema } from "@modules/core/product/application/dto/product.model.schema";
import { processCreateSchema } from "@modules/core/process/application/dto/process.model.schema";
import { z } from "zod";

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// ! No debe tener identificadores aun no existentes, o identificadores que apenas se crearan en la request
// ! No debe contener product_id, porque aun no existe el producto
// ! Tampoco debe contener ninguna relacion identificada(creada en bd)

// --------------------------------------------------
// 🔹 PRODUCT-INPUT                                 |
// --------------------------------------------------

// * Product-Input en creación del producto
const productInputOrchestratorCreateSchema = ProductInputCreateSchema
    .omit({ product_id: true })
    .extend({
        product_id: z.undefined().optional()
    }).strict();

// --------------------------------------------------
// 🔹 PRODUCT-INPUT-PROCESS                         |
// --------------------------------------------------

// * Product-Input-Process en creacion del Producto.
// * Es necesario obtener una relacion no identificada para poder tener contexto de
// * cual input esta relacionado con el product-process
const productInputProcessOrchestratorCreateSchema = productInputProcessCreateSchema
    .omit({
        product_id: true,
        product_input_id: true,
        product_process_id: true,
    }).extend({ qty: z.number(), product_input: productInputOrchestratorCreateSchema });

// --------------------------------------------------
// 🔹 PRODUCT-PROCESS                               |
// --------------------------------------------------    

// * Product-Process en creación del Producto
const ProductProcessBaseCreate = ProductProcessCreateSchema.omit({
    product_id: true,
    process_id: true,
});

// * Product-Process en el caso de ser un proceso ya existente
// * Es necesario obtener una relacion no identificada para poder tener contexto de
// * la relacion de proceso del producto con la cantidad de insumos consumidas
const productProcessUsingExistingSchema = ProductProcessBaseCreate.extend({
    process_id: z.number().int(),
    product_input_process: z.array(productInputProcessOrchestratorCreateSchema).default([]),
});

// * ProductProcess en el caso de ser un nuevo proceso
// * Es necesario obtener una relacion no identificada para poder tener contexto de
// * la relacion de proceso del producto con la cantidad de insumos consumidas 
const productProcessUsingNewSchema = ProductProcessBaseCreate.extend({
    process: processCreateSchema,
    process_id: z.undefined().optional(),
    product_input_process: z.array(productInputProcessOrchestratorCreateSchema).default([]),
});

// * Unificación del tipado de los casos de Product-Process 
const productProcessOrchestratorCreateSchema = z.union([
    productProcessUsingExistingSchema,
    productProcessUsingNewSchema,
]);

// --------------------------------------------------
// 🔹 PRODUCT-DISCOUNT-RANGE                        |
// --------------------------------------------------

// * Product-Discount-Range en creación del Producto
const productDiscountRangeOrchestratorCreateSchema = ProductDiscountRangeCreateSchema
    .omit({ product_id: true })
    .extend({
        product_id: z.undefined().optional(),
    });

// --------------------------------------------------
// 🔹 OBJECT PRODUCT ORCHESTRATOR CREATE            |
// --------------------------------------------------

// * Esquema del payload para crear el producto
const productOrchestratorCreateSchema = z.object({
    product: productCreateSchema,
    products_inputs: z.array(productInputOrchestratorCreateSchema),
    product_processes: z.array(productProcessOrchestratorCreateSchema),
    product_discount_ranges: z.array(productDiscountRangeOrchestratorCreateSchema),
});

// * Esquema de la request para el REQUEST HTTP en CREATE
const productOrchestratorCreateRequestSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val)).pipe(productOrchestratorCreateSchema),
    photo: z.string().optional(),
});

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// 🔹 PRODUCT-INPUT-PROCESS                         |
// --------------------------------------------------

// * Product-Input-Process en actualización del producto
const productInputProcessOrchestratorUpdateSchema = productInputProcessUpdateSchema.extend({
    id: z.number().int(),
});

// * Product-Input-Process MANAGER
const productInputProcessManagerSchema = z.object({
    added: z.array(productInputProcessOrchestratorCreateSchema),
    updated: z.array(productInputProcessOrchestratorUpdateSchema),
    deleted: z.array(productInputProcessReponseSchema),
});

// --------------------------------------------------
// 🔹 PRODUCT-PROCESS                               |
// --------------------------------------------------

// * Product-Process en actualización del producto
const productProcessOrchestratorUpdateSchema = ProductProcessUpdateSchema.extend({
    id: z.number().int(),
    product_input_process_updated: productInputProcessManagerSchema.optional(),
});

// * Product-Process MANAGER
const productProcessManagerSchema = z.object({
    added: z.array(productProcessOrchestratorCreateSchema),
    updated: z.array(productProcessOrchestratorUpdateSchema),
    deleted: z.array(ProductProcessReponseSchema),
});

// --------------------------------------------------
// 🔹 PRODUCT-INPUT                                 |
// --------------------------------------------------

// * Product-Input en actualización del producto
const productInputOrchestratorUpdateSchema = ProductInputUpdateSchema.extend({
    id: z.number().int(),
});

// * Product-Input MANAGER
const productInputManagerSchema = z.object({
    added: z.array(productInputOrchestratorCreateSchema),
    updated: z.array(productInputOrchestratorUpdateSchema),
    deleted: z.array(ProductInputReponseSchema),
});

// --------------------------------------------------
// 🔹 PRODUCT-DISCOUNT-RANGE                        |
// --------------------------------------------------

// * Product-Discount-Range en actualización del producto
const productDiscountRangeOrchestratorUpdateSchema = ProductDiscountRangeUpdateSchema.extend({
    id: z.number().int(),
});

// * Product-Discount-Range MANAGER
const productDiscountRangeManagerSchema = z.object({
    added: z.array(productDiscountRangeOrchestratorCreateSchema),
    updated: z.array(productDiscountRangeOrchestratorUpdateSchema),
    deleted: z.array(ProductDiscountRangeReponseSchema),
});

// --------------------------------------------------
// 🔹 OBJECT PRODUCT ORCHESTRATOR UPDATE            |
// --------------------------------------------------

// * Esquema del payload para actualizar el producto
const productOrchestratorUpdateSchema = z.object({
    product: productUpdateSchema,
    products_inputs_manager: productInputManagerSchema,
    product_processes_manager: productProcessManagerSchema,
    product_discount_ranges_manager: productDiscountRangeManagerSchema,
});

const productOrchestratorUpdateRequestSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val)).pipe(productOrchestratorUpdateSchema),
    photo: z.string().optional(),
});

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

// * Esquema de respuesta para Product-Process
const productProcessResponseOrchestratorSchema = ProductProcessReponseSchema.extend({
    product_input_process: z.array(productInputProcessReponseSchema).optional(),
});

// * Esquema de respuesta para Product
const productOrchestratorResponseSchema = z.object({
    product: productResponseSchema,
    products_inputs: z.array(ProductInputReponseSchema),
    product_processes: z.array(productProcessResponseOrchestratorSchema),
    product_discount_ranges: z.array(ProductDiscountRangeReponseSchema),
});

// =========================================================================================
// |                        ORCHESTRATOR — DTO                                             |
// =========================================================================================

type ProductOrchestratorUpdateDTO = z.infer<typeof productOrchestratorUpdateSchema>;
type ProductOrchestratorCreateDTO = z.infer<typeof productOrchestratorCreateSchema>;
type ProductOrchestratorReponseDTO = z.infer<typeof productOrchestratorResponseSchema>;
type ProductOrchestratorPayloadDTO = z.infer<typeof productOrchestratorCreateRequestSchema>;

export type {
    ProductOrchestratorCreateDTO,
    ProductOrchestratorUpdateDTO,
    ProductOrchestratorReponseDTO,
    ProductOrchestratorPayloadDTO
};

export {
    productOrchestratorCreateSchema,
    productOrchestratorUpdateSchema,
    productOrchestratorResponseSchema,
    productQuerySchema,

    // REQUEST HTTP
    productOrchestratorCreateRequestSchema,
    productOrchestratorUpdateRequestSchema
};
