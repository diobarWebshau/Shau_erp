import { ProductProcessCreateSchema, ProductProcessReponseSchema, ProductProcessUpdateSchema } from "./product-process.model.schema";
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
const getAllProductProcessSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(ProductProcessReponseSchema),
});

/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductProcessSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: ProductProcessReponseSchema.nullable(),
});

/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */

const getByIdProductProcessProductProcesSchema = z.object({
    params: z.object({ product_id: z.string(), process_id: z.string() }),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: ProductProcessReponseSchema.nullable(),
});

/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
const createProductProcessSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: ProductProcessCreateSchema,
    response: ProductProcessReponseSchema,
});

/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
const updateProductProcessSchema = z.object({
    params: z.object({ id: z.string() }),
    query: z.object({}).strict(),
    body: ProductProcessUpdateSchema,
    response: ProductProcessReponseSchema,
});

/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProductProcessSchema = z.object({
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

type GetAllProductProcesssSchema = EndpointSchema<
    z.infer<typeof getAllProductProcessSchema>["params"],
    z.infer<typeof getAllProductProcessSchema>["body"],
    z.infer<typeof getAllProductProcessSchema>["query"],
    z.infer<typeof getAllProductProcessSchema>["response"]
>;

type GetByIdProductProcessSchema = EndpointSchema<
    z.infer<typeof getByIdProductProcessSchema>["params"],
    z.infer<typeof getByIdProductProcessSchema>["body"],
    z.infer<typeof getByIdProductProcessSchema>["query"],
    z.infer<typeof getByIdProductProcessSchema>["response"]
>;

type CreateProductProcessSchema = EndpointSchema<
    z.infer<typeof createProductProcessSchema>["params"],
    z.infer<typeof createProductProcessSchema>["body"],
    z.infer<typeof createProductProcessSchema>["query"],
    z.infer<typeof createProductProcessSchema>["response"]
>;

type UpdateProductProcessSchema = EndpointSchema<
    z.infer<typeof updateProductProcessSchema>["params"],
    z.infer<typeof updateProductProcessSchema>["body"],
    z.infer<typeof updateProductProcessSchema>["query"],
    z.infer<typeof updateProductProcessSchema>["response"]
>;

type DeleteProductProcessSchema = EndpointSchema<
    z.infer<typeof deleteProductProcessSchema>["params"],
    z.infer<typeof deleteProductProcessSchema>["body"],
    z.infer<typeof deleteProductProcessSchema>["query"],
    z.infer<typeof deleteProductProcessSchema>["response"]
>;


type GetByIdProductProcessProductProcesSchema = EndpointSchema<
    z.infer<typeof getByIdProductProcessProductProcesSchema>["params"],
    z.infer<typeof getByIdProductProcessProductProcesSchema>["body"],
    z.infer<typeof getByIdProductProcessProductProcesSchema>["query"],
    z.infer<typeof getByIdProductProcessProductProcesSchema>["response"]
>;

export {
    deleteProductProcessSchema,
    createProductProcessSchema,
    getAllProductProcessSchema,
    updateProductProcessSchema,
    getByIdProductProcessSchema,
    getByIdProductProcessProductProcesSchema
};

export type {
    CreateProductProcessSchema,
    GetAllProductProcesssSchema,
    GetByIdProductProcessSchema,
    UpdateProductProcessSchema,
    DeleteProductProcessSchema,
    GetByIdProductProcessProductProcesSchema
};