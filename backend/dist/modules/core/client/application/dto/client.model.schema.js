"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientQuerySchema = exports.clientResponseSchema = exports.clientUpdateSchema = exports.clientCreateSchema = void 0;
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
 *
 * Comentario complementario:
 * - Este schema representa el contrato de entrada HTTP para la operación CREATE.
 * - No incluye campos generados por el sistema como `id` o timestamps.
 * - La obligatoriedad aquí refleja lo que la API exige, no necesariamente
 *   todas las reglas del dominio interno.
 */
const clientCreateSchema = zod_1.z.object({
    company_name: zod_1.z.string(),
    tax_id: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    country: zod_1.z.string(),
    street: zod_1.z.string(),
    street_number: zod_1.z.number(),
    neighborhood: zod_1.z.string(),
    payment_terms: zod_1.z.string().nullable(),
    zip_code: zod_1.z.number(),
    credit_limit: zod_1.z.number().nullable(),
    tax_regimen: zod_1.z.string().nullable(),
    cfdi: zod_1.z.string(),
    payment_method: zod_1.z.string().nullable(),
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
exports.clientCreateSchema = clientCreateSchema;
/**
 * UpdateSchema
 * ------------------------------------------------------------------
 * Define los campos que pueden actualizarse mediante PATCH.
 * Aqui todos los atributos son opcionales para permitir modificaciones parciales.
 *
 * Comentario complementario:
 * - La semántica de PATCH implica actualización parcial.
 * - Este schema permite enviar solo los campos que se desean modificar.
 * - Las restricciones de qué campos pueden o no actualizarse se controlan
 *   en capas posteriores (casos de uso o dominio).
 */
const clientUpdateSchema = clientCreateSchema.partial();
exports.clientUpdateSchema = clientUpdateSchema;
/**
 * ResponseSchema
 * ------------------------------------------------------------------
 * Representa el objeto COMPLETO que la API devuelve.
 * El output sigue siendo exactamente igual al original.
 *
 * Comentario complementario:
 * - Este schema define el contrato de salida HTTP.
 * - Las fechas se representan como string porque HTTP no transporta `Date`.
 * - No implica que el dominio use strings internamente para fechas.
 */
const clientResponseSchema = clientCreateSchema.extend({
    id: zod_1.z.number().int(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string(),
});
exports.clientResponseSchema = clientResponseSchema;
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
const clientQuerySchema = zod_1.z.object({
    filter: zod_1.z.string().optional(),
    exclude_ids: zod_1.z.union([
        zod_1.z.string(),
        zod_1.z.array(zod_1.z.string())
    ]).optional(),
    company_name: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    tax_id: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    email: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    phone: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    city: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    state: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    country: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    street: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    neighborhood: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    tax_regimen: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    payment_terms: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    cfdi: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
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
exports.clientQuerySchema = clientQuerySchema;
