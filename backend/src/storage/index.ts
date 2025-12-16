/**
 * Storage Public API
 * ------------------------------------------------------------------
 * Expone la interfaz pública del subsistema de storage.
 */

export { upload } from "./infrastructure/multer.storage";
export { withStorageContext } from "./http/with-storage-context.middleware";
export { storageFields } from "./http/storage-fields.middleware";
export { normalizeUploadedFiles } from "./http/normalize-storage.middleware";
export type { StorageContext } from "./domain/storage-context";
