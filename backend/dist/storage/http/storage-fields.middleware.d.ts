import type { Response, NextFunction } from "express";
import type { StorageRequest } from "./with-storage-context.middleware";
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
export declare const storageFields: (fields: {
    name: string;
    maxCount: number;
}[]) => (req: StorageRequest, res: Response, next: NextFunction) => void;
