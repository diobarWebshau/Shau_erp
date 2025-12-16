import { clientCreateSchema, clientQuerySchema, clientResponseSchema, clientUpdateSchema } from "./client.model.schema";
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
 * Schema: GET /client
 * ------------------------------------------------------------------
 */
const getAllClientsSchema = z.object({
    params: z.object({}).strict(),
    query: clientQuerySchema,
    body: z.object({}).strict(),
    response: z.array(clientResponseSchema)
});

/**
 * Schema: GET /client/id/:id
 * ------------------------------------------------------------------
 */
const getByIdClientSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: clientResponseSchema.nullable(),
});

/**
 * Schema: GET /client/name/:name
 * ------------------------------------------------------------------
 */
const getByCompanyNameClientSchema = z.object({
    params: z.object({ company_name: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: clientResponseSchema.nullable(),
});

/**
 * Schema: GET /client/cfdi/:name
 * ------------------------------------------------------------------
 */
const getByCfdiClientSchema = z.object({
    params: z.object({ cfdi: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: clientResponseSchema.nullable(),
});

/**
 * Schema: POST /client
 * ------------------------------------------------------------------
 */
const createClientSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: clientCreateSchema,
    response: clientResponseSchema,
});

/**
 * Schema: PATCH /client/:id
 * ------------------------------------------------------------------
 */
const updateClientSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: clientUpdateSchema,
    response: clientResponseSchema,
});

/**
 * Schema: DELETE /client/:id
 * ------------------------------------------------------------------
 */
const deleteClientSchema = z.object({
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

type GetByIdClientSchema = EndpointSchema<
    z.infer<typeof getByIdClientSchema>["params"],
    z.infer<typeof getByIdClientSchema>["body"],
    z.infer<typeof getByIdClientSchema>["query"],
    z.infer<typeof getByIdClientSchema>["response"]
>;

type GetByCompanyNameClientSchema = EndpointSchema<
    z.infer<typeof getByCompanyNameClientSchema>["params"],
    z.infer<typeof getByCompanyNameClientSchema>["body"],
    z.infer<typeof getByCompanyNameClientSchema>["query"],
    z.infer<typeof getByCompanyNameClientSchema>["response"]
>;

type GetByCfdiClientSchema = EndpointSchema<
    z.infer<typeof getByCfdiClientSchema>["params"],
    z.infer<typeof getByCfdiClientSchema>["body"],
    z.infer<typeof getByCfdiClientSchema>["query"],
    z.infer<typeof getByCfdiClientSchema>["response"]
>;

type CreateClientSchema = EndpointSchema<
    z.infer<typeof createClientSchema>["params"],
    z.infer<typeof createClientSchema>["body"],
    z.infer<typeof createClientSchema>["query"],
    z.infer<typeof createClientSchema>["response"]
>;

type GetAllClientsSchema = EndpointSchema<
    z.infer<typeof getAllClientsSchema>["params"],
    z.infer<typeof getAllClientsSchema>["body"],
    z.infer<typeof getAllClientsSchema>["query"],
    z.infer<typeof getAllClientsSchema>["response"]
>;

type UpdateClientSchema = EndpointSchema<
    z.infer<typeof updateClientSchema>["params"],
    z.infer<typeof updateClientSchema>["body"],
    z.infer<typeof updateClientSchema>["query"],
    z.infer<typeof updateClientSchema>["response"]
>;

type DeleteClientSchema = EndpointSchema<
    z.infer<typeof deleteClientSchema>["params"],
    z.infer<typeof deleteClientSchema>["body"],
    z.infer<typeof deleteClientSchema>["query"],
    z.infer<typeof deleteClientSchema>["response"]
>;

export {
    deleteClientSchema,
    createClientSchema,
    getByIdClientSchema,
    getAllClientsSchema,
    getByCompanyNameClientSchema,
    updateClientSchema,
    getByCfdiClientSchema
};

export type {
    CreateClientSchema,
    GetAllClientsSchema,
    GetByIdClientSchema,
    GetByCompanyNameClientSchema,
    UpdateClientSchema,
    DeleteClientSchema,
    GetByCfdiClientSchema
};