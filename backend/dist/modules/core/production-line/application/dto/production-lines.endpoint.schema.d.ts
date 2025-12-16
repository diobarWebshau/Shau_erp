import type { EndpointSchema } from "../../../../../shared/typed-request-endpoint/endpoint.interface";
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
 * Schema: GET /production-line
 * ------------------------------------------------------------------
 */
declare const getAllProductionLinesSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /production-line/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdProductionLineSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /producion-line/name/:name
 * ------------------------------------------------------------------
 */
declare const getByNameProducionLineSchema: z.ZodObject<{
    params: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /production-line/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
declare const getByCustomIdProducionLineSchema: z.ZodObject<{
    params: z.ZodObject<{
        custom_id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: POST /production-line
 * ------------------------------------------------------------------
 */
declare const createProducionLineSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: PATCH /production-line/:id
 * ------------------------------------------------------------------
 */
declare const updateProducionLineSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        custom_id: z.ZodOptional<z.ZodString>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: DELETE /production-line/:id
 * ------------------------------------------------------------------
 */
declare const deleteProducionLineSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNull;
}, z.core.$strip>;
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
type GetByIdProductionLineSchema = EndpointSchema<z.infer<typeof getByIdProductionLineSchema>["params"], z.infer<typeof getByIdProductionLineSchema>["body"], z.infer<typeof getByIdProductionLineSchema>["query"], z.infer<typeof getByIdProductionLineSchema>["response"]>;
type GetByNameProducionLineSchema = EndpointSchema<z.infer<typeof getByNameProducionLineSchema>["params"], z.infer<typeof getByNameProducionLineSchema>["body"], z.infer<typeof getByNameProducionLineSchema>["query"], z.infer<typeof getByNameProducionLineSchema>["response"]>;
type GetByCustomIdProducionLineSchema = EndpointSchema<z.infer<typeof getByCustomIdProducionLineSchema>["params"], z.infer<typeof getByCustomIdProducionLineSchema>["body"], z.infer<typeof getByCustomIdProducionLineSchema>["query"], z.infer<typeof getByCustomIdProducionLineSchema>["response"]>;
type CreateProducionLineSchema = EndpointSchema<z.infer<typeof createProducionLineSchema>["params"], z.infer<typeof createProducionLineSchema>["body"], z.infer<typeof createProducionLineSchema>["query"], z.infer<typeof createProducionLineSchema>["response"]>;
type GetAllProductionLinesSchema = EndpointSchema<z.infer<typeof getAllProductionLinesSchema>["params"], z.infer<typeof getAllProductionLinesSchema>["body"], z.infer<typeof getAllProductionLinesSchema>["query"], z.infer<typeof getAllProductionLinesSchema>["response"]>;
type UpdateProducionLineSchema = EndpointSchema<z.infer<typeof updateProducionLineSchema>["params"], z.infer<typeof updateProducionLineSchema>["body"], z.infer<typeof updateProducionLineSchema>["query"], z.infer<typeof updateProducionLineSchema>["response"]>;
type DeleteProducionLineSchema = EndpointSchema<z.infer<typeof deleteProducionLineSchema>["params"], z.infer<typeof deleteProducionLineSchema>["body"], z.infer<typeof deleteProducionLineSchema>["query"], z.infer<typeof deleteProducionLineSchema>["response"]>;
export { deleteProducionLineSchema, createProducionLineSchema, getByIdProductionLineSchema, getAllProductionLinesSchema, getByCustomIdProducionLineSchema, getByNameProducionLineSchema, updateProducionLineSchema };
export type { CreateProducionLineSchema, GetAllProductionLinesSchema, GetByCustomIdProducionLineSchema, GetByIdProductionLineSchema, GetByNameProducionLineSchema, UpdateProducionLineSchema, DeleteProducionLineSchema };
