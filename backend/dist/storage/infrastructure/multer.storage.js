"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const resolve_storage_path_1 = require("../application/resolve-storage-path");
const multer_1 = __importDefault(require("multer"));
const storege_policy_1 = require("../domain/storege-policy");
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
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
const storageOptions = {
    destination(req, _file, cb) {
        try {
            if (!req.storageContext) {
                return cb(new Error("Storage context not provided"), "");
            }
            // 👇 SIEMPRE TMP
            const dir = (0, resolve_storage_path_1.resolveStoragePath)(req.storageContext);
            cb(null, dir);
        }
        catch (err) {
            cb(err, "");
        }
    },
    filename(_req, file, cb) {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${(0, crypto_1.randomUUID)()}-${Date.now()}${ext}`);
    },
};
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage(storageOptions),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter(req, file, cb) {
        if (!req.storageContext)
            return cb(null, false);
        const policy = storege_policy_1.storagePolicies[req.storageContext];
        cb(null, policy.allowedMimeTypes.test(file.mimetype));
    },
});
