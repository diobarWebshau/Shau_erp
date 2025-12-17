import { ProductDiscountClientCreateSchema, ProductDiscountClientReponseSchema, ProductDiscountClientUpdateSchema } from "./product-discount-client.model.schema";
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
 * Schema: GET /location-location-type
 * ------------------------------------------------------------------
 */
const getAllProductDiscountClientSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(ProductDiscountClientReponseSchema),
});

/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductDiscountClientSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: ProductDiscountClientReponseSchema.nullable(),
});

/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByProductIdClientIdProductDiscountClientSchema = z.object({
    params: z.object({ product_id: z.string(), client_id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: ProductDiscountClientReponseSchema.nullable(),
});

/**
 * Schema: GET /location-location-type/product/:product_id
 * ------------------------------------------------------------------
 */
const getByProductIdProductDiscountClientSchema = z.object({
    params: z.object({ client_id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(ProductDiscountClientReponseSchema),
});

/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
const createProductDiscountClientSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: ProductDiscountClientCreateSchema,
    response: ProductDiscountClientReponseSchema,
});

/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
const updateProductDiscountClientSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: ProductDiscountClientUpdateSchema,
    response: ProductDiscountClientReponseSchema,
});

/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProductDiscountClientSchema = z.object({
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

type GetAllProductDiscountClientsSchema = EndpointSchema<
    z.infer<typeof getAllProductDiscountClientSchema>["params"],
    z.infer<typeof getAllProductDiscountClientSchema>["body"],
    z.infer<typeof getAllProductDiscountClientSchema>["query"],
    z.infer<typeof getAllProductDiscountClientSchema>["response"]
>;

type GetByIdProductDiscountClientSchema = EndpointSchema<
    z.infer<typeof getByIdProductDiscountClientSchema>["params"],
    z.infer<typeof getByIdProductDiscountClientSchema>["body"],
    z.infer<typeof getByIdProductDiscountClientSchema>["query"],
    z.infer<typeof getByIdProductDiscountClientSchema>["response"]
>;


type GetByProductIdClientIdProductDiscountClientSchema = EndpointSchema<
    z.infer<typeof getByProductIdClientIdProductDiscountClientSchema>["params"],
    z.infer<typeof getByProductIdClientIdProductDiscountClientSchema>["body"],
    z.infer<typeof getByProductIdClientIdProductDiscountClientSchema>["query"],
    z.infer<typeof getByProductIdClientIdProductDiscountClientSchema>["response"]
>;

type GetByProductIdProductDiscountClientSchema = EndpointSchema<
    z.infer<typeof getByProductIdProductDiscountClientSchema>["params"],
    z.infer<typeof getByProductIdProductDiscountClientSchema>["body"],
    z.infer<typeof getByProductIdProductDiscountClientSchema>["query"],
    z.infer<typeof getByProductIdProductDiscountClientSchema>["response"]
>;

type CreateProductDiscountClientSchema = EndpointSchema<
    z.infer<typeof createProductDiscountClientSchema>["params"],
    z.infer<typeof createProductDiscountClientSchema>["body"],
    z.infer<typeof createProductDiscountClientSchema>["query"],
    z.infer<typeof createProductDiscountClientSchema>["response"]
>;

type UpdateProductDiscountClientSchema = EndpointSchema<
    z.infer<typeof updateProductDiscountClientSchema>["params"],
    z.infer<typeof updateProductDiscountClientSchema>["body"],
    z.infer<typeof updateProductDiscountClientSchema>["query"],
    z.infer<typeof updateProductDiscountClientSchema>["response"]
>;

type DeleteProductDiscountClientSchema = EndpointSchema<
    z.infer<typeof deleteProductDiscountClientSchema>["params"],
    z.infer<typeof deleteProductDiscountClientSchema>["body"],
    z.infer<typeof deleteProductDiscountClientSchema>["query"],
    z.infer<typeof deleteProductDiscountClientSchema>["response"]
>;

export {
    deleteProductDiscountClientSchema,
    createProductDiscountClientSchema,
    getAllProductDiscountClientSchema,
    getByProductIdProductDiscountClientSchema,
    updateProductDiscountClientSchema,
    getByIdProductDiscountClientSchema
};

export type {
    CreateProductDiscountClientSchema,
    GetAllProductDiscountClientsSchema,
    GetByIdProductDiscountClientSchema,
    UpdateProductDiscountClientSchema,
    DeleteProductDiscountClientSchema,
    GetByProductIdClientIdProductDiscountClientSchema,
    GetByProductIdProductDiscountClientSchema
};