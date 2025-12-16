import { locationTypeCreateSchema, locationTypeResponseSchema, locationTypeUpdateSchema } from "./location-type.model.schema";
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
 * Schema: GET /location-type
 * ------------------------------------------------------------------
 */
const getAllLocationTypeSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(locationTypeResponseSchema)
});

/**
 * Schema: GET /location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdLocationTypeSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: locationTypeResponseSchema.nullable()
});

/**
 * Schema: GET /location-type/name/:name
 * ------------------------------------------------------------------
 */
const getByNameLocationTypeSchema = z.object({
    params: z.object({ name: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: locationTypeResponseSchema.nullable()
});

/**
 * Schema: POST /location-type
 * ------------------------------------------------------------------
 */
const createLocationTypeSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: locationTypeCreateSchema,
    response: locationTypeResponseSchema,
});

/**
 * Schema: PATCH /locations-type/:id
 * ------------------------------------------------------------------
 */
const updateLocationTypeSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: locationTypeUpdateSchema,
    response: locationTypeResponseSchema,
});

/**
 * Schema: DELETE /location-type/:id
 * ------------------------------------------------------------------
 */
const deleteLocationTypeSchema = z.object({
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

type GetAllLocationTypeSchema = EndpointSchema<
    z.infer<typeof getAllLocationTypeSchema>["params"],
    z.infer<typeof getAllLocationTypeSchema>["body"],
    z.infer<typeof getAllLocationTypeSchema>["query"],
    z.infer<typeof getAllLocationTypeSchema>["response"]
>;

type GetByIdLocationTypeSchema = EndpointSchema<
    z.infer<typeof getByIdLocationTypeSchema>["params"],
    z.infer<typeof getByIdLocationTypeSchema>["body"],
    z.infer<typeof getByIdLocationTypeSchema>["query"],
    z.infer<typeof getByIdLocationTypeSchema>["response"]
>;

type GetByNameLocationTypeSchema = EndpointSchema<
    z.infer<typeof getByNameLocationTypeSchema>["params"],
    z.infer<typeof getByNameLocationTypeSchema>["body"],
    z.infer<typeof getByNameLocationTypeSchema>["query"],
    z.infer<typeof getByNameLocationTypeSchema>["response"]
>;

type CreateLocationTypeSchema = EndpointSchema<
    z.infer<typeof createLocationTypeSchema>["params"],
    z.infer<typeof createLocationTypeSchema>["body"],
    z.infer<typeof createLocationTypeSchema>["query"],
    z.infer<typeof createLocationTypeSchema>["response"]
>;

type UpdateLocationTypeSchema = EndpointSchema<
    z.infer<typeof updateLocationTypeSchema>["params"],
    z.infer<typeof updateLocationTypeSchema>["body"],
    z.infer<typeof updateLocationTypeSchema>["query"],
    z.infer<typeof updateLocationTypeSchema>["response"]
>;

type DeleteLocationTypeSchema = EndpointSchema<
    z.infer<typeof deleteLocationTypeSchema>["params"],
    z.infer<typeof deleteLocationTypeSchema>["body"],
    z.infer<typeof deleteLocationTypeSchema>["query"],
    z.infer<typeof deleteLocationTypeSchema>["response"]
>;


export {
    getAllLocationTypeSchema,
    getByIdLocationTypeSchema,
    getByNameLocationTypeSchema,
    createLocationTypeSchema,
    updateLocationTypeSchema,
    deleteLocationTypeSchema
}

export type {
    GetAllLocationTypeSchema,
    GetByIdLocationTypeSchema,
    GetByNameLocationTypeSchema,
    CreateLocationTypeSchema,
    UpdateLocationTypeSchema,
    DeleteLocationTypeSchema
}