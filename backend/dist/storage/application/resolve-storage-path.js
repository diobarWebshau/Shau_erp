"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveStoragePath = resolveStoragePath;
const storege_policy_1 = require("../domain/storege-policy");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * resolveStoragePath (Application)
 * ------------------------------------------------------------------
 * Caso de uso técnico de la capa de aplicación.
 *
 * Encapsula la lógica necesaria para RESOLVER y ASEGURAR
 * el path físico donde se almacenará un archivo.
 *
 * Función técnica:
 * - Traducir un contexto de dominio en una ruta física.
 * - Validar reglas (ej. si requiere ID).
 * - Asegurar la existencia del directorio.
 *
 * Qué hace:
 * - Coordina dominio (políticas) con filesystem.
 * - Garantiza que el path exista antes del guardado.
 *
 * Qué no hace:
 * - No maneja Express.
 * - No depende de Multer.
 * - No procesa archivos.
 *
 * Ubicación:
 * - Application: orquesta reglas del dominio con infraestructura.
 */
const rootDir = path_1.default.resolve();
const baseDir = path_1.default.join(rootDir, process.env.FILES_PATH);
function resolveStoragePath(context, entityId) {
    const policy = storege_policy_1.storagePolicies[context];
    if (policy.requiresEntityId && !entityId)
        throw new Error(`Storage context "${context}" requires entityId`);
    const directory = policy.requiresEntityId
        ? path_1.default.join(baseDir, policy.baseDir, entityId)
        : path_1.default.join(baseDir, policy.baseDir);
    fs_1.default.mkdirSync(directory, { recursive: true });
    return directory;
}
