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
export declare class LocalFileCleanupService implements IFileCleanupPort {
    scheduleCleanup(relativePath: string): void;
}
