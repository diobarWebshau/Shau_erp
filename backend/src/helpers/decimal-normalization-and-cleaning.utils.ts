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
// ⚠️ Nota de tipado:
// Se expone decimalKeys como (keyof T)[] para DX y autocompletado.
// Internamente se hace un cast controlado porque Object.keys()
// devuelve string[] y TS no puede inferir keyof T automáticamente.
function deepNormalizeDecimals<T extends Record<string, unknown>>(
    data: T,
    decimalKeys: readonly (keyof T)[]
): T {

    const recurse = (value: unknown): unknown => {

        // Date → no modificar
        if (value instanceof Date) {
            return value;
        }

        // Array → normalizar cada elemento
        if (Array.isArray(value)) {
            return value.map(item => recurse(item));
        }

        // Objeto plano → procesar recursivamente
        if (isPlainObject(value)) {
            const out: Record<string, unknown> = {};

            for (const key of Object.keys(value) as (keyof typeof value)[]) {
                const raw = value[key];

                // Si es un campo decimal reconocido
                if (decimalKeys.includes(key as keyof T)) {
                    if (raw === "") {
                        out[key as string] = null;   // convertir vacío → null
                    } else if (raw != null) {
                        const num = Number(raw);
                        out[key as string] = Number.isNaN(num) ? raw : num;
                    } else {
                        out[key as string] = raw;
                    }
                } else {
                    // Normalización recursiva
                    out[key as string] = recurse(raw);
                }
            }

            return out;
        }

        // Primitivos → retornar tal cual
        return value;
    };

    return recurse(data) as T;
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
};
