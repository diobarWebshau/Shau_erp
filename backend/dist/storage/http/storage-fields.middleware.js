"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageFields = void 0;
const multer_storage_1 = require("../infrastructure/multer.storage");
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
const storageFields = (fields) => (req, res, next) => {
    multer_storage_1.upload.fields(fields)(req, res, (err) => {
        if (err)
            return next(err);
        next();
    });
};
exports.storageFields = storageFields;
