"use strict";
// ============================================================================
// 🔵 UTILS BACKEND — Normalización profunda de decimales + limpieza de objetos vacíos
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanEmptyObjects = cleanEmptyObjects;
exports.deepNormalizeDecimals = deepNormalizeDecimals;
// ---------------------------------------------
// Determina si un valor es un objeto plano { }
// ---------------------------------------------
function isPlainObject(value) {
    if (value === null || typeof value !== "object")
        return false;
    // Objetos especiales backend que NO deben considerarse planos
    if (value instanceof Date)
        return false;
    // Solo objetos literales
    return Object.getPrototypeOf(value) === Object.prototype;
}
// ---------------------------------------------
// Normaliza profundamente valores decimales
// ---------------------------------------------
function deepNormalizeDecimals(data, decimalKeys) {
    // Date → no modificar
    if (data instanceof Date) {
        return data;
    }
    // Array → normalizar cada elemento
    if (Array.isArray(data)) {
        return data.map(item => deepNormalizeDecimals(item, decimalKeys));
    }
    // Objeto plano → procesar recursivamente
    if (isPlainObject(data)) {
        const out = {};
        for (const key of Object.keys(data)) {
            const raw = data[key];
            // Si es un campo decimal reconocido
            if (decimalKeys.includes(key)) {
                if (raw === "") {
                    out[key] = null; // convertir vacío → null
                }
                else if (raw != null) {
                    const num = Number(raw);
                    out[key] = Number.isNaN(num) ? raw : num;
                }
                else {
                    out[key] = raw;
                }
            }
            else {
                // Normalización recursiva
                out[key] = deepNormalizeDecimals(raw, decimalKeys);
            }
        }
        return out;
    }
    // Primitivos → retornar tal cual
    return data;
}
// ---------------------------------------------
// Limpia objetos planos que queden vacíos
// ---------------------------------------------
function cleanEmptyObjects(obj) {
    const recurse = (value) => {
        // Arrays → no eliminar elementos, solo limpiar internamente
        if (Array.isArray(value)) {
            return value.map(v => recurse(v));
        }
        // No es objeto plano → se deja tal cual
        if (!isPlainObject(value)) {
            return value;
        }
        // Objeto plano → limpiar sus propiedades
        const cleaned = {};
        for (const key of Object.keys(value)) {
            const raw = value[key];
            const val = recurse(raw);
            const isEmptyPlainObject = val !== null &&
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
    return recurse(obj);
}
