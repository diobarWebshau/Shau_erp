import type { RequestHandler } from "express";

/* ───────────────────────────────────────────────────────────
 * 1) NORMALIZED PRIMITIVES
 * -----------------------------------------------------------------
 * Representan los únicos valores permitidos como "primitivos"
 * después del proceso de normalización.
 *
 * ¿Por qué no se permite undefined?
 *   - Porque en sistemas estrictos (ERP) undefined produce
 *     inconsistencias en validaciones, serializaciones y almacenamiento.
 *   - Siempre convertimos undefined → null para garantizar uniformidad.
 * -----------------------------------------------------------------*/
export type NormalizedPrimitive = string | number | boolean | null;

/* ───────────────────────────────────────────────────────────
 * 2) NORMALIZED OBJECT (SIN Record)
 * -----------------------------------------------------------------
 * Este objeto representa cualquier estructura anidada proveniente
 * de FormData después de ser transformada.
 *
 * - NO usamos Record<string, X> porque:
 *     ✔ Queremos control explícito del shape
 *     ✔ Evitamos permitir propiedades con tipos demasiado amplios
 *     ✔ Mantiene compatibilidad con strict index signatures
 *
 * - Cada propiedad DEBE contener un NormalizedValue.
 * -----------------------------------------------------------------*/
export interface NormalizedObject {
    [key: string]: NormalizedValue;
}

/* ───────────────────────────────────────────────────────────
 * 3) NORMALIZED ARRAY
 * -----------------------------------------------------------------
 * Un arreglo válido después de normalizar. Cada elemento debe
 * haber pasado por coerceValue o normalizeObjectFromFormData.
 * -----------------------------------------------------------------*/
export interface NormalizedArray extends Array<NormalizedValue> { }

/* ───────────────────────────────────────────────────────────
 * 4) NORMALIZED VALUE (UNIÓN FINAL)
 * -----------------------------------------------------------------
 * Define todos los tipos válidos que puede tener un valor después
 * del proceso de normalización.
 *
 * Se asegura que NADA contenga undefined.
 * -----------------------------------------------------------------*/
export type NormalizedValue =
    | NormalizedPrimitive
    | NormalizedObject
    | NormalizedArray;

/* ───────────────────────────────────────────────────────────
 * 5) FORM DATA RAW VALUE
 * -----------------------------------------------------------------
 * Define TODAS las formas de valores que pueden recibirse desde:
 *   - FormData de un multipart/form-data
 *   - Cargas de archivos con Multer
 *   - bodyParser + arreglos de strings
 *
 * Incluye:
 *   - strings brutas
 *   - números y booleanos
 *   - arreglos readonly (Multer genera estos)
 *   - objetos arbitrarios (JSON stringificado)
 *   - undefined (que será convertido a null)
 *
 * Este tipo es extremadamente flexible porque el backend ERP
 * debe estar preparado para datos inconsistentes.
 * -----------------------------------------------------------------*/
export type FormDataValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | readonly string[]
    | { [key: string]: unknown }
    | FormDataValue[];

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
const looksLikeJson = (s: string): boolean => {
    const t = s.trim();
    return (
        (t.startsWith("{") && t.endsWith("}")) ||
        (t.startsWith("[") && t.endsWith("]"))
    );
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
export function coerceValue(value: FormDataValue): NormalizedValue {
    // --- Arreglos (incluye readonly string[]) ---
    if (Array.isArray(value)) {
        return value.map((v) => coerceValue(v)) as NormalizedArray;
    }

    // --- undefined → null (consistencia absoluta) ---
    if (value === undefined || value === null) return null;

    // --- boolean | number → NormalizedPrimitive ---
    if (typeof value !== "string") {
        return value as NormalizedPrimitive;
    }

    // --- procesamiento de string ---
    let s = value.trim();

    // Remover comillas externas (clientes envían '"foo"' a veces)
    if (
        (s.startsWith('"') && s.endsWith('"')) ||
        (s.startsWith("'") && s.endsWith("'"))
    ) {
        s = s.slice(1, -1);
    }

    // --- booleanos reales ---
    if (s === "true") return true;
    if (s === "false") return false;

    // --- JSON embedido ---
    if (looksLikeJson(s)) {
        try {
            const parsed = JSON.parse(s);

            // JSON.parse NUNCA debería devolver undefined, pero TypeScript cree que sí.
            const safeParsed: FormDataValue =
                parsed === undefined ? null : (parsed as FormDataValue);

            return normalizeObjectFromFormData(safeParsed);
        } catch {
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
export function normalizeObjectFromFormData(obj: FormDataValue): NormalizedValue {
    // --- arreglos ---
    if (Array.isArray(obj)) {
        return obj.map((v) => normalizeObjectFromFormData(v)) as NormalizedArray;
    }

    // --- objetos reales ---
    if (obj && typeof obj === "object") {
        const out: NormalizedObject = {};

        for (const key of Object.keys(obj)) {
            const raw = (obj as { [key: string]: unknown })[key];
            out[key] = coerceValue(raw as FormDataValue);
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
export function normalizeFormDataBody(): RequestHandler {
    return (req, _res, next) => {
        try {
            if (req.body && typeof req.body === "object") {
                req.body = normalizeObjectFromFormData(req.body);
            }
            next();
        } catch (err) {
            next(err);
        }
    };
}
