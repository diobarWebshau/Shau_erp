// ============================================================================
// 🔵 UTILS BACKEND — Normalización profunda de decimales + limpieza de objetos vacíos
// ============================================================================

// ---------------------------------------------
// Determina si un valor es un objeto plano { }
// ---------------------------------------------
function isPlainObject(value: unknown): value is Record<string, unknown> {
    if (value === null || typeof value !== "object") return false;

    // Objetos especiales backend que NO deben considerarse planos
    if (value instanceof Date) return false;

    // Solo objetos literales
    return Object.getPrototypeOf(value) === Object.prototype;
}

// ---------------------------------------------
// Normaliza profundamente valores decimales
// ---------------------------------------------
function deepNormalizeDecimals<T>(
    data: T,
    decimalKeys: readonly string[]
): T {

    // Date → no modificar
    if (data instanceof Date) {
        return data;
    }

    // Array → normalizar cada elemento
    if (Array.isArray(data)) {
        return data.map(item => deepNormalizeDecimals(item, decimalKeys)) as unknown as T;
    }

    // Objeto plano → procesar recursivamente
    if (isPlainObject(data)) {
        const out: Record<string, unknown> = {};

        for (const key of Object.keys(data)) {
            const raw = (data as Record<string, unknown>)[key];

            // Si es un campo decimal reconocido
            if (decimalKeys.includes(key)) {
                if (raw === "") {
                    out[key] = null;   // convertir vacío → null
                } else if (raw != null) {
                    const num = Number(raw);
                    out[key] = Number.isNaN(num) ? raw : num;
                } else {
                    out[key] = raw;
                }
            } else {
                // Normalización recursiva
                out[key] = deepNormalizeDecimals(raw as unknown, decimalKeys);
            }
        }

        return out as T;
    }

    // Primitivos → retornar tal cual
    return data;
}

// ---------------------------------------------
// Limpia objetos planos que queden vacíos
// ---------------------------------------------
function cleanEmptyObjects<T>(obj: T): T {

    const recurse = (value: unknown): unknown => {

        // Arrays → no eliminar elementos, solo limpiar internamente
        if (Array.isArray(value)) {
            return value.map(v => recurse(v));
        }

        // No es objeto plano → se deja tal cual
        if (!isPlainObject(value)) {
            return value;
        }

        // Objeto plano → limpiar sus propiedades
        const cleaned: Record<string, unknown> = {};

        for (const key of Object.keys(value)) {
            const raw = (value as Record<string, unknown>)[key];
            const val = recurse(raw);

            const isEmptyPlainObject =
                val !== null &&
                typeof val === "object" &&
                isPlainObject(val) &&
                Object.keys(val).length === 0;

            // Solo omitimos objetos planos vacíos {}
            if (!isEmptyPlainObject) {
                cleaned[key] = val;
            }
        }

        return cleaned;
    };

    return recurse(obj) as T;
}


export {
    cleanEmptyObjects,
    deepNormalizeDecimals,
}