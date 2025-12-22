import { productInputProcessCreateSchema, productInputProcessReponseSchema, productInputProcessUpdateSchema } from "./product-input-process.model.schema";
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
const getAllProductInputProcessSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(productInputProcessReponseSchema),
});

/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductInputProcessSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productInputProcessReponseSchema.nullable(),
});


const getByProductInputProcessSchema = z.object({
    params: z.object({ product_id: z.string(), product_input_id: z.string(), product_process_id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productInputProcessReponseSchema.nullable(),
});

/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
const createProductInputProcessSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: productInputProcessCreateSchema,
    response: productInputProcessReponseSchema,
});

/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
const updateProductInputProcessSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: productInputProcessUpdateSchema,
    response: productInputProcessReponseSchema,
});

/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProductInputProcessSchema = z.object({
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

type GetAllProductInputProcessSchema = EndpointSchema<
    z.infer<typeof getAllProductInputProcessSchema>["params"],
    z.infer<typeof getAllProductInputProcessSchema>["body"],
    z.infer<typeof getAllProductInputProcessSchema>["query"],
    z.infer<typeof getAllProductInputProcessSchema>["response"]
>;

type GetByProductInputProcessSchema = EndpointSchema<
    z.infer<typeof getByProductInputProcessSchema>["params"],
    z.infer<typeof getByProductInputProcessSchema>["body"],
    z.infer<typeof getByProductInputProcessSchema>["query"],
    z.infer<typeof getByProductInputProcessSchema>["response"]
>;

type GetByIdProductInputProcessSchema = EndpointSchema<
    z.infer<typeof getByIdProductInputProcessSchema>["params"],
    z.infer<typeof getByIdProductInputProcessSchema>["body"],
    z.infer<typeof getByIdProductInputProcessSchema>["query"],
    z.infer<typeof getByIdProductInputProcessSchema>["response"]
>;

type CreateProductInputProcessSchema = EndpointSchema<
    z.infer<typeof createProductInputProcessSchema>["params"],
    z.infer<typeof createProductInputProcessSchema>["body"],
    z.infer<typeof createProductInputProcessSchema>["query"],
    z.infer<typeof createProductInputProcessSchema>["response"]
>;

type UpdateProductInputProcessSchema = EndpointSchema<
    z.infer<typeof updateProductInputProcessSchema>["params"],
    z.infer<typeof updateProductInputProcessSchema>["body"],
    z.infer<typeof updateProductInputProcessSchema>["query"],
    z.infer<typeof updateProductInputProcessSchema>["response"]
>;

type DeleteProductInputProcessSchema = EndpointSchema<
    z.infer<typeof deleteProductInputProcessSchema>["params"],
    z.infer<typeof deleteProductInputProcessSchema>["body"],
    z.infer<typeof deleteProductInputProcessSchema>["query"],
    z.infer<typeof deleteProductInputProcessSchema>["response"]
>;

export {
    deleteProductInputProcessSchema,
    createProductInputProcessSchema,
    getAllProductInputProcessSchema,
    updateProductInputProcessSchema,
    getByIdProductInputProcessSchema,
    getByProductInputProcessSchema
};

export type {
    CreateProductInputProcessSchema,
    GetByProductInputProcessSchema,
    GetAllProductInputProcessSchema,
    GetByIdProductInputProcessSchema,
    UpdateProductInputProcessSchema,
    DeleteProductInputProcessSchema
};