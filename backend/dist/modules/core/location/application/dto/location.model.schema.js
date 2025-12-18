"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationQuerySchema = exports.locationUpdateSchema = exports.locationResponseSchema = exports.locationCreateSchema = void 0;
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
const locationCreateSchema = zod_1.z.object({
    name: zod_1.z.string().nullable(),
    description: zod_1.z.string().nullable(),
    street: zod_1.z.string().nullable(),
    custom_id: zod_1.z.string().nullable(),
    location_manager: zod_1.z.string().nullable(),
    street_number: zod_1.z.number().int().nullable(),
    neighborhood: zod_1.z.string().nullable(),
    city: zod_1.z.string().nullable(),
    state: zod_1.z.string().nullable(),
    country: zod_1.z.string().nullable(),
    zip_code: zod_1.z.number().int().nullable(),
    phone: zod_1.z.string().nullable(),
    production_capacity: zod_1.z.number().nullable(),
    is_active: zod_1.z.preprocess((val) => {
        if (typeof val === "boolean")
            return val;
        if (val === "true" || val === "1" || val === 1)
            return true;
        if (val === "false" || val === "0" || val === 0)
            return false;
        return val;
    }, zod_1.z.boolean({ message: "Active must be a boolean" })),
});
exports.locationCreateSchema = locationCreateSchema;
/**
 * UpdateSchema
 * ------------------------------------------------------------------
 * Define los campos que pueden actualizarse mediante PATCH.
 * Aqui todos los atributos son opcionales para permitir modificaciones parciales.
 */
const locationUpdateSchema = locationCreateSchema.partial();
exports.locationUpdateSchema = locationUpdateSchema;
/**
 * ResponseSchema
 * ------------------------------------------------------------------
 * Representa el objeto completo que devuelve la API en las respuestas.
 * Incluye los campos de creación más los metadatos generados por el sistema.
 */
const locationResponseSchema = locationCreateSchema.extend({
    id: zod_1.z.number().int(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string(),
});
exports.locationResponseSchema = locationResponseSchema;
/**
 * QuerySchema
 * ------------------------------------------------------------------
 * Define los parámetros de consulta aceptados por endpoints GET.
 *
 * Comentario complementario:
 * - Este schema modela exclusivamente datos provenientes del query string.
 * - En HTTP todos los valores llegan como string o string[].
 * - El uso de `z.union([string, string[]])` refleja el comportamiento real
 *   de Express cuando un parámetro se repite en la URL.
 * - La conversión de tipos (string → number/boolean) se realiza posteriormente
 *   en el controller o en una capa de normalización.
 */
const locationQuerySchema = zod_1.z.object({
    filter: zod_1.z.string().optional(),
    exclude_ids: zod_1.z.union([
        zod_1.z.string(),
        zod_1.z.array(zod_1.z.string())
    ]).optional(),
    name: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    description: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    email: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    phone: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    custom_id: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    is_active: zod_1.z.preprocess((val) => {
        if (typeof val === "boolean")
            return val;
        if (val === "true" || val === "1" || val === 1)
            return true;
        if (val === "false" || val === "0" || val === 0)
            return false;
        return val;
    }, zod_1.z.boolean({ message: "Active must be a boolean" })).optional(),
}).strict();
exports.locationQuerySchema = locationQuerySchema;
