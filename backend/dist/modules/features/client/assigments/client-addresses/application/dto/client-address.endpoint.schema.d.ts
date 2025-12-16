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
 * Schema: GET /client-address
 * ------------------------------------------------------------------
 */
declare const getAllClientAddressesSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        client_id: z.ZodNumber;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        zip_code: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /client-address/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdClientAddressSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        client_id: z.ZodNumber;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        zip_code: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /client-address/id/:id
 * ------------------------------------------------------------------
 */
declare const getByClientIdClientAddressSchema: z.ZodObject<{
    params: z.ZodObject<{
        client_id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        client_id: z.ZodNumber;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        zip_code: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: POST /client-address
 * ------------------------------------------------------------------
 */
declare const createClientAddressSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        client_id: z.ZodNumber;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        zip_code: z.ZodNumber;
    }, z.core.$strip>;
    response: z.ZodObject<{
        client_id: z.ZodNumber;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        zip_code: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: PATCH /client-address/:id
 * ------------------------------------------------------------------
 */
declare const updateClientAddressSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        client_id: z.ZodOptional<z.ZodNumber>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        street_number: z.ZodOptional<z.ZodNumber>;
        neighborhood: z.ZodOptional<z.ZodString>;
        zip_code: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        client_id: z.ZodNumber;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        zip_code: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: DELETE /client-address/:id
 * ------------------------------------------------------------------
 */
declare const deleteClientAddressSchema: z.ZodObject<{
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
type GetByIdClientAddressSchema = EndpointSchema<z.infer<typeof getByIdClientAddressSchema>["params"], z.infer<typeof getByIdClientAddressSchema>["body"], z.infer<typeof getByIdClientAddressSchema>["query"], z.infer<typeof getByIdClientAddressSchema>["response"]>;
type GetByClientIdClientAddressSchema = EndpointSchema<z.infer<typeof getByClientIdClientAddressSchema>["params"], z.infer<typeof getByClientIdClientAddressSchema>["body"], z.infer<typeof getByClientIdClientAddressSchema>["query"], z.infer<typeof getByClientIdClientAddressSchema>["response"]>;
type CreateClientAddressSchema = EndpointSchema<z.infer<typeof createClientAddressSchema>["params"], z.infer<typeof createClientAddressSchema>["body"], z.infer<typeof createClientAddressSchema>["query"], z.infer<typeof createClientAddressSchema>["response"]>;
type GetAllClientAddresssSchema = EndpointSchema<z.infer<typeof getAllClientAddressesSchema>["params"], z.infer<typeof getAllClientAddressesSchema>["body"], z.infer<typeof getAllClientAddressesSchema>["query"], z.infer<typeof getAllClientAddressesSchema>["response"]>;
type UpdateClientAddressSchema = EndpointSchema<z.infer<typeof updateClientAddressSchema>["params"], z.infer<typeof updateClientAddressSchema>["body"], z.infer<typeof updateClientAddressSchema>["query"], z.infer<typeof updateClientAddressSchema>["response"]>;
type DeleteClientAddressSchema = EndpointSchema<z.infer<typeof deleteClientAddressSchema>["params"], z.infer<typeof deleteClientAddressSchema>["body"], z.infer<typeof deleteClientAddressSchema>["query"], z.infer<typeof deleteClientAddressSchema>["response"]>;
export { deleteClientAddressSchema, createClientAddressSchema, getByIdClientAddressSchema, getAllClientAddressesSchema, getByClientIdClientAddressSchema, updateClientAddressSchema };
export type { CreateClientAddressSchema, GetAllClientAddresssSchema, GetByIdClientAddressSchema, GetByClientIdClientAddressSchema, UpdateClientAddressSchema, DeleteClientAddressSchema };
