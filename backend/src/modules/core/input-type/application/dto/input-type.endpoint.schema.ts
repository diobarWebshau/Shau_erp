import { inputTypeCreateSchema, inputTypeResponseSchema, inputTypeUpdateSchema } from "./input-type.model.schema";
import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
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
 * Schema: GET /input-type
 * ------------------------------------------------------------------
 */
const getAllinputTypeSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(inputTypeResponseSchema)
});

/**
 * Schema: GET /input-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdinputTypeSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inputTypeResponseSchema.nullable()
});

/**
 * Schema: GET /input-type/name/:name
 * ------------------------------------------------------------------
 */
const getByNameinputTypeSchema = z.object({
    params: z.object({ name: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inputTypeResponseSchema.nullable()
});

/**
 * Schema: POST /input-type
 * ------------------------------------------------------------------
 */
const createinputTypeSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inputTypeCreateSchema,
    response: inputTypeResponseSchema,
});

/**
 * Schema: PATCH /inputs-type/:id
 * ------------------------------------------------------------------
 */
const updateinputTypeSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: inputTypeUpdateSchema,
    response: inputTypeResponseSchema,
});

/**
 * Schema: DELETE /input-type/:id
 * ------------------------------------------------------------------
 */
const deleteinputTypeSchema = z.object({
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

type GetAllinputTypeSchema = EndpointSchema<
    z.infer<typeof getAllinputTypeSchema>["params"],
    z.infer<typeof getAllinputTypeSchema>["body"],
    z.infer<typeof getAllinputTypeSchema>["query"],
    z.infer<typeof getAllinputTypeSchema>["response"]
>;

type GetByIdinputTypeSchema = EndpointSchema<
    z.infer<typeof getByIdinputTypeSchema>["params"],
    z.infer<typeof getByIdinputTypeSchema>["body"],
    z.infer<typeof getByIdinputTypeSchema>["query"],
    z.infer<typeof getByIdinputTypeSchema>["response"]
>;

type GetByNameinputTypeSchema = EndpointSchema<
    z.infer<typeof getByNameinputTypeSchema>["params"],
    z.infer<typeof getByNameinputTypeSchema>["body"],
    z.infer<typeof getByNameinputTypeSchema>["query"],
    z.infer<typeof getByNameinputTypeSchema>["response"]
>;

type CreateinputTypeSchema = EndpointSchema<
    z.infer<typeof createinputTypeSchema>["params"],
    z.infer<typeof createinputTypeSchema>["body"],
    z.infer<typeof createinputTypeSchema>["query"],
    z.infer<typeof createinputTypeSchema>["response"]
>;

type UpdateinputTypeSchema = EndpointSchema<
    z.infer<typeof updateinputTypeSchema>["params"],
    z.infer<typeof updateinputTypeSchema>["body"],
    z.infer<typeof updateinputTypeSchema>["query"],
    z.infer<typeof updateinputTypeSchema>["response"]
>;

type DeleteinputTypeSchema = EndpointSchema<
    z.infer<typeof deleteinputTypeSchema>["params"],
    z.infer<typeof deleteinputTypeSchema>["body"],
    z.infer<typeof deleteinputTypeSchema>["query"],
    z.infer<typeof deleteinputTypeSchema>["response"]
>;


export {
    getAllinputTypeSchema,
    getByIdinputTypeSchema,
    getByNameinputTypeSchema,
    createinputTypeSchema,
    updateinputTypeSchema,
    deleteinputTypeSchema
}

export type {
    GetAllinputTypeSchema,
    GetByIdinputTypeSchema,
    GetByNameinputTypeSchema,
    CreateinputTypeSchema,
    UpdateinputTypeSchema,
    DeleteinputTypeSchema
}