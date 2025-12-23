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
declare const getAllProductInputProcessSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        product_input_id: z.ZodNumber;
        product_process_id: z.ZodNumber;
        qty: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdProductInputProcessSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        product_id: z.ZodNumber;
        product_input_id: z.ZodNumber;
        product_process_id: z.ZodNumber;
        qty: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByProductInputProcessSchema: z.ZodObject<{
    params: z.ZodObject<{
        product_id: z.ZodString;
        product_input_id: z.ZodString;
        product_process_id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        product_id: z.ZodNumber;
        product_input_id: z.ZodNumber;
        product_process_id: z.ZodNumber;
        qty: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
declare const createProductInputProcessSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        product_id: z.ZodNumber;
        product_input_id: z.ZodNumber;
        product_process_id: z.ZodNumber;
        qty: z.ZodNumber;
    }, z.core.$strip>;
    response: z.ZodObject<{
        product_id: z.ZodNumber;
        product_input_id: z.ZodNumber;
        product_process_id: z.ZodNumber;
        qty: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
declare const updateProductInputProcessSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        product_id: z.ZodOptional<z.ZodNumber>;
        product_input_id: z.ZodOptional<z.ZodNumber>;
        product_process_id: z.ZodOptional<z.ZodNumber>;
        qty: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        product_id: z.ZodNumber;
        product_input_id: z.ZodNumber;
        product_process_id: z.ZodNumber;
        qty: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
declare const deleteProductInputProcessSchema: z.ZodObject<{
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
type GetAllProductInputProcessSchema = EndpointSchema<z.infer<typeof getAllProductInputProcessSchema>["params"], z.infer<typeof getAllProductInputProcessSchema>["body"], z.infer<typeof getAllProductInputProcessSchema>["query"], z.infer<typeof getAllProductInputProcessSchema>["response"]>;
type GetByProductInputProcessSchema = EndpointSchema<z.infer<typeof getByProductInputProcessSchema>["params"], z.infer<typeof getByProductInputProcessSchema>["body"], z.infer<typeof getByProductInputProcessSchema>["query"], z.infer<typeof getByProductInputProcessSchema>["response"]>;
type GetByIdProductInputProcessSchema = EndpointSchema<z.infer<typeof getByIdProductInputProcessSchema>["params"], z.infer<typeof getByIdProductInputProcessSchema>["body"], z.infer<typeof getByIdProductInputProcessSchema>["query"], z.infer<typeof getByIdProductInputProcessSchema>["response"]>;
type CreateProductInputProcessSchema = EndpointSchema<z.infer<typeof createProductInputProcessSchema>["params"], z.infer<typeof createProductInputProcessSchema>["body"], z.infer<typeof createProductInputProcessSchema>["query"], z.infer<typeof createProductInputProcessSchema>["response"]>;
type UpdateProductInputProcessSchema = EndpointSchema<z.infer<typeof updateProductInputProcessSchema>["params"], z.infer<typeof updateProductInputProcessSchema>["body"], z.infer<typeof updateProductInputProcessSchema>["query"], z.infer<typeof updateProductInputProcessSchema>["response"]>;
type DeleteProductInputProcessSchema = EndpointSchema<z.infer<typeof deleteProductInputProcessSchema>["params"], z.infer<typeof deleteProductInputProcessSchema>["body"], z.infer<typeof deleteProductInputProcessSchema>["query"], z.infer<typeof deleteProductInputProcessSchema>["response"]>;
export { deleteProductInputProcessSchema, createProductInputProcessSchema, getAllProductInputProcessSchema, updateProductInputProcessSchema, getByIdProductInputProcessSchema, getByProductInputProcessSchema };
export type { CreateProductInputProcessSchema, GetByProductInputProcessSchema, GetAllProductInputProcessSchema, GetByIdProductInputProcessSchema, UpdateProductInputProcessSchema, DeleteProductInputProcessSchema };
