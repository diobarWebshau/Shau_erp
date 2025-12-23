import type { Request, Response, NextFunction } from "express";
import type { StorageContext } from "../domain/storage-context";

/**
 * HTTP Middleware – Storage Context
 * ------------------------------------------------------------------
 * Middleware declarativo que inyecta el contexto de almacenamiento
 * en la request.
 *
 * Función técnica:
 * - Comunicar explícitamente a la infraestructura PARA QUÉ
 *   agregado se está subiendo un archivo.
 *
 * Qué hace:
 * - Añade metadata contextual a la request.
 * - Permite que capas inferiores actúen correctamente.
 *
 * Qué no hace:
 * - No sube archivos.
 * - No crea carpetas.
 * - No transforma datos.
 *
 * Ubicación:
 * - HTTP: capa adaptadora entre transporte y aplicación.
 */

export interface StorageRequest extends Request {
    storageContext?: StorageContext;

    // 👇 clave: body indexable y estricto
    body: Record<string, unknown>;
}

export const withStorageContext =
    (context: StorageContext) => (req: StorageRequest, _res: Response, next: NextFunction): void => {
        req.storageContext = context;

        // 👇 aseguramos que body exista como objeto indexable
        if (!req.body || typeof req.body !== "object") {
            req.body = {};
        }

        next();
    };
