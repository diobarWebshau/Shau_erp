import type { StorageRequest } from "../http/with-storage-context.middleware";
import { resolveStoragePath } from "../application/resolve-storage-path";
import multer, { DiskStorageOptions} from "multer";
import { storagePolicies, StoragePolicy } from "../domain/storege-policy";
import { randomUUID } from "crypto";
import path from "path";

/**
 * Multer Storage (Infrastructure)
 * ------------------------------------------------------------------
 * Implementación concreta del almacenamiento usando Multer (disk).
 *
 * Función técnica:
 * - Traducir decisiones de aplicación a operaciones reales.
 * - Integrar Multer con las políticas del dominio.
 *
 * Qué hace:
 * - Guarda archivos en disco.
 * - Aplica naming seguro.
 * - Valida tipos de archivo.
 *
 * Qué no hace:
 * - No decide reglas de negocio.
 * - No interpreta rutas HTTP.
 *
 * Ubicación:
 * - Infrastructure: implementación concreta y reemplazable.
 */

const storageOptions: DiskStorageOptions = {
  destination(req: StorageRequest, _file, cb) {
    try {
      if (!req.storageContext) {
        return cb(new Error("Storage context not provided"), "");
      }

      // 👇 SIEMPRE TMP
      const dir = resolveStoragePath(req.storageContext);
      cb(null, dir);

    } catch (err) {
      cb(err as Error, "");
    }
  },

  filename(_req, file, cb) {
    const ext: string = path.extname(file.originalname);
    cb(null, `${randomUUID()}-${Date.now()}${ext}`);
  },
};

export const upload = multer({
  storage: multer.diskStorage(storageOptions),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter(req: StorageRequest, file, cb) {
    if (!req.storageContext) return cb(null, false);
    const policy: StoragePolicy = storagePolicies[req.storageContext];
    cb(null, policy.allowedMimeTypes.test(file.mimetype));
  },
});
