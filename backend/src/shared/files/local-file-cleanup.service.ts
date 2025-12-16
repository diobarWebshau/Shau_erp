import ImageHandler from "@helpers/imageHandlerClass";
import { IFileCleanupPort } from "./file-cleanup.port";

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
export class LocalFileCleanupService implements IFileCleanupPort {
    scheduleCleanup(relativePath: string): void {
        // ⚠️ IMPORTANTE:
        // No async / await aquí → no bloquea el UseCase
        setImmediate(async () => {
            try {
                await ImageHandler.removePathIfExists(relativePath);
            } catch (err) {
                console.error(
                    "Deferred file cleanup failed:",
                    relativePath,
                    err
                );
            }
        });
    }
}
