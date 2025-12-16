import { inputCreateSchema, inputUpdateSchema, inputResponseSchema, inputQuerySchema } from "./input.model.schema";
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
 * Schema: GET /input
 * ------------------------------------------------------------------
 */
const getAllinputsSchema = z.object({
    params: z.object({}).strict(),
    query: inputQuerySchema,
    body: z.object({}).strict(),
    response: z.array(inputResponseSchema)
});

/**
 * Schema: GET /input/id/:id
 * ------------------------------------------------------------------
 */
const getByIdinputSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inputResponseSchema.nullable(),
});

/**
 * Schema: GET /input/name/:name
 * ------------------------------------------------------------------
 */
const getByNameinputSchema = z.object({
    params: z.object({ name: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inputResponseSchema.nullable(),
});

/**
 * Schema: GET /input/barcode/:barcode
 * ------------------------------------------------------------------
 */
const getByBarcodeinputSchema = z.object({
    params: z.object({ barcode: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inputResponseSchema.nullable(),
});

/**
 * Schema: GET /input/sku/:sku
 * ------------------------------------------------------------------
 */
const getBySkuinputSchema = z.object({
    params: z.object({ sku: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inputResponseSchema.nullable(),
});

/**
 * Schema: GET /input/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
const getByCustomIdinputSchema = z.object({
    params: z.object({ custom_id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inputResponseSchema.nullable(),
});

/**
 * Schema: POST /input
 * ------------------------------------------------------------------
 */
const createinputSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inputCreateSchema,
    response: inputResponseSchema,
});

/**
 * Schema: PATCH /input/:id
 * ------------------------------------------------------------------
 */
const updateinputSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: inputUpdateSchema,
    response: inputResponseSchema,
});

/**
 * Schema: DELETE /input/:id
 * ------------------------------------------------------------------
 */
const deleteinputSchema = z.object({
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

type GetAllinputsSchema = EndpointSchema<
    z.infer<typeof getAllinputsSchema>["params"],
    z.infer<typeof getAllinputsSchema>["body"],
    z.infer<typeof getAllinputsSchema>["query"],
    z.infer<typeof getAllinputsSchema>["response"]
>;

type GetByIdinputSchema = EndpointSchema<
    z.infer<typeof getByIdinputSchema>["params"],
    z.infer<typeof getByIdinputSchema>["body"],
    z.infer<typeof getByIdinputSchema>["query"],
    z.infer<typeof getByIdinputSchema>["response"]
>;

type GetByNameinputSchema = EndpointSchema<
    z.infer<typeof getByNameinputSchema>["params"],
    z.infer<typeof getByNameinputSchema>["body"],
    z.infer<typeof getByNameinputSchema>["query"],
    z.infer<typeof getByNameinputSchema>["response"]
>;

type GetByBarcodeinputSchema = EndpointSchema<
    z.infer<typeof getByBarcodeinputSchema>["params"],
    z.infer<typeof getByBarcodeinputSchema>["body"],
    z.infer<typeof getByBarcodeinputSchema>["query"],
    z.infer<typeof getByBarcodeinputSchema>["response"]
>;

type GetByCustomIdinputSchema = EndpointSchema<
    z.infer<typeof getByCustomIdinputSchema>["params"],
    z.infer<typeof getByCustomIdinputSchema>["body"],
    z.infer<typeof getByCustomIdinputSchema>["query"],
    z.infer<typeof getByCustomIdinputSchema>["response"]
>;
type GetBySkuinputSchema = EndpointSchema<
    z.infer<typeof getBySkuinputSchema>["params"],
    z.infer<typeof getBySkuinputSchema>["body"],
    z.infer<typeof getBySkuinputSchema>["query"],
    z.infer<typeof getBySkuinputSchema>["response"]
>;

type CreateinputSchema = EndpointSchema<
    z.infer<typeof createinputSchema>["params"],
    z.infer<typeof createinputSchema>["body"],
    z.infer<typeof createinputSchema>["query"],
    z.infer<typeof createinputSchema>["response"]
>;

type UpdateinputSchema = EndpointSchema<
    z.infer<typeof updateinputSchema>["params"],
    z.infer<typeof updateinputSchema>["body"],
    z.infer<typeof updateinputSchema>["query"],
    z.infer<typeof updateinputSchema>["response"]
>;

type DeleteinputSchema = EndpointSchema<
    z.infer<typeof deleteinputSchema>["params"],
    z.infer<typeof deleteinputSchema>["body"],
    z.infer<typeof deleteinputSchema>["query"],
    z.infer<typeof deleteinputSchema>["response"]
>;

export {
    getByIdinputSchema,
    getAllinputsSchema,
    getByBarcodeinputSchema,
    getByCustomIdinputSchema,
    getByNameinputSchema,
    getBySkuinputSchema,

    deleteinputSchema,
    createinputSchema,
    updateinputSchema,
};

export type {
    GetAllinputsSchema,
    GetByIdinputSchema,
    GetByBarcodeinputSchema,
    GetByCustomIdinputSchema,
    GetByNameinputSchema,
    GetBySkuinputSchema,

    UpdateinputSchema,
    CreateinputSchema,
    DeleteinputSchema,
};