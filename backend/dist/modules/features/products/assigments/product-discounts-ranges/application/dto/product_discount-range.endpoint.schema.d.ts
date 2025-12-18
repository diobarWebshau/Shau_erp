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
declare const getAllProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        product_id: z.ZodNumber;
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /location-location-type/product/:product_id
 * ------------------------------------------------------------------
 */
declare const getByProductIdProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{
        product_id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
declare const createProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        product_id: z.ZodNumber;
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
    }, z.core.$strip>;
    response: z.ZodObject<{
        product_id: z.ZodNumber;
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
declare const updateProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        product_id: z.ZodOptional<z.ZodNumber>;
        unit_price: z.ZodOptional<z.ZodNumber>;
        min_qty: z.ZodOptional<z.ZodNumber>;
        max_qty: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        product_id: z.ZodNumber;
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
declare const deleteProductDiscountRangeSchema: z.ZodObject<{
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
type GetAllProductDiscountRangesSchema = EndpointSchema<z.infer<typeof getAllProductDiscountRangeSchema>["params"], z.infer<typeof getAllProductDiscountRangeSchema>["body"], z.infer<typeof getAllProductDiscountRangeSchema>["query"], z.infer<typeof getAllProductDiscountRangeSchema>["response"]>;
type GetByIdProductDiscountRangeSchema = EndpointSchema<z.infer<typeof getByIdProductDiscountRangeSchema>["params"], z.infer<typeof getByIdProductDiscountRangeSchema>["body"], z.infer<typeof getByIdProductDiscountRangeSchema>["query"], z.infer<typeof getByIdProductDiscountRangeSchema>["response"]>;
type GetByProductIdProductDiscountRangeSchema = EndpointSchema<z.infer<typeof getByProductIdProductDiscountRangeSchema>["params"], z.infer<typeof getByProductIdProductDiscountRangeSchema>["body"], z.infer<typeof getByProductIdProductDiscountRangeSchema>["query"], z.infer<typeof getByProductIdProductDiscountRangeSchema>["response"]>;
type CreateProductDiscountRangeSchema = EndpointSchema<z.infer<typeof createProductDiscountRangeSchema>["params"], z.infer<typeof createProductDiscountRangeSchema>["body"], z.infer<typeof createProductDiscountRangeSchema>["query"], z.infer<typeof createProductDiscountRangeSchema>["response"]>;
type UpdateProductDiscountRangeSchema = EndpointSchema<z.infer<typeof updateProductDiscountRangeSchema>["params"], z.infer<typeof updateProductDiscountRangeSchema>["body"], z.infer<typeof updateProductDiscountRangeSchema>["query"], z.infer<typeof updateProductDiscountRangeSchema>["response"]>;
type DeleteProductDiscountRangeSchema = EndpointSchema<z.infer<typeof deleteProductDiscountRangeSchema>["params"], z.infer<typeof deleteProductDiscountRangeSchema>["body"], z.infer<typeof deleteProductDiscountRangeSchema>["query"], z.infer<typeof deleteProductDiscountRangeSchema>["response"]>;
export { deleteProductDiscountRangeSchema, createProductDiscountRangeSchema, getAllProductDiscountRangeSchema, getByProductIdProductDiscountRangeSchema, updateProductDiscountRangeSchema, getByIdProductDiscountRangeSchema };
export type { CreateProductDiscountRangeSchema, GetAllProductDiscountRangesSchema, GetByIdProductDiscountRangeSchema, UpdateProductDiscountRangeSchema, DeleteProductDiscountRangeSchema, GetByProductIdProductDiscountRangeSchema };
