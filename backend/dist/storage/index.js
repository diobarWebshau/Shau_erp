"use strict";
/**
 * Storage Public API
 * ------------------------------------------------------------------
 * Expone la interfaz pública del subsistema de storage.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeUploadedFiles = exports.storageFields = exports.withStorageContext = exports.upload = void 0;
var multer_storage_1 = require("./infrastructure/multer.storage");
Object.defineProperty(exports, "upload", { enumerable: true, get: function () { return multer_storage_1.upload; } });
var with_storage_context_middleware_1 = require("./http/with-storage-context.middleware");
Object.defineProperty(exports, "withStorageContext", { enumerable: true, get: function () { return with_storage_context_middleware_1.withStorageContext; } });
var storage_fields_middleware_1 = require("./http/storage-fields.middleware");
Object.defineProperty(exports, "storageFields", { enumerable: true, get: function () { return storage_fields_middleware_1.storageFields; } });
var normalize_storage_middleware_1 = require("./http/normalize-storage.middleware");
Object.defineProperty(exports, "normalizeUploadedFiles", { enumerable: true, get: function () { return normalize_storage_middleware_1.normalizeUploadedFiles; } });
