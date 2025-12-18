"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionLineResponseSchema = exports.productionLineUpdateSchema = exports.productionLineCreateSchema = void 0;
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
const productionLineCreateSchema = zod_1.z.object({
    name: zod_1.z.string(),
    custom_id: zod_1.z.string(),
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
exports.productionLineCreateSchema = productionLineCreateSchema;
/**
 * UpdateSchema
 * ------------------------------------------------------------------
 * Define los campos que pueden actualizarse mediante PATCH.
 * Aqui todos los atributos son opcionales para permitir modificaciones parciales.
 */
const productionLineUpdateSchema = productionLineCreateSchema.partial();
exports.productionLineUpdateSchema = productionLineUpdateSchema;
/**
 * ResponseSchema
 * ------------------------------------------------------------------
 * Representa el objeto COMPLETO que la API devuelve.
 * El output sigue siendo exactamente igual al original.
 */
const productionLineResponseSchema = productionLineCreateSchema.extend({
    id: zod_1.z.number().int(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string(),
});
exports.productionLineResponseSchema = productionLineResponseSchema;
