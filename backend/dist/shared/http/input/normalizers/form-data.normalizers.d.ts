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
declare const toNumberOrNull: (val: unknown) => number | null;
/**
 * Convierte valores de form-data a boolean.
 *
 * Casos soportados:
 * - "true" | "1" | 1 → true
 * - "false" | "0" | 0 → false
 * - undefined / "" → undefined
 */
declare const toBoolean: (val: unknown) => boolean | undefined;
export { toBoolean, toNumberOrNull };
