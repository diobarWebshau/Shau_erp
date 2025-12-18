import type { EndpointSchema } from "../../../../../../../shared/typed-request-endpoint/endpoint.interface";
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
declare const getAllLocationLocationTypeSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        location_id: z.ZodNumber;
        location_type_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdLocationLocationTypeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        location_id: z.ZodNumber;
        location_type_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
declare const createLocationLocationTypeSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        location_id: z.ZodNumber;
        location_type_id: z.ZodNumber;
    }, z.core.$strip>;
    response: z.ZodObject<{
        location_id: z.ZodNumber;
        location_type_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
declare const updateLocationLocationTypeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        location_id: z.ZodOptional<z.ZodNumber>;
        location_type_id: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        location_id: z.ZodNumber;
        location_type_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
declare const deleteLocationLocationTypeSchema: z.ZodObject<{
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
type GetAllLocationLocationTypesSchema = EndpointSchema<z.infer<typeof getAllLocationLocationTypeSchema>["params"], z.infer<typeof getAllLocationLocationTypeSchema>["body"], z.infer<typeof getAllLocationLocationTypeSchema>["query"], z.infer<typeof getAllLocationLocationTypeSchema>["response"]>;
type GetByIdLocationLocationTypeSchema = EndpointSchema<z.infer<typeof getByIdLocationLocationTypeSchema>["params"], z.infer<typeof getByIdLocationLocationTypeSchema>["body"], z.infer<typeof getByIdLocationLocationTypeSchema>["query"], z.infer<typeof getByIdLocationLocationTypeSchema>["response"]>;
type CreateLocationLocationTypeSchema = EndpointSchema<z.infer<typeof createLocationLocationTypeSchema>["params"], z.infer<typeof createLocationLocationTypeSchema>["body"], z.infer<typeof createLocationLocationTypeSchema>["query"], z.infer<typeof createLocationLocationTypeSchema>["response"]>;
type UpdateLocationLocationTypeSchema = EndpointSchema<z.infer<typeof updateLocationLocationTypeSchema>["params"], z.infer<typeof updateLocationLocationTypeSchema>["body"], z.infer<typeof updateLocationLocationTypeSchema>["query"], z.infer<typeof updateLocationLocationTypeSchema>["response"]>;
type DeleteLocationLocationTypeSchema = EndpointSchema<z.infer<typeof deleteLocationLocationTypeSchema>["params"], z.infer<typeof deleteLocationLocationTypeSchema>["body"], z.infer<typeof deleteLocationLocationTypeSchema>["query"], z.infer<typeof deleteLocationLocationTypeSchema>["response"]>;
export { deleteLocationLocationTypeSchema, createLocationLocationTypeSchema, getAllLocationLocationTypeSchema, updateLocationLocationTypeSchema, getByIdLocationLocationTypeSchema };
export type { CreateLocationLocationTypeSchema, GetAllLocationLocationTypesSchema, GetByIdLocationLocationTypeSchema, UpdateLocationLocationTypeSchema, DeleteLocationLocationTypeSchema };
