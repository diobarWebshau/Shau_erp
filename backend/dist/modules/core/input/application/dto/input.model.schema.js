"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputQuerySchema = exports.inputResponseSchema = exports.inputUpdateSchema = exports.inputCreateSchema = void 0;
const form_data_normalizers_1 = require("../../../../../shared/http/input/normalizers/form-data.normalizers");
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
 * Ubicación en la arquitectura Clean + Core + Features + OrcheSstrators:
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
const inputCreateSchema = zod_1.z.object({
    custom_id: zod_1.z.string().nullable().optional(),
    name: zod_1.z.string().nullable().optional(),
    description: zod_1.z.string().nullable().optional(),
    presentation: zod_1.z.string().nullable().optional(),
    unit_of_measure: zod_1.z.string().nullable().optional(),
    storage_conditions: zod_1.z.string().nullable().optional(),
    barcode: zod_1.z.number().nullable().optional(),
    sku: zod_1.z.string().nullable().optional(),
    photo: zod_1.z.string().nullable().optional(),
    supplier: zod_1.z.string().nullable().optional(),
    input_types_id: zod_1.z.preprocess(form_data_normalizers_1.toNumberOrNull, zod_1.z.number({ message: "input_types_id must be a number" })).nullable().optional(),
    unit_cost: zod_1.z.preprocess(form_data_normalizers_1.toNumberOrNull, zod_1.z.number({ message: "sale_price must be a number" })).nullable().optional(),
    is_active: zod_1.z.preprocess(form_data_normalizers_1.toBoolean, zod_1.z.coerce.boolean({ message: "status must be a boolean" })),
    is_draft: zod_1.z.preprocess(form_data_normalizers_1.toBoolean, zod_1.z.coerce.boolean({ message: "Active must be a boolean" })),
});
exports.inputCreateSchema = inputCreateSchema;
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
const inputUpdateSchema = inputCreateSchema.partial();
exports.inputUpdateSchema = inputUpdateSchema;
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
const inputResponseSchema = inputCreateSchema.extend({
    id: zod_1.z.number().int(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string(),
});
exports.inputResponseSchema = inputResponseSchema;
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
const inputQuerySchema = zod_1.z.object({
    filter: zod_1.z.string().optional(),
    exclude_ids: zod_1.z.union([
        zod_1.z.string(),
        zod_1.z.array(zod_1.z.string())
    ]).optional(),
    name: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    description: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    sku: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    presentation: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    unit_of_measure: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    barcode: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    custom_id: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
    is_active: zod_1.z.preprocess(form_data_normalizers_1.toBoolean, zod_1.z.boolean({ message: "is_active must be a boolean" })).optional(),
    is_draft: zod_1.z.preprocess(form_data_normalizers_1.toBoolean, zod_1.z.boolean({ message: "is_draft must be a boolean" })).optional(),
}).strict();
exports.inputQuerySchema = inputQuerySchema;
