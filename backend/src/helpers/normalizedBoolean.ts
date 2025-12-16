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
function normalizedBoolean(value: unknown): boolean {
    // Caso 1: boolean literal → devolver sin cambios
    if (typeof value === "boolean") {
        return value;
    }

    // Caso 2: string → normalizamos y evaluamos patrones conocidos
    if (typeof value === "string") {
        const v = value.trim().toLowerCase();

        // Interpretaciones de verdadero
        if (v === "true" || v === "1" || v === "yes" || v === "on") {
            return true;
        }

        // Interpretaciones de falso
        if (v === "false" || v === "0" || v === "no" || v === "off") {
            return false;
        }

        // Cualquier otro string → valor no reconocido → false por defecto
        return false;
    }

    // Caso 3: number → estricta conversión
    // solo 1 es true, el resto es false
    if (typeof value === "number") {
        return value === 1;
    }

    /**
     * Caso 4: cualquier otro tipo (null, undefined, object, symbol, bigint, function)
     * no tiene una representación booleana definida en este contexto,
     * por lo que devolvemos false en lugar de arriesgar comportamiento ambiguo.
     */
    return false;
}

export {
    normalizedBoolean
};
