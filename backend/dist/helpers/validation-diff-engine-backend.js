"use strict";
// ============================================================================
// 🔵 DIFF BACKEND (TS STRICT) — MULTINIVEL, ARRAYS SIN IMPORTAR ORDEN, 
// FECHAS ISO, RUTAS STRING, OBJECT DEEP DIFF SIN ANY
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectMap = isObjectMap;
exports.normalizeId = normalizeId;
exports.toArraySafe = toArraySafe;
exports.normalizeMaybeDate = normalizeMaybeDate;
exports.diffObjects = diffObjects;
exports.diffArrayEntities = diffArrayEntities;
exports.deepDiff = deepDiff;
// Opciones por defecto
const defaultOpts = {
    ignore: [],
    dateFields: [],
    objectFields: []
};
/** Determina si value es un ObjectMap */
function isObjectMap(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** Normaliza id → string (para backend) */
function normalizeId(id) {
    if (id == null)
        return null;
    return String(id);
}
/** Convierte a array de manera segura */
function toArraySafe(v) {
    return Array.isArray(v) ? v : [];
}
/**
 * Normaliza fechas a ISO, si el campo está en opts.dateFields.
 * Si no puede parsear, retorna el valor original.
 */
function normalizeMaybeDate(key, value, opts) {
    if (!opts.dateFields?.includes(key))
        return value;
    if (value == null)
        return value;
    const d = new Date(String(value));
    if (isNaN(d.getTime()))
        return value;
    return d.toISOString();
}
// =============================================================================
// 🔵 BLOQUE 2 — Comparación profunda de objetos (strict backend)
// =============================================================================
/**
 * Devuelve un objeto con las propiedades modificadas.
 * Si no hay cambios, retorna {}.
 */
async function diffObjects(a, b, opts = defaultOpts) {
    if (!isObjectMap(a) || !isObjectMap(b)) {
        return a !== b ? { value: b } : {};
    }
    const out = {};
    const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
    for (const key of keys) {
        if (opts.ignore?.includes(key))
            continue;
        if (key === "id")
            continue; // id no se diff-ea
        const v1 = normalizeMaybeDate(key, a[key], opts);
        const v2 = normalizeMaybeDate(key, b[key], opts);
        // 🔵 Campo declarado como objeto → se compara profundamente
        if (opts.objectFields?.includes(key)) {
            if (!isObjectMap(v1) || !isObjectMap(v2)) {
                if (v1 !== v2)
                    out[key] = v2;
                continue;
            }
            const nested = await diffObjects(v1, v2, opts);
            if (Object.keys(nested).length > 0)
                out[key] = v2;
            continue;
        }
        // 🔵 Arrays → se asigna el nuevo si difiere en orden o contenido
        if (Array.isArray(v1) || Array.isArray(v2)) {
            const a1 = toArraySafe(v1);
            const a2 = toArraySafe(v2);
            if (!await arraysEqual(a1, a2, opts)) {
                out[key] = v2;
            }
            continue;
        }
        // 🔵 Objetos normales
        if (isObjectMap(v1) && isObjectMap(v2)) {
            const nested = await diffObjects(v1, v2, opts);
            if (Object.keys(nested).length > 0)
                out[key] = v2;
            continue;
        }
        // 🔵 Scalar strict compare
        if (v1 !== v2)
            out[key] = v2;
    }
    return out;
}
// =============================================================================
// 🔵 BLOQUE 3 — Igualdad profunda para arreglos (orden NO importa)
// =============================================================================
async function arraysEqual(a1, a2, opts) {
    if (a1.length !== a2.length)
        return false;
    // Si los elementos tienen id → comparamos por id
    const items1 = a1.map((v) => {
        if (isObjectMap(v))
            return { id: normalizeId(v.id), value: v };
        return { id: null, value: v };
    });
    const items2 = [...a2].map((v) => {
        if (isObjectMap(v))
            return { id: normalizeId(v.id), value: v };
        return { id: null, value: v };
    });
    // índice rápido por id
    const map2 = new Map();
    for (const it of items2) {
        const bucket = map2.get(it.id) ?? [];
        bucket.push(it.value);
        map2.set(it.id, bucket);
    }
    // Intentamos "emparejar" cada elemento
    for (const it of items1) {
        const bucket = map2.get(it.id);
        if (!bucket || bucket.length === 0)
            return false;
        let matched = false;
        for (let i = 0; i < bucket.length; i++) {
            if (await deepEqual(it.value, bucket[i], opts)) {
                bucket.splice(i, 1); // remover match
                matched = true;
                break;
            }
        }
        if (!matched)
            return false;
    }
    return true;
}
// =============================================================================
// 🔵 BLOQUE 4 — Igualdad profunda backend
// =============================================================================
async function deepEqual(a, b, opts) {
    if (a === b)
        return true;
    // Fechas normalizadas
    if (typeof a === "string" && typeof b === "string") {
        const na = normalizeMaybeDate("", a, opts);
        const nb = normalizeMaybeDate("", b, opts);
        return na === nb;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        const a1 = toArraySafe(a);
        const a2 = toArraySafe(b);
        return await arraysEqual(a1, a2, opts);
    }
    if (isObjectMap(a) && isObjectMap(b)) {
        const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
        for (const key of keys) {
            if (!await deepEqual(a[key], b[key], opts))
                return false;
        }
        return true;
    }
    return false;
}
/**
 * diffArrayEntities
 * Requiere:
 *   - Cada entidad debe tener un id (num o string)
 *   - Orden NO importa
 */
async function diffArrayEntities(oldArr, newArr, opts = defaultOpts) {
    const mapOld = new Map();
    const mapNew = new Map();
    for (const it of oldArr) {
        const id = normalizeId(it.id);
        if (id)
            mapOld.set(id, it);
    }
    for (const it of newArr) {
        const id = normalizeId(it.id);
        if (id)
            mapNew.set(id, it);
    }
    const added = [];
    const deleted = [];
    const modified = [];
    // detect added
    for (const [id, v] of mapNew.entries()) {
        if (!mapOld.has(id))
            added.push(v);
    }
    // detect deleted
    for (const [id, v] of mapOld.entries()) {
        if (!mapNew.has(id))
            deleted.push(v);
    }
    // detect modified
    for (const [id, newVal] of mapNew.entries()) {
        const oldVal = mapOld.get(id);
        if (!oldVal)
            continue;
        const diff = await diffObjects(oldVal, newVal, opts);
        if (Object.keys(diff).length > 0) {
            modified.push(newVal);
        }
    }
    return { added, deleted, modified };
}
// =============================================================================
// 🔵 BLOQUE 6 — Export principal (helper final)
// =============================================================================
async function deepDiff(a, b, opts = defaultOpts) {
    return diffObjects(a, b, opts);
}
