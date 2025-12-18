/**
 * Convierte un valor desconocido en un booleano respetando
 * reglas semánticas coherentes para formularios, queries,
 * JSON, parámetros de API, etc.
 *
 * ¿Por qué existe esta función?
 * - Express y muchos frameworks entregan parámetros en forma de string.
 * - Query params como ?active=true, ?active=1, ?active=yes deben interpretarse igual.
 * - Los valores no reconocidos deben manejarse sin lanzar errores.
 *
 * Cumple 100% con TypeScript strict:
 *  - value: unknown obliga a validar todos los tipos explícitamente.
 *  - No se permite ningún any implícito.
 */
declare function normalizedBoolean(value: unknown): boolean;
export { normalizedBoolean };
