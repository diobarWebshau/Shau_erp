"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeValidationArray = void 0;
/**
 * Normaliza un valor que puede ser:
 *   - string
 *   - array de string (incluye readonly string[])
 *   - null
 *   - undefined
 *
 * y siempre retorna un `string[]`.
 *
 * ─────────────────────────────────────────────────────────────
 * ¿Por qué existe esta utilidad?
 * ─────────────────────────────────────────────────────────────
 * librerías como Express, validadores o frameworks de formularios
 * pueden entregar valores con estas variantes:
 *
 *   "foo"                  → usuario envía un único valor
 *   ["foo", "bar"]         → usuario envía múltiples valores
 *   undefined / null       → parámetro ausente
 *
 * Esta variabilidad provoca:
 *   - condicionales repetitivos en controladores
 *   - errores sutiles cuando se espera un array
 *   - inconsistencias al validar
 *
 * Con esta función:
 *   ✔ siempre recibes un `string[]`
 *   ✔ nunca necesitas validar casos especiales en controladores
 *   ✔ eliminas ramas de código innecesarias
 *
 * ─────────────────────────────────────────────────────────────
 * ¿Por qué se estructura así?
 * ─────────────────────────────────────────────────────────────
 * TypeScript en modo estricto (strict + noImplicitAny +
 * strictNullChecks + noUncheckedIndexedAccess) requiere
 * narrowing explícito en cada paso.
 *
 * 1. `val == null`
 *      → elimina null y undefined.
 *
 * 2. `Array.isArray(val)`
 *      → TypeScript garantiza que val es readonly string[].
 *
 * 3. `typeof val === "string"`
 *      → TS ahora garantiza que val es exactamente string.
 *
 * Esta secuencia obliga al compilador a descartar todas las
 * variantes posibles del tipo de entrada y permite retornar
 * un `string[]` sin usar castings inseguros.
 */
const normalizeValidationArray = (val) => {
    // Caso 1: null o undefined → no hay valores → array vacío
    if (val == null)
        return [];
    // Caso 2: es array (incluye readonly string[]) → lo convertimos a array mutable
    // `map(item => item)` garantiza un string[] válido sin casting.
    if (Array.isArray(val))
        return val.map((item) => item);
    // Caso 3: después del narrowing, TS sabe que val solo puede ser string
    if (typeof val === "string")
        return [val];
    /**
     * Fall-through imposible:
     * Esta línea nunca se ejecuta en tiempo real.
     * TypeScript la exige para garantizar exhaustividad del tipo.
     */
    return [];
};
exports.normalizeValidationArray = normalizeValidationArray;
