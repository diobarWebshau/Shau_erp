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
 * Schema: GET /product
 * ------------------------------------------------------------------
 */
declare const getAllProductsSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        description: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        sku: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        presentation: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        unit_of_measure: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        barcode: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        custom_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodBoolean>>;
        is_draft: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodBoolean>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /product/id/:id
 * ------------------------------------------------------------------
 */
declare const getByIdProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /product/name/:name
 * ------------------------------------------------------------------
 */
declare const getByNameProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /product/barcode/:barcode
 * ------------------------------------------------------------------
 */
declare const getByBarcodeProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        barcode: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /product/sku/:sku
 * ------------------------------------------------------------------
 */
declare const getBySkuProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        sku: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: GET /product/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
declare const getByCustomIdProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        custom_id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema: POST /product
 * ------------------------------------------------------------------
 */
declare const createProductSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: PATCH /product/:id
 * ------------------------------------------------------------------
 */
declare const updateProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        custom_id: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        type: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        description: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        presentation: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        unit_of_measure: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        storage_conditions: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        barcode: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
        sku: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        photo: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        sale_price: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>>;
        production_cost: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>>;
        is_draft: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema: DELETE /product/:id
 * ------------------------------------------------------------------
 */
declare const deleteProductSchema: z.ZodObject<{
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
type GetAllProductsSchema = EndpointSchema<z.infer<typeof getAllProductsSchema>["params"], z.infer<typeof getAllProductsSchema>["body"], z.infer<typeof getAllProductsSchema>["query"], z.infer<typeof getAllProductsSchema>["response"]>;
type GetByIdProductSchema = EndpointSchema<z.infer<typeof getByIdProductSchema>["params"], z.infer<typeof getByIdProductSchema>["body"], z.infer<typeof getByIdProductSchema>["query"], z.infer<typeof getByIdProductSchema>["response"]>;
type GetByNameProductSchema = EndpointSchema<z.infer<typeof getByNameProductSchema>["params"], z.infer<typeof getByNameProductSchema>["body"], z.infer<typeof getByNameProductSchema>["query"], z.infer<typeof getByNameProductSchema>["response"]>;
type GetByBarcodeProductSchema = EndpointSchema<z.infer<typeof getByBarcodeProductSchema>["params"], z.infer<typeof getByBarcodeProductSchema>["body"], z.infer<typeof getByBarcodeProductSchema>["query"], z.infer<typeof getByBarcodeProductSchema>["response"]>;
type GetByCustomIdProductSchema = EndpointSchema<z.infer<typeof getByCustomIdProductSchema>["params"], z.infer<typeof getByCustomIdProductSchema>["body"], z.infer<typeof getByCustomIdProductSchema>["query"], z.infer<typeof getByCustomIdProductSchema>["response"]>;
type GetBySkuProductSchema = EndpointSchema<z.infer<typeof getBySkuProductSchema>["params"], z.infer<typeof getBySkuProductSchema>["body"], z.infer<typeof getBySkuProductSchema>["query"], z.infer<typeof getBySkuProductSchema>["response"]>;
type CreateProductSchema = EndpointSchema<z.infer<typeof createProductSchema>["params"], z.infer<typeof createProductSchema>["body"], z.infer<typeof createProductSchema>["query"], z.infer<typeof createProductSchema>["response"]>;
type UpdateProductSchema = EndpointSchema<z.infer<typeof updateProductSchema>["params"], z.infer<typeof updateProductSchema>["body"], z.infer<typeof updateProductSchema>["query"], z.infer<typeof updateProductSchema>["response"]>;
type DeleteProductSchema = EndpointSchema<z.infer<typeof deleteProductSchema>["params"], z.infer<typeof deleteProductSchema>["body"], z.infer<typeof deleteProductSchema>["query"], z.infer<typeof deleteProductSchema>["response"]>;
export { getByIdProductSchema, getAllProductsSchema, getByBarcodeProductSchema, getByCustomIdProductSchema, getByNameProductSchema, getBySkuProductSchema, deleteProductSchema, createProductSchema, updateProductSchema, };
export type { GetAllProductsSchema, GetByIdProductSchema, GetByBarcodeProductSchema, GetByCustomIdProductSchema, GetByNameProductSchema, GetBySkuProductSchema, UpdateProductSchema, CreateProductSchema, DeleteProductSchema, };
