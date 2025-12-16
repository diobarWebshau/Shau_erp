import { locationCreateSchema, locationResponseSchema, locationUpdateSchema, locationQuerySchema } from "./location.model.schema";
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
 * Schema: GET /locations
 * ------------------------------------------------------------------
 */
const getAllLocationsSchema = z.object({
    params: z.object({}).strict(),
    query: locationQuerySchema,
    body: z.object({}).strict(),
    response: z.array(locationResponseSchema),
});

/**
 * Schema: GET /locations/id/:id
 * ------------------------------------------------------------------
 */
const getByIdLocationSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: locationResponseSchema.nullable(),
});

/**
 * Schema: GET /locations/name/:name
 * ------------------------------------------------------------------
 */
const getByNameLocationSchema = z.object({
    params: z.object({ name: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: locationResponseSchema.nullable(),
});

/**
 * Schema: GET /locations/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
const getByCustomIdLocationSchema = z.object({
    params: z.object({ custom_id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: locationResponseSchema.nullable(),
});

/**
 * Schema: POST /locations
 * ------------------------------------------------------------------
 */
const createLocationSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: locationCreateSchema,
    response: locationResponseSchema,
});

/**
 * Schema: PATCH /locations/:id
 * ------------------------------------------------------------------
 */
const updateLocationSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: locationUpdateSchema,
    response: locationResponseSchema,
});

/**
 * Schema: DELETE /locations/:id
 * ------------------------------------------------------------------
 */
const deleteLocationSchema = z.object({
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


type GetAllLocationsSchema = EndpointSchema<
    z.infer<typeof getAllLocationsSchema>["params"],
    z.infer<typeof getAllLocationsSchema>["body"],
    z.infer<typeof getAllLocationsSchema>["query"],
    z.infer<typeof getAllLocationsSchema>["response"]
>;

type GetByIdLocationSchema = EndpointSchema<
    z.infer<typeof getByIdLocationSchema>["params"],
    z.infer<typeof getByIdLocationSchema>["body"],
    z.infer<typeof getByIdLocationSchema>["query"],
    z.infer<typeof getByIdLocationSchema>["response"]
>;

type GetByNameLocationSchema = EndpointSchema<
    z.infer<typeof getByNameLocationSchema>["params"],
    z.infer<typeof getByNameLocationSchema>["body"],
    z.infer<typeof getByNameLocationSchema>["query"],
    z.infer<typeof getByNameLocationSchema>["response"]
>;

type GetByCustomIdLocationSchema = EndpointSchema<
    z.infer<typeof getByCustomIdLocationSchema>["params"],
    z.infer<typeof getByCustomIdLocationSchema>["body"],
    z.infer<typeof getByCustomIdLocationSchema>["query"],
    z.infer<typeof getByCustomIdLocationSchema>["response"]
>;

type CreateLocationSchema = EndpointSchema<
    z.infer<typeof createLocationSchema>["params"],
    z.infer<typeof createLocationSchema>["body"],
    z.infer<typeof createLocationSchema>["query"],
    z.infer<typeof createLocationSchema>["response"]
>;

type UpdateLocationSchema = EndpointSchema<
    z.infer<typeof updateLocationSchema>["params"],
    z.infer<typeof updateLocationSchema>["body"],
    z.infer<typeof updateLocationSchema>["query"],
    z.infer<typeof updateLocationSchema>["response"]
>;

type DeleteLocationSchema = EndpointSchema<
    z.infer<typeof deleteLocationSchema>["params"],
    z.infer<typeof deleteLocationSchema>["body"],
    z.infer<typeof deleteLocationSchema>["query"],
    z.infer<typeof deleteLocationSchema>["response"]
>;

export {
    deleteLocationSchema,
    createLocationSchema,
    getAllLocationsSchema,
    getByIdLocationSchema,
    getByCustomIdLocationSchema,
    getByNameLocationSchema,
    updateLocationSchema
};

export type {
    CreateLocationSchema,
    GetAllLocationsSchema,
    GetByCustomIdLocationSchema,
    GetByIdLocationSchema,
    GetByNameLocationSchema,
    UpdateLocationSchema,
    DeleteLocationSchema
};