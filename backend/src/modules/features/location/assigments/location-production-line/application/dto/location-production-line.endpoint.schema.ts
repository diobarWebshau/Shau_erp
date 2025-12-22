import { locationProductionLineCreateSchema, locationProductionLineUpdateSchema, locationProductionLineReponseSchema } from "./location-production-line.model.schema";
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
 * Schema: GET /location-production-line
 * ------------------------------------------------------------------
 */
const getAllLocationProductionLineProductionLineSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(locationProductionLineReponseSchema),
});

/**
 * Schema: GET /location-production-line/id/:id
 * ------------------------------------------------------------------
 */
const getByIdLocationProductionLineSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: locationProductionLineReponseSchema.nullable(),
});


/**
 * Schema: GET /location-production-line/id/:id
 * ------------------------------------------------------------------
 */
const getByLocationProductionLineIdLocationProductionLineSchema = z.object({
    params: z.object({ location_id: z.string(), production_line_id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: locationProductionLineReponseSchema.nullable(),
});

/**
 * Schema: POST /location-production-line
 * ------------------------------------------------------------------
 */
const createLocationProductionLineSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: locationProductionLineCreateSchema,
    response: locationProductionLineReponseSchema,
});

/**
 * Schema: PATCH /location-production-line/:id
 * ------------------------------------------------------------------
 */
const updateLocationProductionLineSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: locationProductionLineUpdateSchema,
    response: locationProductionLineReponseSchema,
});

/**
 * Schema: DELETE /location-production-line/:id
 * ------------------------------------------------------------------
 */
const deleteLocationProductionLineSchema = z.object({
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

type GetAllLocationProductionLinesSchema = EndpointSchema<
    z.infer<typeof getAllLocationProductionLineProductionLineSchema>["params"],
    z.infer<typeof getAllLocationProductionLineProductionLineSchema>["body"],
    z.infer<typeof getAllLocationProductionLineProductionLineSchema>["query"],
    z.infer<typeof getAllLocationProductionLineProductionLineSchema>["response"]
>;

type GetByIdLocationProductionLineSchema = EndpointSchema<
    z.infer<typeof getByIdLocationProductionLineSchema>["params"],
    z.infer<typeof getByIdLocationProductionLineSchema>["body"],
    z.infer<typeof getByIdLocationProductionLineSchema>["query"],
    z.infer<typeof getByIdLocationProductionLineSchema>["response"]
>;

type CreateLocationProductionLineSchema = EndpointSchema<
    z.infer<typeof createLocationProductionLineSchema>["params"],
    z.infer<typeof createLocationProductionLineSchema>["body"],
    z.infer<typeof createLocationProductionLineSchema>["query"],
    z.infer<typeof createLocationProductionLineSchema>["response"]
>;

type UpdateLocationProductionLineSchema = EndpointSchema<
    z.infer<typeof updateLocationProductionLineSchema>["params"],
    z.infer<typeof updateLocationProductionLineSchema>["body"],
    z.infer<typeof updateLocationProductionLineSchema>["query"],
    z.infer<typeof updateLocationProductionLineSchema>["response"]
>;

type DeleteLocationProductionLineSchema = EndpointSchema<
    z.infer<typeof deleteLocationProductionLineSchema>["params"],
    z.infer<typeof deleteLocationProductionLineSchema>["body"],
    z.infer<typeof deleteLocationProductionLineSchema>["query"],
    z.infer<typeof deleteLocationProductionLineSchema>["response"]
>;

type GetByLocationProductionLineIdLocationProductionLineSchema = EndpointSchema<
    z.infer<typeof getByLocationProductionLineIdLocationProductionLineSchema>["params"],
    z.infer<typeof getByLocationProductionLineIdLocationProductionLineSchema>["body"],
    z.infer<typeof getByLocationProductionLineIdLocationProductionLineSchema>["query"],
    z.infer<typeof getByLocationProductionLineIdLocationProductionLineSchema>["response"]
>;

export {
    deleteLocationProductionLineSchema,
    createLocationProductionLineSchema,
    getAllLocationProductionLineProductionLineSchema,
    updateLocationProductionLineSchema,
    getByIdLocationProductionLineSchema,
    getByLocationProductionLineIdLocationProductionLineSchema
};

export type {
    CreateLocationProductionLineSchema,
    GetAllLocationProductionLinesSchema,
    GetByIdLocationProductionLineSchema,
    UpdateLocationProductionLineSchema,
    DeleteLocationProductionLineSchema,
    GetByLocationProductionLineIdLocationProductionLineSchema
};