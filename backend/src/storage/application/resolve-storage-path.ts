import type { StorageContext } from "../domain/storage-context";
import { storagePolicies } from "../domain/storege-policy";
import path from "path";
import fs from "fs";

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

const rootDir = path.resolve();
const baseDir = path.join(rootDir, process.env.FILES_PATH!);

export function resolveStoragePath(
    context: StorageContext,
    entityId?: string
): string {
    const policy = storagePolicies[context];
    if (policy.requiresEntityId && !entityId)
        throw new Error(`Storage context "${context}" requires entityId`);
    const directory = policy.requiresEntityId
        ? path.join(baseDir, policy.baseDir, entityId!)
        : path.join(baseDir, policy.baseDir);
    fs.mkdirSync(directory, { recursive: true });
    return directory;
}
