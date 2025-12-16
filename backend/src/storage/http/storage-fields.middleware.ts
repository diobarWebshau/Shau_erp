import type { Response, NextFunction } from "express";
import type { StorageRequest } from "./with-storage-context.middleware";
import { upload } from "../infrastructure/multer.storage";

/**
 * HTTP Middleware – Upload Fields
 * ------------------------------------------------------------------
 * Ejecuta Multer para los campos indicados.
 *
 * Función técnica:
 * - Aplicar el upload de archivos de forma declarativa.
 *
 * Qué hace:
 * - Ejecuta upload.fields(...)
 *
 * Qué no hace:
 * - No transforma datos.
 * - No decide rutas.
 */

export const storageFields = (fields: { name: string; maxCount: number }[]) => (req: StorageRequest, res: Response, next: NextFunction): void => {
    upload.fields(fields)(req, res, (err) => {
        if (err) return next(err);
        next();
    });
};
