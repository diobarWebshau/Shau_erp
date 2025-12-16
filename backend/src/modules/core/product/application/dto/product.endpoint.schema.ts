import { productCreateSchema, productQuerySchema, productResponseSchema, productUpdateSchema } from "./product.model.schema";
import type { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";

/**
 * Schema
 * ------------------------------------------------------------------
 * Define la estructura y reglas de validación para este endpoint.
 * Especifica los parámetros, query, body y el formato esperado
 * en la respuesta, asegurando consistencia en la comunicación
 * entre capas y contratos de la API.
 *
 * Convención:
 * Los schemas asociados a endpoints se nombran con el prefijo
 * de la operación (GET, POST, PATCH, DELETE) seguido de la ruta,
 * para dejar claro qué acción representan dentro del sistema.
 */

/**
 * Schema: GET /product
 * ------------------------------------------------------------------
 */
const getAllProductsSchema = z.object({
    params: z.object({}).strict(),
    query: productQuerySchema,
    body: z.object({}).strict(),
    response: z.array(productResponseSchema)
});

/**
 * Schema: GET /product/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productResponseSchema.nullable(),
});

/**
 * Schema: GET /product/name/:name
 * ------------------------------------------------------------------
 */
const getByNameProductSchema = z.object({
    params: z.object({ name: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productResponseSchema.nullable(),
});

/**
 * Schema: GET /product/barcode/:barcode
 * ------------------------------------------------------------------
 */
const getByBarcodeProductSchema = z.object({
    params: z.object({ barcode: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productResponseSchema.nullable(),
});

/**
 * Schema: GET /product/sku/:sku
 * ------------------------------------------------------------------
 */
const getBySkuProductSchema = z.object({
    params: z.object({ sku: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productResponseSchema.nullable(),
});

/**
 * Schema: GET /product/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
const getByCustomIdProductSchema = z.object({
    params: z.object({ custom_id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productResponseSchema.nullable(),
});

/**
 * Schema: POST /product
 * ------------------------------------------------------------------
 */
const createProductSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: productCreateSchema,
    response: productResponseSchema,
});

/**
 * Schema: PATCH /product/:id
 * ------------------------------------------------------------------
 */
const updateProductSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: productUpdateSchema,
    response: productResponseSchema,
});

/**
 * Schema: DELETE /product/:id
 * ------------------------------------------------------------------
 */
const deleteProductSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.null(),
});

/**
 * EndpointSchema Tipado
 * ------------------------------------------------------------------
 * Define el tipo derivado de un schema de endpoint mediante `z.infer`.
 * Este tipo representa el contrato de datos para la operación,
 * incluyendo parámetros, cuerpo, query y respuesta.
 *
 * Función técnica:
 * - Garantizar que la definición del endpoint esté alineada con su schema.
 * - Tipar de forma estricta cada parte de la operación (params, body, query, response).
 * - Proveer un contrato reutilizable para controladores, casos de uso y pruebas.
 *
 * Qué hace:
 * - Encapsula la estructura validada del endpoint en un tipo TypeScript.
 * - Asegura consistencia entre validación (Zod) y tipado en el código.
 * - Facilita el mantenimiento y reduce errores en la comunicación entre capas.
 *
 * Qué no hace:
 * - No contiene lógica de negocio ni validaciones propias.
 * - No representa entidades del dominio.
 * - No maneja infraestructura ni persistencia.
 *
 * Convención de nombres:
 * Se nombran con el patrón `GetById...Schema` (o equivalente según la operación)
 * para indicar que son tipos derivados de un schema de endpoint específico.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Schemas: definen validación y estructura de datos.
 * - EndpointSchema Tipado: traduce esos schemas a contratos de tipos.
 * - UseCases: consumen estos contratos para ejecutar operaciones.
 * - Orchestrators: exponen endpoints que utilizan estos tipos para garantizar
 *   integridad en la comunicación externa.
 */

type GetAllProductsSchema = EndpointSchema<
    z.infer<typeof getAllProductsSchema>["params"],
    z.infer<typeof getAllProductsSchema>["body"],
    z.infer<typeof getAllProductsSchema>["query"],
    z.infer<typeof getAllProductsSchema>["response"]
>;

type GetByIdProductSchema = EndpointSchema<
    z.infer<typeof getByIdProductSchema>["params"],
    z.infer<typeof getByIdProductSchema>["body"],
    z.infer<typeof getByIdProductSchema>["query"],
    z.infer<typeof getByIdProductSchema>["response"]
>;

type GetByNameProductSchema = EndpointSchema<
    z.infer<typeof getByNameProductSchema>["params"],
    z.infer<typeof getByNameProductSchema>["body"],
    z.infer<typeof getByNameProductSchema>["query"],
    z.infer<typeof getByNameProductSchema>["response"]
>;

type GetByBarcodeProductSchema = EndpointSchema<
    z.infer<typeof getByBarcodeProductSchema>["params"],
    z.infer<typeof getByBarcodeProductSchema>["body"],
    z.infer<typeof getByBarcodeProductSchema>["query"],
    z.infer<typeof getByBarcodeProductSchema>["response"]
>;

type GetByCustomIdProductSchema = EndpointSchema<
    z.infer<typeof getByCustomIdProductSchema>["params"],
    z.infer<typeof getByCustomIdProductSchema>["body"],
    z.infer<typeof getByCustomIdProductSchema>["query"],
    z.infer<typeof getByCustomIdProductSchema>["response"]
>;
type GetBySkuProductSchema = EndpointSchema<
    z.infer<typeof getBySkuProductSchema>["params"],
    z.infer<typeof getBySkuProductSchema>["body"],
    z.infer<typeof getBySkuProductSchema>["query"],
    z.infer<typeof getBySkuProductSchema>["response"]
>;

type CreateProductSchema = EndpointSchema<
    z.infer<typeof createProductSchema>["params"],
    z.infer<typeof createProductSchema>["body"],
    z.infer<typeof createProductSchema>["query"],
    z.infer<typeof createProductSchema>["response"]
>;

type UpdateProductSchema = EndpointSchema<
    z.infer<typeof updateProductSchema>["params"],
    z.infer<typeof updateProductSchema>["body"],
    z.infer<typeof updateProductSchema>["query"],
    z.infer<typeof updateProductSchema>["response"]
>;

type DeleteProductSchema = EndpointSchema<
    z.infer<typeof deleteProductSchema>["params"],
    z.infer<typeof deleteProductSchema>["body"],
    z.infer<typeof deleteProductSchema>["query"],
    z.infer<typeof deleteProductSchema>["response"]
>;

export {
    getByIdProductSchema,
    getAllProductsSchema,
    getByBarcodeProductSchema,
    getByCustomIdProductSchema,
    getByNameProductSchema,
    getBySkuProductSchema,

    deleteProductSchema,
    createProductSchema,
    updateProductSchema,
};

export type {
    GetAllProductsSchema,
    GetByIdProductSchema,
    GetByBarcodeProductSchema,
    GetByCustomIdProductSchema,
    GetByNameProductSchema,
    GetBySkuProductSchema,

    UpdateProductSchema,
    CreateProductSchema,
    DeleteProductSchema,
};