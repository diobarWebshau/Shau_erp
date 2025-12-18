"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFileCleanupService = void 0;
const imageHandlerClass_1 = __importDefault(require("../../helpers/imageHandlerClass"));
/**
 * LocalFileCleanupService
 * ------------------------------------------------------------------
 * Implementación concreta del cleanup usando filesystem local.
 *
 * Características:
 * - fire-and-forget
 * - no bloquea el flujo
 * - tolerante a errores
 * - usa ImageHandler como ejecutor
 */
class LocalFileCleanupService {
    scheduleCleanup(relativePath) {
        // ⚠️ IMPORTANTE:
        // No async / await aquí → no bloquea el UseCase
        setImmediate(async () => {
            try {
                await imageHandlerClass_1.default.removePathIfExists(relativePath);
            }
            catch (err) {
                console.error("Deferred file cleanup failed:", relativePath, err);
            }
        });
    }
}
exports.LocalFileCleanupService = LocalFileCleanupService;
