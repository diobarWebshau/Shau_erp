// src/shared/http/input/normalizers/form-data.normalizers.ts

/**
 * HTTP Input Normalizers – Form Data
 * ------------------------------------------------------------------
 * Normalizadores puros para valores provenientes de multipart/form-data
 * u otros formatos HTTP donde todos los valores llegan como string.
 *
 * Esta capa existe para:
 * - Limpiar y convertir datos ANTES de entrar al dominio.
 * - Evitar lógica de parsing en controllers o use cases.
 * - Garantizar que el dominio reciba tipos correctos.
 *
 * Importante:
 * - No contiene lógica de negocio.
 * - No depende de Zod, Sequelize ni frameworks.
 * - Son funciones puras y reutilizables.
 */

/**
 * Convierte valores de form-data a number o null.
 *
 * Casos soportados:
 * - "123"       → 123
 * - "123.45"    → 123.45
 * - ""          → null
 * - null        → null
 * - undefined   → null
 * - number      → number
 */
const toNumberOrNull = (val: unknown): number | null => {
    if (val === null || val === undefined || val === "") return null;
    if (typeof val === "number") return val;

    const n = Number(val);
    return Number.isNaN(n) ? null : n;
};

/**
 * Convierte valores de form-data a boolean.
 *
 * Casos soportados:
 * - "true" | "1" | 1 → true
 * - "false" | "0" | 0 → false
 * - undefined / "" → undefined
 */
const toBoolean = (val: unknown): boolean | undefined => {
    if (val === undefined || val === null || val === "") return undefined;
    if (typeof val === "boolean") return val;
    if (val === "true" || val === "1" || val === 1) return true;
    if (val === "false" || val === "0" || val === 0) return false;
    return undefined;
};


export {
    toBoolean,
    toNumberOrNull
}