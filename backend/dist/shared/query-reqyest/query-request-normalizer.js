"use strict";
/**
 * Query Normalizers
 * ------------------------------------------------------------------
 * Conjunto de funciones utilitarias que transforman valores ambiguos
 * provenientes de queries HTTP en tipos consistentes y seguros para
 * el dominio.
 *
 * Por qué existen / qué problema resuelven:
 * - Los parámetros de query llegan como strings o arrays en formatos
 *   poco confiables (ej. "true", "1", "foo,bar").
 * - Los casos de uso y repositorios necesitan trabajar con tipos claros
 *   (booleanos, arrays, números) para aplicar reglas de negocio sin
 *   depender de cómo se construyó la request.
 * - Estos normalizadores eliminan esa ambigüedad, garantizando que los
 *   datos externos se conviertan en estructuras tipadas y seguras.
 *
 * Función técnica:
 * - `normalizeToArray`: asegura que un valor sea tratado como array de strings.
 * - `normalizeToNumberArray`: convierte valores a números y filtra NaN.
 * - `normalizeToBoolean`: interpreta strings, números o booleanos en un
 *   valor booleano consistente.
 *
 * Qué hacen:
 * - Transforman valores externos en tipos internos confiables.
 * - Aíslan la capa de aplicación de la ambigüedad de los datos HTTP.
 * - Facilitan que los casos de uso trabajen con criterios claros y seguros.
 *
 * Qué no hacen:
 * - No contienen lógica de negocio ni validaciones complejas.
 * - No ejecutan consultas ni interactúan con la base de datos.
 * - No sustituyen a los repositorios ni a los casos de uso; su rol es
 *   preparar datos de entrada.
 *
 * Convención de nombres:
 * - Prefijo `normalize...`: indica que la función convierte un valor
 *   ambiguo en uno tipado y consistente.
 * - Sufijo describe el tipo destino (`Array`, `NumberArray`, `Boolean`).
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: no pertenece aquí, porque depende de datos externos ambiguos.
 * - Application: puede usarse en mappers y validadores de entrada.
 * - Infrastructure/HTTP: se aplica al procesar queries de requests.
 * - UseCases: consumen los criterios ya normalizados, libres de ambigüedad.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeToNumberArray = exports.normalizeToBoolean = exports.normalizeToArray = void 0;
const normalizeToArray = (value) => {
    if (value === undefined)
        return undefined;
    return Array.isArray(value) ? value : [value];
};
exports.normalizeToArray = normalizeToArray;
const normalizeToNumberArray = (value) => {
    const arr = normalizeToArray(value);
    if (!arr)
        return undefined;
    return arr
        .map(v => Number(v))
        .filter(v => !Number.isNaN(v));
};
exports.normalizeToNumberArray = normalizeToNumberArray;
const normalizeToBoolean = (value) => {
    if (value === undefined)
        return undefined;
    if (typeof value === "boolean")
        return value;
    if (value === 1 || value === "1" || value === "true")
        return true;
    if (value === 0 || value === "0" || value === "false")
        return false;
    return undefined;
};
exports.normalizeToBoolean = normalizeToBoolean;
