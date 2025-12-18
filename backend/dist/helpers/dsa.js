"use strict";
// * ============================================================
// * 🔵 #MARK:  BLOQUE 1 — Tipos base estrictos + helpers
// * ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildConfigRootBuilder = exports.ChildConfigBuilder = exports.defaultDiffOpts = void 0;
exports.isObjectMap = isObjectMap;
exports.isFile = isFile;
exports.getId = getId;
exports.normalizeScalar = normalizeScalar;
exports.coerceNumberLike = coerceNumberLike;
exports.toArraySafe = toArraySafe;
exports.stripBase64Prefix = stripBase64Prefix;
exports.normalizeArrayDiffById = normalizeArrayDiffById;
exports.diffObjectArrays = diffObjectArrays;
exports.diffObjectArraysWithChildSingle = diffObjectArraysWithChildSingle;
exports.diffObjectArraysWithChildMulti = diffObjectArraysWithChildMulti;
exports.diffObjectArraysWithChildren = diffObjectArraysWithChildren;
exports.deepDiff = deepDiff;
exports.createChildConfigRoot = createChildConfigRoot;
function isObjectMap(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isFile(value) {
    return typeof File !== "undefined" && value instanceof File;
}
exports.defaultDiffOpts = {
    nullUndefEqual: true,
    coerceNumberStrings: true,
    objectKeyById: [],
};
function getId(value) {
    if (!isObjectMap(value))
        return null;
    const raw = value["id"];
    return raw == null ? null : String(raw);
}
function normalizeScalar(key, value) {
    if (value === null || value === undefined)
        return value;
    if (key === "delivery_cost") {
        if (typeof value === "string" || typeof value === "number") {
            const num = Number(value);
            return Number.isNaN(num) ? value : num;
        }
    }
    if (key === "delivery_date" ||
        key === "shipping_date" ||
        key === "created_at" ||
        key === "updated_at") {
        try {
            return new Date(String(value)).toISOString();
        }
        catch {
            return value;
        }
    }
    return value;
}
function coerceNumberLike(value, enabled) {
    if (!enabled)
        return value;
    if (typeof value === "string" || typeof value === "number") {
        const n = Number(value);
        if (!Number.isNaN(n) && String(n) === String(value)) {
            return n;
        }
    }
    return value;
}
function toArraySafe(value) {
    return Array.isArray(value) ? value : [];
}
function stripBase64Prefix(b64) {
    return b64.replace(/^data:.*;base64,/, "");
}
// * ============================================================
// * 🔵 #MARK: BLOQUE 2 — File/base64 + SHA-256
// * ============================================================
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === "string"
            ? resolve(reader.result)
            : reject(new Error("Invalid FileReader result"));
        reader.onerror = () => reject(new Error("File read error"));
        reader.readAsDataURL(file);
    });
}
async function isSameFile(base64, file) {
    const b2 = await fileToBase64(file);
    return stripBase64Prefix(base64) === stripBase64Prefix(b2);
}
function toHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
async function sha256(buffer) {
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    return toHex(digest);
}
const fileIdCache = new WeakMap();
async function getFileId(file) {
    const cached = fileIdCache.get(file);
    if (cached)
        return cached;
    const buf = await file.arrayBuffer();
    const id = await sha256(buf);
    fileIdCache.set(file, id);
    return id;
}
async function diffObjects(a, b, opts = exports.defaultDiffOpts) {
    if (!isObjectMap(a) || !isObjectMap(b)) {
        return a !== b ? { value: b } : {};
    }
    const out = {};
    let keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
    if (opts.keys)
        keys = keys.filter(k => opts.keys.includes(k));
    if (opts.ignore)
        keys = keys.filter(k => !opts.ignore.includes(k));
    for (const key of keys) {
        if (key === "id")
            continue;
        const v1 = a[key];
        const v2 = b[key];
        // byId
        if (opts.objectKeyById?.includes(key)) {
            const id1 = getId(v1);
            const id2 = getId(v2);
            if (id1 !== id2) {
                out[key] = v2;
                continue;
            }
            if (isObjectMap(v1) && isObjectMap(v2)) {
                const nested = await diffObjects(v1, v2, opts);
                if (Object.keys(nested).length)
                    out[key] = nested;
            }
            continue;
        }
        // Files
        if (isFile(v1) && isFile(v2)) {
            const [b1, b2] = await Promise.all([fileToBase64(v1), fileToBase64(v2)]);
            if (stripBase64Prefix(b1) !== stripBase64Prefix(b2))
                out[key] = v2;
            continue;
        }
        if (typeof v1 === "string" && isFile(v2) && v1.startsWith("data:")) {
            if (!(await isSameFile(v1, v2)))
                out[key] = v2;
            continue;
        }
        // Arrays
        if (Array.isArray(v1) || Array.isArray(v2)) {
            if (!Array.isArray(v1) || !Array.isArray(v2) || v1.length !== v2.length) {
                out[key] = v2;
                continue;
            }
            for (let i = 0; i < v1.length; i++) {
                const diff = await diffObjects(v1[i], v2[i], opts);
                if (Object.keys(diff).length) {
                    out[key] = v2;
                    break;
                }
            }
            continue;
        }
        // Objetos
        if (isObjectMap(v1) && isObjectMap(v2)) {
            const nested = await diffObjects(v1, v2, opts);
            if (Object.keys(nested).length)
                out[key] = nested;
            continue;
        }
        // Escalares
        const n1 = coerceNumberLike(normalizeScalar(key, v1), opts.coerceNumberStrings);
        const n2 = coerceNumberLike(normalizeScalar(key, v2), opts.coerceNumberStrings);
        if (opts.nullUndefEqual && n1 == null && n2 == null)
            continue;
        if (n1 !== n2)
            out[key] = v2;
    }
    return out;
}
function normalizeArrayDiffById(diff) {
    const ids = new Set(diff.modified.map(m => String(m.id ?? "")));
    const keep = (x) => x.id == null || !ids.has(String(x.id));
    return {
        added: diff.added.filter(keep),
        modified: diff.modified,
        deleted: diff.deleted.filter(keep)
    };
}
async function deepCompareChild(oldItem, newItem, opts) {
    const keys = opts.keys ?? Object.keys(newItem);
    for (const key of keys) {
        if (opts.ignore?.includes(key))
            continue;
        const v1 = oldItem[key];
        const v2 = newItem[key];
        if (opts.nullUndefEqual && v1 == null && v2 == null)
            continue;
        let a = v1, b = v2;
        if (opts.coerceNumberStrings) {
            const n1 = Number(a), n2 = Number(b);
            if (!Number.isNaN(n1) && !Number.isNaN(n2)) {
                a = n1;
                b = n2;
            }
        }
        if (opts.objectKeyById?.includes(key)) {
            if (isObjectMap(a) && isObjectMap(b)) {
                if (getId(a) === getId(b))
                    continue;
                return newItem;
            }
        }
        if (isFile(a) && isFile(b)) {
            const b1 = stripBase64Prefix(await fileToBase64(a));
            const b2 = stripBase64Prefix(await fileToBase64(b));
            if (b1 !== b2)
                return newItem;
            continue;
        }
        if (typeof a === "string" && isFile(b) && /^data:.*;base64,/.test(a)) {
            if (!(await isSameFile(a, b)))
                return newItem;
            continue;
        }
        if (a !== b)
            return newItem;
    }
    return null;
}
async function diffObjectArrays(arr1, arr2, opts = exports.defaultDiffOpts) {
    const hasFiles = arr1.some(isFile) || arr2.some(isFile);
    if (hasFiles)
        return diffFileArrays(arr1, arr2);
    const map1 = new Map();
    const map2 = new Map();
    for (const item of arr1) {
        const id = getId(item);
        if (id)
            map1.set(id, item);
    }
    for (const item of arr2) {
        const id = getId(item);
        if (id)
            map2.set(id, item);
    }
    const added = [];
    const modified = [];
    const deleted = [];
    for (const [id, item] of map2) {
        if (!map1.has(id))
            added.push(item);
    }
    for (const [id, item] of map1) {
        if (!map2.has(id))
            deleted.push(item);
    }
    for (const [id, newItem] of map2) {
        const oldItem = map1.get(id);
        if (!oldItem)
            continue;
        const diff = await deepCompareChild(oldItem, newItem, opts);
        if (diff)
            modified.push(diff);
    }
    for (const item of arr2) {
        if (getId(item) === null)
            added.push(item);
    }
    return { added, modified, deleted };
}
// Narrowing estricto: determina si un T realmente es File
function isFileItem(item) {
    return isFile(item);
}
async function diffFileArrays(arr1, arr2) {
    const map1 = new Map();
    const map2 = new Map();
    const ids1 = [];
    const ids2 = [];
    // Procesa arr1 generando IDs SHA-256
    for (const item of arr1) {
        if (!isFileItem(item)) {
            throw new Error("diffFileArrays recibió un item que no es File");
        }
        const id = await getFileId(item);
        ids1.push(id);
        map1.set(id, item);
    }
    // Procesa arr2 generando IDs SHA-256
    for (const item of arr2) {
        if (!isFileItem(item)) {
            throw new Error("diffFileArrays recibió un item que no es File");
        }
        const id = await getFileId(item);
        ids2.push(id);
        map2.set(id, item);
    }
    // Mapa de frecuencias: permite detectar duplicados correctamente
    const freq1 = new Map();
    const freq2 = new Map();
    for (const id of ids1)
        freq1.set(id, (freq1.get(id) ?? 0) + 1);
    for (const id of ids2)
        freq2.set(id, (freq2.get(id) ?? 0) + 1);
    const added = [];
    const deleted = [];
    // Detecta añadidos
    for (const [id, count2] of freq2.entries()) {
        const count1 = freq1.get(id) ?? 0;
        for (let i = 0; i < count2 - count1; i++) {
            const fileItem = map2.get(id);
            if (fileItem)
                added.push(fileItem);
        }
    }
    // Detecta eliminados
    for (const [id, count1] of freq1.entries()) {
        const count2 = freq2.get(id) ?? 0;
        for (let i = 0; i < count1 - count2; i++) {
            const fileItem = map1.get(id);
            if (fileItem)
                deleted.push(fileItem);
        }
    }
    // Archivos no tienen "modified". Siempre added/deleted.
    return { added, modified: [], deleted };
}
// ============================================================
// FUNCIÓN PRINCIPAL
// ============================================================
async function diffObjectArraysWithChildSingle(arr1, arr2, options) {
    const { childKey, managerKey, parentDiffOpts = exports.defaultDiffOpts, childDiffOpts = exports.defaultDiffOpts, } = options;
    // Diff base de padres
    const base = await diffObjectArrays(arr1, arr2, parentDiffOpts);
    const resultAdded = [];
    const resultModified = [];
    // ============================================================
    // 🔵 ADDED
    // ============================================================
    for (const parentPartial of base.added) {
        // entry nace como ObjectMap, NO como Augmented
        const entry = { ...parentPartial };
        const id = getId(parentPartial);
        const updatedFull = arr2.find(p => getId(p) === id);
        if (updatedFull) {
            const childArr = toArraySafe(updatedFull[childKey]);
            if (childArr.length) {
                // asignación con assertion explícita
                entry[managerKey] = {
                    added: childArr,
                    deleted: [],
                    modified: []
                };
            }
        }
        resultAdded.push(entry);
    }
    // ============================================================
    // 🔵 MODIFIED
    // ============================================================
    for (const parentChanges of base.modified) {
        // entry debe empezar como ObjectMap
        const entry = { ...parentChanges };
        const id = getId(parentChanges);
        const originalFull = arr1.find(p => getId(p) === id);
        const updatedFull = arr2.find(p => getId(p) === id);
        if (originalFull && updatedFull) {
            const childArr1 = toArraySafe(originalFull[childKey]);
            const childArr2 = toArraySafe(updatedFull[childKey]);
            let childDiff = await diffObjectArrays(childArr1, childArr2, childDiffOpts);
            childDiff = normalizeArrayDiffById(childDiff);
            const hasChanges = childDiff.added.length ||
                childDiff.modified.length ||
                childDiff.deleted.length;
            if (hasChanges) {
                // Asignación dinámica con satisfies para evitar errores
                entry[managerKey] =
                    childDiff;
            }
        }
        resultModified.push(entry);
    }
    // ============================================================
    // 🔵 RETORNO FINAL
    // ============================================================
    return {
        added: resultAdded,
        deleted: base.deleted,
        modified: resultModified
    };
}
// ============================================================
// FUNCIÓN PRINCIPAL: múltiples children con múltiples managers
// ============================================================
async function diffObjectArraysWithChildMulti(arr1, arr2, configs, parentDiffOpts = exports.defaultDiffOpts) {
    // Diff simple de padres
    const base = await diffObjectArrays(arr1, arr2, parentDiffOpts);
    const resultAdded = [];
    const resultModified = [];
    // ============================================================
    // 🔵 ADDED
    // ============================================================
    for (const parentPartial of base.added) {
        const entry = { ...parentPartial };
        const id = getId(parentPartial);
        const updatedFull = arr2.find(p => getId(p) === id);
        if (updatedFull) {
            for (const cfg of configs) {
                // ⚠️ No incluimos childDiffOpts aquí porque NO se usa en ADDED
                const { childKey, managerKey } = cfg;
                const childArr = toArraySafe(updatedFull[childKey]);
                if (childArr.length) {
                    const field = {
                        added: childArr,
                        modified: [],
                        deleted: []
                    };
                    entry[managerKey] = field;
                }
            }
        }
        resultAdded.push(entry);
    }
    // ============================================================
    // 🔵 MODIFIED
    // ============================================================
    for (const parentChanges of base.modified) {
        const entry = { ...parentChanges };
        const id = getId(parentChanges);
        const originalFull = arr1.find(p => getId(p) === id);
        const updatedFull = arr2.find(p => getId(p) === id);
        if (originalFull && updatedFull) {
            for (const cfg of configs) {
                const { childKey, managerKey, childDiffOpts = exports.defaultDiffOpts } = cfg;
                const childArr1 = toArraySafe(originalFull[childKey]);
                const childArr2 = toArraySafe(updatedFull[childKey]);
                let childDiff = await diffObjectArrays(childArr1, childArr2, childDiffOpts);
                childDiff = normalizeArrayDiffById(childDiff);
                const hasChanges = childDiff.added.length ||
                    childDiff.modified.length ||
                    childDiff.deleted.length;
                if (hasChanges) {
                    entry[managerKey] =
                        childDiff;
                }
            }
        }
        resultModified.push(entry);
    }
    // ============================================================
    // 🔵 RETORNO FINAL
    // ============================================================
    return {
        added: resultAdded,
        deleted: base.deleted,
        modified: resultModified
    };
}
// --------------------------------------------------------------
// APLICA CONFIGURACIÓN PARA UN NIVEL (NO USA ANY)
// --------------------------------------------------------------
async function applyChildConfig(entry, original, updated, config) {
    const { childKey, managerKey, childDiffOpts = exports.defaultDiffOpts, children } = config;
    const childArr1 = original ? toArraySafe(original[childKey]) : [];
    const childArr2 = updated ? toArraySafe(updated[childKey]) : [];
    let diff = await diffObjectArrays(childArr1, childArr2, childDiffOpts);
    diff = normalizeArrayDiffById(diff);
    const hasChanges = diff.added.length > 0 ||
        diff.modified.length > 0 ||
        diff.deleted.length > 0;
    if (!hasChanges)
        return;
    // asignamos el manager
    entry[managerKey] =
        diff;
    // RECURSIÓN si hay children
    if (children && children.length > 0) {
        const changedChildren = [...diff.added, ...diff.modified];
        for (const child of changedChildren) {
            const entryChild = child;
            for (const subConfig of children) {
                await applyChildConfig(entryChild, child, child, subConfig);
            }
        }
    }
}
// --------------------------------------------------------------
// FUNCIÓN PRINCIPAL (SIN NINGÚN ANY)
// --------------------------------------------------------------
async function diffObjectArraysWithChildren(arr1, arr2, configs, parentDiffOpts = exports.defaultDiffOpts) {
    const base = await diffObjectArrays(arr1, arr2, parentDiffOpts);
    const added = [];
    const modified = [];
    const deleted = base.deleted;
    // -----------------------
    // ADDED
    // -----------------------
    for (const partialParent of base.added) {
        const entry = { ...partialParent };
        const id = getId(partialParent);
        const full = arr2.find(p => getId(p) === id);
        for (const cfg of configs) {
            await applyChildConfig(entry, undefined, full, cfg);
        }
        added.push(entry);
    }
    // -----------------------
    // MODIFIED
    // -----------------------
    for (const partialParent of base.modified) {
        const entry = { ...partialParent };
        const id = getId(partialParent);
        const original = arr1.find(p => getId(p) === id);
        const updated = arr2.find(p => getId(p) === id);
        for (const cfg of configs) {
            await applyChildConfig(entry, original, updated, cfg);
        }
        modified.push(entry);
    }
    return { added, deleted, modified };
}
async function deepDiff(a, b, opts = exports.defaultDiffOpts) {
    return diffObjects(a, b, opts);
}
// * ============================================================
// * 🔵 #MARK: BLOQUE 8 — Builder multinivel tipado para ChildConfigRoot
// * ============================================================
// ----------------------------------------
// Builder de nivel hijo
// ----------------------------------------
class ChildConfigBuilder {
    cfg;
    constructor(childKey, managerKey) {
        this.cfg = { childKey, managerKey };
    }
    /**
     * Establecer opciones de diff para este nivel
     */
    diffOptions(opts) {
        this.cfg.childDiffOpts = opts;
        return this;
    }
    /**
     * Agregar configuraciones de hijos (subniveles)
     */
    children(...children) {
        this.cfg.children = children;
        return this;
    }
    /**
     * Finaliza y retorna el ChildConfig resultante
     */
    build() {
        return this.cfg;
    }
}
exports.ChildConfigBuilder = ChildConfigBuilder;
// ----------------------------------------
// Builder de ROOT para el primer nivel
// ----------------------------------------
class ChildConfigRootBuilder {
    configs = [];
    /**
     * Agregar un nivel raíz
     */
    add(childKey, managerKey, configure) {
        const builder = new ChildConfigBuilder(childKey, managerKey);
        if (configure) {
            configure(builder);
        }
        const cfg = builder.build();
        this.configs.push(cfg);
        return this;
    }
    /**
     * Finaliza y retorna el arreglo de configs
     */
    build() {
        return this.configs;
    }
}
exports.ChildConfigRootBuilder = ChildConfigRootBuilder;
// ============================================================
// 🔵 FUNCIÓN HELPER PARA CREAR BUILDER
// ============================================================
function createChildConfigRoot() {
    return new ChildConfigRootBuilder();
}
