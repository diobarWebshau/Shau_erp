import { ProductInputCreateSchema, ProductInputReponseSchema, ProductInputUpdateSchema } from "./product-input-process.model.schema";
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
const getAllProductInputSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(ProductInputReponseSchema),
});

/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductInputSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: ProductInputReponseSchema.nullable(),
});

/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
const createProductInputSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: ProductInputCreateSchema,
    response: ProductInputReponseSchema,
});

/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
const updateProductInputSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: ProductInputUpdateSchema,
    response: ProductInputReponseSchema,
});

/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProductInputSchema = z.object({
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

type GetAllProductInputsSchema = EndpointSchema<
    z.infer<typeof getAllProductInputSchema>["params"],
    z.infer<typeof getAllProductInputSchema>["body"],
    z.infer<typeof getAllProductInputSchema>["query"],
    z.infer<typeof getAllProductInputSchema>["response"]
>;

type GetByIdProductInputSchema = EndpointSchema<
    z.infer<typeof getByIdProductInputSchema>["params"],
    z.infer<typeof getByIdProductInputSchema>["body"],
    z.infer<typeof getByIdProductInputSchema>["query"],
    z.infer<typeof getByIdProductInputSchema>["response"]
>;

type CreateProductInputSchema = EndpointSchema<
    z.infer<typeof createProductInputSchema>["params"],
    z.infer<typeof createProductInputSchema>["body"],
    z.infer<typeof createProductInputSchema>["query"],
    z.infer<typeof createProductInputSchema>["response"]
>;

type UpdateProductInputSchema = EndpointSchema<
    z.infer<typeof updateProductInputSchema>["params"],
    z.infer<typeof updateProductInputSchema>["body"],
    z.infer<typeof updateProductInputSchema>["query"],
    z.infer<typeof updateProductInputSchema>["response"]
>;

type DeleteProductInputSchema = EndpointSchema<
    z.infer<typeof deleteProductInputSchema>["params"],
    z.infer<typeof deleteProductInputSchema>["body"],
    z.infer<typeof deleteProductInputSchema>["query"],
    z.infer<typeof deleteProductInputSchema>["response"]
>;

export {
    deleteProductInputSchema,
    createProductInputSchema,
    getAllProductInputSchema,
    updateProductInputSchema,
    getByIdProductInputSchema
};

export type {
    CreateProductInputSchema,
    GetAllProductInputsSchema,
    GetByIdProductInputSchema,
    UpdateProductInputSchema,
    DeleteProductInputSchema
};