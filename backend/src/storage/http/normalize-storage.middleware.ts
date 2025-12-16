import type { Response, NextFunction } from "express";
import type { StorageRequest } from "./with-storage-context.middleware";
import path from "path";

/**
 * HTTP Middleware – Normalize Upload
 * ------------------------------------------------------------------
 * Normaliza req.files → req.body.
 *
 * Función técnica:
 * - Adaptar la salida de Multer a estructuras de dominio/API.
 *
 * Qué hace:
 * - Convierte paths absolutos en relativos.
 * - Prepara datos para persistencia.
 *
 * Qué no hace:
 * - No guarda archivos.
 * - No valida reglas.
 */

type MulterFilesMap = Record<string, Express.Multer.File[]>;

export const normalizeUploadedFiles = (options: {
    single?: readonly string[];
    multiple?: readonly string[];
    baseDir?: string;
}) => (req: StorageRequest, _res: Response, next: NextFunction): void => {

    if (!req.files) return next();

    const files: MulterFilesMap = req.files as MulterFilesMap;

    const baseDir: string = options.baseDir
        ? path.resolve(options.baseDir)
        : path.resolve(process.cwd(), process.env.FILES_PATH!);

    // -------------------------
    // SINGLE FILE FIELDS
    // -------------------------
    options.single?.forEach((field) => {
        const file: Express.Multer.File = files[field]?.[0];
        if (!file) return;

        req.body[field] = path
            .relative(baseDir, file.path)
            .replace(/\\/g, "/");
    });

    // -------------------------
    // MULTIPLE FILE FIELDS
    // -------------------------
    options.multiple?.forEach((field) => {
        const fieldFiles: Express.Multer.File[] = files[field];
        if (!fieldFiles) return;
        req.body[field] = fieldFiles.map(file => ({
            path: path.relative(baseDir, file.path).replace(/\\/g, "/"),
            originalname: file.originalname,
        }));
    });

    next();
};
