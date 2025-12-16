"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coerceValue = coerceValue;
exports.normalizeObjectFromFormData = normalizeObjectFromFormData;
exports.normalizeFormDataBody = normalizeFormDataBody;
/* ───────────────────────────────────────────────────────────
 * 6) DETECTOR DE JSON STRINGIFICADO
 * -----------------------------------------------------------------
 * Detecta si un string "parece" un JSON válido:
 *   - "{ ... }"
 *   - "[ ... ]"
 *
 * No lo valida: solo identifica patrón.
 *
 * ¿Por qué?
 * Muchos clientes envían objetos embedidos como strings dentro
 * de un multipart/form-data, por lo que debemos admitirlo.
 * -----------------------------------------------------------------*/
const looksLikeJson = (s) => {
    const t = s.trim();
    return ((t.startsWith("{") && t.endsWith("}")) ||
        (t.startsWith("[") && t.endsWith("]")));
};
/* ───────────────────────────────────────────────────────────
 * 7) coerceValue: FUNCIÓN CENTRAL DE NORMALIZACIÓN
 * -----------------------------------------------------------------
 * Esta función transforma CUALQUIER valor proveniente de FormData
 * en un valor del tipo NormalizedValue.
 *
 * Garantías:
 *   ✔ Nunca retorna undefined
 *   ✔ Convierte boolean strings → boolean
 *   ✔ Convierte JSON stringificado → objetos/arrays reales
 *   ✔ Convierte readonly string[] → NormalizedArray
 *
 * Esta función es clave para limpiar datos antes de validarlos
 * o persistirlos en el ERP.
 * -----------------------------------------------------------------*/
function coerceValue(value) {
    // --- Arreglos (incluye readonly string[]) ---
    if (Array.isArray(value)) {
        return value.map((v) => coerceValue(v));
    }
    // --- undefined → null (consistencia absoluta) ---
    if (value === undefined || value === null)
        return null;
    // --- boolean | number → NormalizedPrimitive ---
    if (typeof value !== "string") {
        return value;
    }
    // --- procesamiento de string ---
    let s = value.trim();
    // Remover comillas externas (clientes envían '"foo"' a veces)
    if ((s.startsWith('"') && s.endsWith('"')) ||
        (s.startsWith("'") && s.endsWith("'"))) {
        s = s.slice(1, -1);
    }
    // --- booleanos reales ---
    if (s === "true")
        return true;
    if (s === "false")
        return false;
    // --- JSON embedido ---
    if (looksLikeJson(s)) {
        try {
            const parsed = JSON.parse(s);
            // JSON.parse NUNCA debería devolver undefined, pero TypeScript cree que sí.
            const safeParsed = parsed === undefined ? null : parsed;
            return normalizeObjectFromFormData(safeParsed);
        }
        catch {
            // no era JSON válido → dejar como string
            return s;
        }
    }
    // --- string final normalizado ---
    return s;
}
/* ───────────────────────────────────────────────────────────
 * 8) NORMALIZACIÓN COMPLETA DE OBJETOS Y ARREGLOS
 * -----------------------------------------------------------------
 * Normaliza valores de manera recursiva.
 *
 * ¿Por qué existe?
 *   - FormData entrega todo como strings
 *   - Multer mezcla strings y arrays de strings
 *   - Objetos JSON llegan como texto
 *   - Necesitamos transformar TODAS las estructuras complejas
 *     en objetos consistentes antes de validarlos en Zod o
 *     persistirlos en base de datos.
 *
 * Esta función SIEMPRE retorna un NormalizedValue seguro.
 * -----------------------------------------------------------------*/
function normalizeObjectFromFormData(obj) {
    // --- arreglos ---
    if (Array.isArray(obj)) {
        return obj.map((v) => normalizeObjectFromFormData(v));
    }
    // --- objetos reales ---
    if (obj && typeof obj === "object") {
        const out = {};
        for (const key of Object.keys(obj)) {
            const raw = obj[key];
            out[key] = coerceValue(raw);
        }
        return out;
    }
    // --- primitivo ---
    return coerceValue(obj);
}
/* ───────────────────────────────────────────────────────────
 * 9) MIDDLEWARE EXPRESS — NORMALIZACIÓN AUTOMÁTICA
 * -----------------------------------------------------------------
 * Este middleware debe colocarse DESPUÉS de Multer.
 *
 * Su propósito:
 *   ✔ Reemplazar req.body con su versión normalizada
 *   ✔ Asegurar que tu backend SIEMPRE reciba datos limpios
 *   ✔ Preparar el cuerpo para validaciones con Zod
 *   ✔ Evitar bugs de tipo causados por FormData
 *
 * De esta forma, TODOS tus controladores reciben un body coherente.
 * -----------------------------------------------------------------*/
function normalizeFormDataBody() {
    return (req, _res, next) => {
        try {
            if (req.body && typeof req.body === "object") {
                req.body = normalizeObjectFromFormData(req.body);
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
