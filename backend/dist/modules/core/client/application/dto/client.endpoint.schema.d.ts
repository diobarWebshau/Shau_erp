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
 * Schema: GET /client
 * ------------------------------------------------------------------
 */
declare const getAllClientsSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        company_name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        tax_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        email: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        phone: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        city: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        state: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        country: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        street: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        neighborhood: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        tax_regimen: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        payment_terms: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        cfdi: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        company_name: z.ZodString;
        tax_id: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        payment_terms: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNumber;
        credit_limit: z.ZodNullable<z.ZodNumber>;
        tax_regimen: z.ZodNullable<z.ZodString>;
        cfdi: z.ZodString;
        payment_method: z.ZodNullable<z.ZodString>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /client/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdClientSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        company_name: z.ZodString;
        tax_id: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        payment_terms: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNumber;
        credit_limit: z.ZodNullable<z.ZodNumber>;
        tax_regimen: z.ZodNullable<z.ZodString>;
        cfdi: z.ZodString;
        payment_method: z.ZodNullable<z.ZodString>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /client/name/:name
 * ------------------------------------------------------------------
 */
declare const getByCompanyNameClientSchema: z.ZodObject<{
    params: z.ZodObject<{
        company_name: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        company_name: z.ZodString;
        tax_id: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        payment_terms: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNumber;
        credit_limit: z.ZodNullable<z.ZodNumber>;
        tax_regimen: z.ZodNullable<z.ZodString>;
        cfdi: z.ZodString;
        payment_method: z.ZodNullable<z.ZodString>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /client/cfdi/:name
 * ------------------------------------------------------------------
 */
declare const getByCfdiClientSchema: z.ZodObject<{
    params: z.ZodObject<{
        cfdi: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        company_name: z.ZodString;
        tax_id: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        payment_terms: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNumber;
        credit_limit: z.ZodNullable<z.ZodNumber>;
        tax_regimen: z.ZodNullable<z.ZodString>;
        cfdi: z.ZodString;
        payment_method: z.ZodNullable<z.ZodString>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: POST /client
 * ------------------------------------------------------------------
 */
declare const createClientSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        company_name: z.ZodString;
        tax_id: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        payment_terms: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNumber;
        credit_limit: z.ZodNullable<z.ZodNumber>;
        tax_regimen: z.ZodNullable<z.ZodString>;
        cfdi: z.ZodString;
        payment_method: z.ZodNullable<z.ZodString>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        company_name: z.ZodString;
        tax_id: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        payment_terms: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNumber;
        credit_limit: z.ZodNullable<z.ZodNumber>;
        tax_regimen: z.ZodNullable<z.ZodString>;
        cfdi: z.ZodString;
        payment_method: z.ZodNullable<z.ZodString>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: PATCH /client/:id
 * ------------------------------------------------------------------
 */
declare const updateClientSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        company_name: z.ZodOptional<z.ZodString>;
        tax_id: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        street: z.ZodOptional<z.ZodString>;
        street_number: z.ZodOptional<z.ZodNumber>;
        neighborhood: z.ZodOptional<z.ZodString>;
        payment_terms: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        zip_code: z.ZodOptional<z.ZodNumber>;
        credit_limit: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        tax_regimen: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        cfdi: z.ZodOptional<z.ZodString>;
        payment_method: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        company_name: z.ZodString;
        tax_id: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        street: z.ZodString;
        street_number: z.ZodNumber;
        neighborhood: z.ZodString;
        payment_terms: z.ZodNullable<z.ZodString>;
        zip_code: z.ZodNumber;
        credit_limit: z.ZodNullable<z.ZodNumber>;
        tax_regimen: z.ZodNullable<z.ZodString>;
        cfdi: z.ZodString;
        payment_method: z.ZodNullable<z.ZodString>;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: DELETE /client/:id
 * ------------------------------------------------------------------
 */
declare const deleteClientSchema: z.ZodObject<{
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
type GetByIdClientSchema = EndpointSchema<z.infer<typeof getByIdClientSchema>["params"], z.infer<typeof getByIdClientSchema>["body"], z.infer<typeof getByIdClientSchema>["query"], z.infer<typeof getByIdClientSchema>["response"]>;
type GetByCompanyNameClientSchema = EndpointSchema<z.infer<typeof getByCompanyNameClientSchema>["params"], z.infer<typeof getByCompanyNameClientSchema>["body"], z.infer<typeof getByCompanyNameClientSchema>["query"], z.infer<typeof getByCompanyNameClientSchema>["response"]>;
type GetByCfdiClientSchema = EndpointSchema<z.infer<typeof getByCfdiClientSchema>["params"], z.infer<typeof getByCfdiClientSchema>["body"], z.infer<typeof getByCfdiClientSchema>["query"], z.infer<typeof getByCfdiClientSchema>["response"]>;
type CreateClientSchema = EndpointSchema<z.infer<typeof createClientSchema>["params"], z.infer<typeof createClientSchema>["body"], z.infer<typeof createClientSchema>["query"], z.infer<typeof createClientSchema>["response"]>;
type GetAllClientsSchema = EndpointSchema<z.infer<typeof getAllClientsSchema>["params"], z.infer<typeof getAllClientsSchema>["body"], z.infer<typeof getAllClientsSchema>["query"], z.infer<typeof getAllClientsSchema>["response"]>;
type UpdateClientSchema = EndpointSchema<z.infer<typeof updateClientSchema>["params"], z.infer<typeof updateClientSchema>["body"], z.infer<typeof updateClientSchema>["query"], z.infer<typeof updateClientSchema>["response"]>;
type DeleteClientSchema = EndpointSchema<z.infer<typeof deleteClientSchema>["params"], z.infer<typeof deleteClientSchema>["body"], z.infer<typeof deleteClientSchema>["query"], z.infer<typeof deleteClientSchema>["response"]>;
export { deleteClientSchema, createClientSchema, getByIdClientSchema, getAllClientsSchema, getByCompanyNameClientSchema, updateClientSchema, getByCfdiClientSchema };
export type { CreateClientSchema, GetAllClientsSchema, GetByIdClientSchema, GetByCompanyNameClientSchema, UpdateClientSchema, DeleteClientSchema, GetByCfdiClientSchema };
