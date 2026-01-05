import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
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
declare const getAllProductionLineProductSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        production_line_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdProductionLineProductSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        product_id: z.ZodNumber;
        production_line_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByProductionLineProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        production_line_id: z.ZodString;
        product_id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        product_id: z.ZodNumber;
        production_line_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createProductionLineProductSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        product_id: z.ZodNumber;
        production_line_id: z.ZodNumber;
    }, z.core.$strip>;
    response: z.ZodObject<{
        product_id: z.ZodNumber;
        production_line_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const updateProductionLineProductSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        product_id: z.ZodOptional<z.ZodNumber>;
        production_line_id: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        product_id: z.ZodNumber;
        production_line_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const deleteProductionLineProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
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
type GetAllProductionLineProductSchema = EndpointSchema<z.infer<typeof getAllProductionLineProductSchema>["params"], z.infer<typeof getAllProductionLineProductSchema>["body"], z.infer<typeof getAllProductionLineProductSchema>["query"], z.infer<typeof getAllProductionLineProductSchema>["response"]>;
type GetByIdProductionLineProductSchema = EndpointSchema<z.infer<typeof getByIdProductionLineProductSchema>["params"], z.infer<typeof getByIdProductionLineProductSchema>["body"], z.infer<typeof getByIdProductionLineProductSchema>["query"], z.infer<typeof getByIdProductionLineProductSchema>["response"]>;
type GetByProductionLineProductSchema = EndpointSchema<z.infer<typeof getByProductionLineProductSchema>["params"], z.infer<typeof getByProductionLineProductSchema>["body"], z.infer<typeof getByProductionLineProductSchema>["query"], z.infer<typeof getByProductionLineProductSchema>["response"]>;
type CreateProductionLineProductSchema = EndpointSchema<z.infer<typeof createProductionLineProductSchema>["params"], z.infer<typeof createProductionLineProductSchema>["body"], z.infer<typeof createProductionLineProductSchema>["query"], z.infer<typeof createProductionLineProductSchema>["response"]>;
type UpdateProductionLineProductSchema = EndpointSchema<z.infer<typeof updateProductionLineProductSchema>["params"], z.infer<typeof updateProductionLineProductSchema>["body"], z.infer<typeof updateProductionLineProductSchema>["query"], z.infer<typeof updateProductionLineProductSchema>["response"]>;
type DeleteProductionLineProductSchema = EndpointSchema<z.infer<typeof deleteProductionLineProductSchema>["params"], z.infer<typeof deleteProductionLineProductSchema>["body"], z.infer<typeof deleteProductionLineProductSchema>["query"], z.infer<typeof deleteProductionLineProductSchema>["response"]>;
export type { CreateProductionLineProductSchema, DeleteProductionLineProductSchema, GetAllProductionLineProductSchema, GetByIdProductionLineProductSchema, GetByProductionLineProductSchema, UpdateProductionLineProductSchema };
export { createProductionLineProductSchema, deleteProductionLineProductSchema, getAllProductionLineProductSchema, getByIdProductionLineProductSchema, getByProductionLineProductSchema, updateProductionLineProductSchema };
