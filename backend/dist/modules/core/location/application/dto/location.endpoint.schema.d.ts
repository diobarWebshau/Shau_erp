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
 * Schema: GET /locations
 * ------------------------------------------------------------------
 */
declare const getAllLocationsSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        description: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        email: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        phone: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        custom_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        description: z.ZodNullable<z.ZodString>;
        street: z.ZodNullable<z.ZodString>;
        custom_id: z.ZodNullable<z.ZodString>;
        location_manager: z.ZodNullable<z.ZodString>;
        street_number: z.ZodNullable<z.ZodNumber>;
        neighborhood: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        state: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNullable<z.ZodNumber>;
        phone: z.ZodNullable<z.ZodString>;
        production_capacity: z.ZodNullable<z.ZodNumber>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /locations/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdLocationSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        description: z.ZodNullable<z.ZodString>;
        street: z.ZodNullable<z.ZodString>;
        custom_id: z.ZodNullable<z.ZodString>;
        location_manager: z.ZodNullable<z.ZodString>;
        street_number: z.ZodNullable<z.ZodNumber>;
        neighborhood: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        state: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNullable<z.ZodNumber>;
        phone: z.ZodNullable<z.ZodString>;
        production_capacity: z.ZodNullable<z.ZodNumber>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /locations/name/:name
 * ------------------------------------------------------------------
 */
declare const getByNameLocationSchema: z.ZodObject<{
    params: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        description: z.ZodNullable<z.ZodString>;
        street: z.ZodNullable<z.ZodString>;
        custom_id: z.ZodNullable<z.ZodString>;
        location_manager: z.ZodNullable<z.ZodString>;
        street_number: z.ZodNullable<z.ZodNumber>;
        neighborhood: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        state: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNullable<z.ZodNumber>;
        phone: z.ZodNullable<z.ZodString>;
        production_capacity: z.ZodNullable<z.ZodNumber>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /locations/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
declare const getByCustomIdLocationSchema: z.ZodObject<{
    params: z.ZodObject<{
        custom_id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        description: z.ZodNullable<z.ZodString>;
        street: z.ZodNullable<z.ZodString>;
        custom_id: z.ZodNullable<z.ZodString>;
        location_manager: z.ZodNullable<z.ZodString>;
        street_number: z.ZodNullable<z.ZodNumber>;
        neighborhood: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        state: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNullable<z.ZodNumber>;
        phone: z.ZodNullable<z.ZodString>;
        production_capacity: z.ZodNullable<z.ZodNumber>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: POST /locations
 * ------------------------------------------------------------------
 */
declare const createLocationSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        description: z.ZodNullable<z.ZodString>;
        street: z.ZodNullable<z.ZodString>;
        custom_id: z.ZodNullable<z.ZodString>;
        location_manager: z.ZodNullable<z.ZodString>;
        street_number: z.ZodNullable<z.ZodNumber>;
        neighborhood: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        state: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNullable<z.ZodNumber>;
        phone: z.ZodNullable<z.ZodString>;
        production_capacity: z.ZodNullable<z.ZodNumber>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        description: z.ZodNullable<z.ZodString>;
        street: z.ZodNullable<z.ZodString>;
        custom_id: z.ZodNullable<z.ZodString>;
        location_manager: z.ZodNullable<z.ZodString>;
        street_number: z.ZodNullable<z.ZodNumber>;
        neighborhood: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        state: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNullable<z.ZodNumber>;
        phone: z.ZodNullable<z.ZodString>;
        production_capacity: z.ZodNullable<z.ZodNumber>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: PATCH /locations/:id
 * ------------------------------------------------------------------
 */
declare const updateLocationSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        street: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location_manager: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        street_number: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        neighborhood: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        zip_code: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        production_capacity: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        name: z.ZodNullable<z.ZodString>;
        description: z.ZodNullable<z.ZodString>;
        street: z.ZodNullable<z.ZodString>;
        custom_id: z.ZodNullable<z.ZodString>;
        location_manager: z.ZodNullable<z.ZodString>;
        street_number: z.ZodNullable<z.ZodNumber>;
        neighborhood: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        state: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNullable<z.ZodNumber>;
        phone: z.ZodNullable<z.ZodString>;
        production_capacity: z.ZodNullable<z.ZodNumber>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: DELETE /locations/:id
 * ------------------------------------------------------------------
 */
declare const deleteLocationSchema: z.ZodObject<{
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
type GetAllLocationsSchema = EndpointSchema<z.infer<typeof getAllLocationsSchema>["params"], z.infer<typeof getAllLocationsSchema>["body"], z.infer<typeof getAllLocationsSchema>["query"], z.infer<typeof getAllLocationsSchema>["response"]>;
type GetByIdLocationSchema = EndpointSchema<z.infer<typeof getByIdLocationSchema>["params"], z.infer<typeof getByIdLocationSchema>["body"], z.infer<typeof getByIdLocationSchema>["query"], z.infer<typeof getByIdLocationSchema>["response"]>;
type GetByNameLocationSchema = EndpointSchema<z.infer<typeof getByNameLocationSchema>["params"], z.infer<typeof getByNameLocationSchema>["body"], z.infer<typeof getByNameLocationSchema>["query"], z.infer<typeof getByNameLocationSchema>["response"]>;
type GetByCustomIdLocationSchema = EndpointSchema<z.infer<typeof getByCustomIdLocationSchema>["params"], z.infer<typeof getByCustomIdLocationSchema>["body"], z.infer<typeof getByCustomIdLocationSchema>["query"], z.infer<typeof getByCustomIdLocationSchema>["response"]>;
type CreateLocationSchema = EndpointSchema<z.infer<typeof createLocationSchema>["params"], z.infer<typeof createLocationSchema>["body"], z.infer<typeof createLocationSchema>["query"], z.infer<typeof createLocationSchema>["response"]>;
type UpdateLocationSchema = EndpointSchema<z.infer<typeof updateLocationSchema>["params"], z.infer<typeof updateLocationSchema>["body"], z.infer<typeof updateLocationSchema>["query"], z.infer<typeof updateLocationSchema>["response"]>;
type DeleteLocationSchema = EndpointSchema<z.infer<typeof deleteLocationSchema>["params"], z.infer<typeof deleteLocationSchema>["body"], z.infer<typeof deleteLocationSchema>["query"], z.infer<typeof deleteLocationSchema>["response"]>;
export { deleteLocationSchema, createLocationSchema, getAllLocationsSchema, getByIdLocationSchema, getByCustomIdLocationSchema, getByNameLocationSchema, updateLocationSchema };
export type { CreateLocationSchema, GetAllLocationsSchema, GetByCustomIdLocationSchema, GetByIdLocationSchema, GetByNameLocationSchema, UpdateLocationSchema, DeleteLocationSchema };
