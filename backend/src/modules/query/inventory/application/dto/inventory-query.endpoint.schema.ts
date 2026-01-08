import { inventoryQueryResponseSchema, inventorySearchQuerySchema } from "./inventory-query.model.schema"
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


const getAllInventoryQuerySchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(inventoryQueryResponseSchema)
});

const getAllLikeToInventoryQuerySchema = z.object({
    params: z.object({}).strict(),
    query: inventorySearchQuerySchema,
    body: z.object({}).strict(),
    response: z.array(inventoryQueryResponseSchema)
});

const getByIdInventoryQuerySchema = z.object({
    params: z.object({ inventory_id: z.string() }).strict(),
    query: inventorySearchQuerySchema,
    body: z.object({}).strict(),
    response: inventoryQueryResponseSchema.nullable()
});

// const getByIdInventoryQuerySchema = z.object({
//     params: z.object({ id: z.string() }).strict(),
//     query: z.object({}).strict(),
//     body: z.object({}).strict(),
//     response: inventoryQuerySchema.nullable()
// });

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


type GetAllInventoryQuerySchema = EndpointSchema<
    z.infer<typeof getAllInventoryQuerySchema>["params"],
    z.infer<typeof getAllInventoryQuerySchema>["body"],
    z.infer<typeof getAllInventoryQuerySchema>["query"],
    z.infer<typeof getAllInventoryQuerySchema>["response"]
>

type GetAllLikeToInventoryQuerySchema = EndpointSchema<
    z.infer<typeof getAllLikeToInventoryQuerySchema>["params"],
    z.infer<typeof getAllLikeToInventoryQuerySchema>["body"],
    z.infer<typeof getAllLikeToInventoryQuerySchema>["query"],
    z.infer<typeof getAllLikeToInventoryQuerySchema>["response"]
>
type GetByIdInventoryQuerySchema = EndpointSchema<
    z.infer<typeof getByIdInventoryQuerySchema>["params"],
    z.infer<typeof getByIdInventoryQuerySchema>["body"],
    z.infer<typeof getByIdInventoryQuerySchema>["query"],
    z.infer<typeof getByIdInventoryQuerySchema>["response"]
>

export {
    getAllInventoryQuerySchema,
    getAllLikeToInventoryQuerySchema,
    getByIdInventoryQuerySchema
};

export type {
    GetAllInventoryQuerySchema,
    GetByIdInventoryQuerySchema,
    GetAllLikeToInventoryQuerySchema,

}