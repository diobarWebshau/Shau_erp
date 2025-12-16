import { processCreateSchema, processResponseSchema, processUpdateSchema, processQuerySchema} from "./process.model.schema";
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
const getAllProcessesSchema = z.object({
    params: z.object({}).strict(),
    query: processQuerySchema,
    body: z.object({}).strict(),
    response: z.array(processResponseSchema)
});

/**
 * Schema: GET /location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProcessSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: processResponseSchema.nullable()
});

/**
 * Schema: GET /location-type/name/:name
 * ------------------------------------------------------------------
 */
const getByNameProcessSchema = z.object({
    params: z.object({ name: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: processResponseSchema.nullable()
});

/**
 * Schema: POST /location-type
 * ------------------------------------------------------------------
 */
const createProcessSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: processCreateSchema,
    response: processResponseSchema,
});

/**
 * Schema: PATCH /locations-type/:id
 * ------------------------------------------------------------------
 */
const updateProcessSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: processUpdateSchema,
    response: processResponseSchema,
});

/**
 * Schema: DELETE /location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProcessSchema = z.object({
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

type GetAllProcessesSchema = EndpointSchema<
    z.infer<typeof getAllProcessesSchema>["params"],
    z.infer<typeof getAllProcessesSchema>["body"],
    z.infer<typeof getAllProcessesSchema>["query"],
    z.infer<typeof getAllProcessesSchema>["response"]
>;

type GetByIdProcessSchema = EndpointSchema<
    z.infer<typeof getByIdProcessSchema>["params"],
    z.infer<typeof getByIdProcessSchema>["body"],
    z.infer<typeof getByIdProcessSchema>["query"],
    z.infer<typeof getByIdProcessSchema>["response"]
>;

type GetByNameProcessSchema = EndpointSchema<
    z.infer<typeof getByNameProcessSchema>["params"],
    z.infer<typeof getByNameProcessSchema>["body"],
    z.infer<typeof getByNameProcessSchema>["query"],
    z.infer<typeof getByNameProcessSchema>["response"]
>;

type CreateProcessSchema = EndpointSchema<
    z.infer<typeof createProcessSchema>["params"],
    z.infer<typeof createProcessSchema>["body"],
    z.infer<typeof createProcessSchema>["query"],
    z.infer<typeof createProcessSchema>["response"]
>;

type UpdateProcessSchema = EndpointSchema<
    z.infer<typeof updateProcessSchema>["params"],
    z.infer<typeof updateProcessSchema>["body"],
    z.infer<typeof updateProcessSchema>["query"],
    z.infer<typeof updateProcessSchema>["response"]
>;

type DeleteProcessSchema = EndpointSchema<
    z.infer<typeof deleteProcessSchema>["params"],
    z.infer<typeof deleteProcessSchema>["body"],
    z.infer<typeof deleteProcessSchema>["query"],
    z.infer<typeof deleteProcessSchema>["response"]
>;


export {
    getAllProcessesSchema,
    getByIdProcessSchema,
    getByNameProcessSchema,
    createProcessSchema,
    updateProcessSchema,
    deleteProcessSchema
}

export type {
    GetAllProcessesSchema,
    GetByIdProcessSchema,
    GetByNameProcessSchema,
    CreateProcessSchema,
    UpdateProcessSchema,
    DeleteProcessSchema
}