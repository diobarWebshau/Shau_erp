import { inventoryResponseSchema, inventoryUpdateSchema, inventoryCreateSchema } from "./inventory.model.schema"
import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod"

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


const getAllInventoryScehma = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(inventoryResponseSchema)
});

const getByIdInventoryScehma = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inventoryResponseSchema.nullable()
});

const createInventorySchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inventoryCreateSchema,
    response: inventoryResponseSchema
});

const updateInventorySchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: inventoryUpdateSchema,
    response: inventoryResponseSchema
});

const deleteInventorySchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.null()
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


type GetAllInventoryScehma = EndpointSchema<
    z.infer<typeof getAllInventoryScehma>["params"],
    z.infer<typeof getAllInventoryScehma>["body"],
    z.infer<typeof getAllInventoryScehma>["query"],
    z.infer<typeof getAllInventoryScehma>["response"]
>
type GetByIdInventoryScehma = EndpointSchema<
    z.infer<typeof getByIdInventoryScehma>["params"],
    z.infer<typeof getByIdInventoryScehma>["body"],
    z.infer<typeof getByIdInventoryScehma>["query"],
    z.infer<typeof getByIdInventoryScehma>["response"]
>
type CreateInventorySchema = EndpointSchema<
    z.infer<typeof createInventorySchema>["params"],
    z.infer<typeof createInventorySchema>["body"],
    z.infer<typeof createInventorySchema>["query"],
    z.infer<typeof createInventorySchema>["response"]
>
type UpdateInventorySchema = EndpointSchema<
    z.infer<typeof updateInventorySchema>["params"],
    z.infer<typeof updateInventorySchema>["body"],
    z.infer<typeof updateInventorySchema>["query"],
    z.infer<typeof updateInventorySchema>["response"]
>
type DeleteInventorySchema = EndpointSchema<
    z.infer<typeof deleteInventorySchema>["params"],
    z.infer<typeof deleteInventorySchema>["body"],
    z.infer<typeof deleteInventorySchema>["query"],
    z.infer<typeof deleteInventorySchema>["response"]
>

export {
    createInventorySchema,
    getAllInventoryScehma,
    getByIdInventoryScehma,
    deleteInventorySchema,
    updateInventorySchema
};

export type {
    GetAllInventoryScehma,
    GetByIdInventoryScehma,
    CreateInventorySchema,
    UpdateInventorySchema,
    DeleteInventorySchema,
}