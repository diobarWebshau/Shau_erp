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
declare const getAllProductInputSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdProductInputSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        product_id: z.ZodNumber;
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdProductInputProductInputSchema: z.ZodObject<{
    params: z.ZodObject<{
        product_id: z.ZodString;
        input_id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        product_id: z.ZodNumber;
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
declare const createProductInputSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        product_id: z.ZodNumber;
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
    }, z.core.$strip>;
    response: z.ZodObject<{
        product_id: z.ZodNumber;
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
declare const updateProductInputSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        product_id: z.ZodOptional<z.ZodNumber>;
        input_id: z.ZodOptional<z.ZodNumber>;
        equivalence: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        product_id: z.ZodNumber;
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
declare const deleteProductInputSchema: z.ZodObject<{
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
type GetAllProductInputsSchema = EndpointSchema<z.infer<typeof getAllProductInputSchema>["params"], z.infer<typeof getAllProductInputSchema>["body"], z.infer<typeof getAllProductInputSchema>["query"], z.infer<typeof getAllProductInputSchema>["response"]>;
type GetByIdProductInputSchema = EndpointSchema<z.infer<typeof getByIdProductInputSchema>["params"], z.infer<typeof getByIdProductInputSchema>["body"], z.infer<typeof getByIdProductInputSchema>["query"], z.infer<typeof getByIdProductInputSchema>["response"]>;
type CreateProductInputSchema = EndpointSchema<z.infer<typeof createProductInputSchema>["params"], z.infer<typeof createProductInputSchema>["body"], z.infer<typeof createProductInputSchema>["query"], z.infer<typeof createProductInputSchema>["response"]>;
type UpdateProductInputSchema = EndpointSchema<z.infer<typeof updateProductInputSchema>["params"], z.infer<typeof updateProductInputSchema>["body"], z.infer<typeof updateProductInputSchema>["query"], z.infer<typeof updateProductInputSchema>["response"]>;
type DeleteProductInputSchema = EndpointSchema<z.infer<typeof deleteProductInputSchema>["params"], z.infer<typeof deleteProductInputSchema>["body"], z.infer<typeof deleteProductInputSchema>["query"], z.infer<typeof deleteProductInputSchema>["response"]>;
type GetByIdProductInputProductInputSchema = EndpointSchema<z.infer<typeof getByIdProductInputProductInputSchema>["params"], z.infer<typeof getByIdProductInputProductInputSchema>["body"], z.infer<typeof getByIdProductInputProductInputSchema>["query"], z.infer<typeof getByIdProductInputProductInputSchema>["response"]>;
export { deleteProductInputSchema, createProductInputSchema, getAllProductInputSchema, updateProductInputSchema, getByIdProductInputSchema, getByIdProductInputProductInputSchema };
export type { CreateProductInputSchema, GetAllProductInputsSchema, GetByIdProductInputSchema, UpdateProductInputSchema, DeleteProductInputSchema, GetByIdProductInputProductInputSchema };
