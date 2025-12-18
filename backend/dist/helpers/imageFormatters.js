"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWithBase64 = formatWithBase64;
exports.formatWith64Multiple = formatWith64Multiple;
exports.formatImagesDeepRecursive = formatImagesDeepRecursive;
exports.convertImagePropsRecursively = convertImagePropsRecursively;
const imageHandlerClass_1 = __importDefault(require("./imageHandlerClass"));
const path_1 = __importDefault(require("path"));
const mime_1 = __importDefault(require("mime"));
/* --------------------------------------------------------------------------
 * formatWithBase64
 * --------------------------------------------------------------------------
 * Convierte un campo único que contiene un path de imagen en base64.
 *
 * T = tipo del modelo convertido por toJSON()
 * ImgKey = propiedad del modelo que almacena la imagen (ej: "photo")
 *
 * Retorna: un arreglo de T, donde T[ImgKey] es reemplazado por un string base64
 * o null si no existe imagen.
 * -------------------------------------------------------------------------- */
async function formatWithBase64(models, imageKey) {
    return Promise.all(models.map(async (model) => {
        const data = model.toJSON();
        const raw = data[imageKey];
        let newValue = null;
        if (typeof raw === "string" && raw.trim() !== "") {
            const normalizedPath = path_1.default.normalize(raw);
            const base64 = await imageHandlerClass_1.default.convertToBase64(normalizedPath);
            if (base64) {
                const mimeType = mime_1.default.getType(normalizedPath) ?? "application/octet-stream";
                newValue = `data:${mimeType};base64,${base64}`;
            }
        }
        return {
            ...data,
            [imageKey]: newValue
        };
    }));
}
/* --------------------------------------------------------------------------
 * formatWith64Multiple
 * --------------------------------------------------------------------------
 * Convierte un campo que es un arreglo de objetos, donde cada objeto contiene
 * un path de imagen en la propiedad imgKey.
 *
 * T = tipo del modelo toJSON()
 * K = propiedad del modelo que contiene el arreglo de imágenes (ej: "load_evidence")
 * Item = tipo de cada elemento del arreglo
 * ImgKey = propiedad dentro del Item que contiene el path (ej: "path")
 *
 * Esto resuelve el error original porque ya NO usamos JsonValue,
 * sino tipos genéricos garantizados por el usuario.
 * -------------------------------------------------------------------------- */
async function formatWith64Multiple(models, objectKey, imgKey) {
    return Promise.all(models.map(async (model) => {
        const data = model.toJSON();
        const arr = data[objectKey];
        if (!Array.isArray(arr)) {
            return {
                ...data,
                [objectKey]: null
            };
        }
        const processed = await Promise.all(arr.map(async (item) => {
            const raw = item[imgKey];
            let newValue = null;
            if (typeof raw === "string" && raw.trim() !== "") {
                const normalized = path_1.default.normalize(raw);
                const base64 = await imageHandlerClass_1.default.convertToBase64(normalized);
                if (base64) {
                    const mimeType = mime_1.default.getType(normalized) ?? "application/octet-stream";
                    newValue = `data:${mimeType};base64,${base64}`;
                }
            }
            return {
                ...item,
                [imgKey]: newValue
            };
        }));
        return {
            ...data,
            [objectKey]: processed
        };
    }));
}
/* --------------------------------------------------------------------------
 * convertImagePropsRecursively
 * --------------------------------------------------------------------------
 * Convierte DE MANERA PROFUNDA cualquier key incluida en imageKeys.
 *
 * Permite convertir rutas de imagenes que se encuentran dentro de:
 *  - objetos anidados
 *  - arreglos
 *  - subpropiedades de estructuras complejas
 *
 * Ideal para modelos grandes con muchos campos multimedia.
 * -------------------------------------------------------------------------- */
async function convertImagePropsRecursively(obj, imageKeys) {
    if (Array.isArray(obj)) {
        return Promise.all(obj.map((item) => convertImagePropsRecursively(item, imageKeys)));
    }
    if (obj && typeof obj === "object" && !(obj instanceof Date)) {
        const out = {};
        for (const key of Object.keys(obj)) {
            const value = obj[key];
            if (imageKeys.includes(key) && typeof value === "string") {
                const normalized = path_1.default.normalize(value);
                const base64 = await imageHandlerClass_1.default.convertToBase64(normalized);
                if (base64) {
                    const mimeType = mime_1.default.getType(normalized) ?? "application/octet-stream";
                    out[key] = `data:${mimeType};base64,${base64}`;
                }
                else {
                    out[key] = null;
                }
            }
            else {
                out[key] = await convertImagePropsRecursively(value, imageKeys);
            }
        }
        return out;
    }
    return obj;
}
/* --------------------------------------------------------------------------
 * formatImagesDeepRecursive
 * --------------------------------------------------------------------------
 * Aplica conversión base64 profunda a listas completas de modelos,
 * usando convertImagePropsRecursively.
 *
 * imageKeys = lista de atributos que contienen paths de imagen.
 * -------------------------------------------------------------------------- */
async function formatImagesDeepRecursive(models, imageKeys = ["photo", "path"]) {
    return Promise.all(models.map(async (model) => {
        const json = model.toJSON();
        return convertImagePropsRecursively(json, imageKeys);
    }));
}
