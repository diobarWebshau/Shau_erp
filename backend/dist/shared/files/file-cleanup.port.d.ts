/**
 * FileCleanupPort
 * ------------------------------------------------------------------
 * Puerto de aplicación para programar la limpieza de archivos.
 *
 * NO ejecuta la limpieza directamente.
 * SOLO expresa la intención de que algo debe limpiarse.
 */
export interface IFileCleanupPort {
    scheduleCleanup(relativePath: string): void;
}
