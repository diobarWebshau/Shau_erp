"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountRangeUpdateSchema = exports.ProductDiscountRangeReponseSchema = exports.ProductDiscountRangeCreateSchema = void 0;
const zod_1 = require("zod");
/**
 * Schemas
 * ------------------------------------------------------------------
 * Definen la estructura y reglas de validación de los datos
 * en la capa de aplicación. Se implementan con Zod y sirven
 * como contratos formales entre las distintas capas del sistema.
 *
 * Función técnica:
 * - Especificar qué atributos son requeridos, opcionales o generados.
 * - Validar tipos y formatos de los datos recibidos o devueltos.
 * - Garantizar consistencia entre la entrada, la actualización
 *   y la respuesta de la API.
 *
 * Qué hacen:
 * - Actúan como contratos de validación y tipado.
 * - Centralizan las reglas de datos para evitar duplicación.
 * - Se integran con los DTOs para mantener coherencia en el código.
 *
 * Qué no hacen:
 * - No contienen lógica de negocio ni reglas de dominio.
 * - No gestionan persistencia ni infraestructura.
 * - No sustituyen a los casos de uso, solo los complementan
 *   asegurando que los datos cumplan con las reglas definidas.
 *
 * Convención de nombres:
 * Se nombran con sufijos como `CreateSchema`, `UpdateSchema` y `ResponseSchema`
 * para indicar su propósito dentro del ciclo de vida de los datos.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: entidades y reglas de negocio.
 * - Schemas: contratos de validación y tipado de datos.
 * - DTOs: tipos derivados de los schemas para transporte seguro.
 * - UseCases: orquestan operaciones usando schemas y DTOs.
 * - Orchestrators: exponen endpoints que consumen estos contratos.
 */
/**
 * CreateSchema
 * ------------------------------------------------------------------
 * Define los campos requeridos para crear un registro mediante POST.
 * Aqui todos los atributos son obligatorios y se validan según su tipo.
 */
const ProductDiscountRangeCreateSchema = zod_1.z.object({
    product_id: zod_1.z.number().int(),
    unit_price: zod_1.z.number(),
    min_qty: zod_1.z.number(),
    max_qty: zod_1.z.number(),
});
exports.ProductDiscountRangeCreateSchema = ProductDiscountRangeCreateSchema;
/**
 * UpdateSchema
 * ------------------------------------------------------------------
 * Define los campos que pueden actualizarse mediante PATCH.
 * Aqui todos los atributos son opcionales para permitir modificaciones parciales.
 */
const ProductDiscountRangeUpdateSchema = ProductDiscountRangeCreateSchema.partial();
exports.ProductDiscountRangeUpdateSchema = ProductDiscountRangeUpdateSchema;
/**
 * ResponseSchema
 * ------------------------------------------------------------------
 * Representa el objeto completo que devuelve la API en las respuestas.
 * Incluye los campos de creación más los metadatos generados por el sistema.
 */
const ProductDiscountRangeReponseSchema = ProductDiscountRangeCreateSchema.extend({
    id: zod_1.z.number().int(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string(),
});
exports.ProductDiscountRangeReponseSchema = ProductDiscountRangeReponseSchema;
