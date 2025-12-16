import path from "path";
import fs from "fs/promises";
import type { Stats } from "fs";

/**
 * ImageHandler
 * -----------------------------------------------------------------------------
 * Clase utilitaria para gestionar archivos de imagen dentro del ERP.
 *
 * ¿Por qué existe esta clase?
 *  - Centraliza toda la lógica de acceso, conversión y eliminación de imágenes.
 *  - Evita duplicación de código en controladores y servicios.
 *  - Permite un único punto de mantenimiento si cambia la estructura de uploads.
 *
 * Convenciones:
 *  - Se trabaja únicamente con rutas **relativas** (almacenadas en BD).
 *  - La clase las convierte internamente a rutas absolutas en disco.
 *  - Nunca se exponen rutas absolutas fuera de esta clase.
 */
class ImageHandler {

    /**
     * Convierte una ruta relativa almacenada en BD a una ruta absoluta en el sistema.
     *
     * Ejemplo:
     *   "products/abc/image.png" → "/proyecto/uploads/products/abc/image.png"
     *
     * Se usa process.cwd() para asegurar que funcione igual en:
     *   - entornos locales
     *   - servidores PM2
     *   - builds en Docker
     */
    static resolveImagePath(relativePath: string): string {
        return path.join(process.cwd(), process.env.FILES_PATH!, relativePath);
    }

    /**
     * Mueve una imagen desde su ubicación actual a un directorio
     * asociado a una entidad del dominio (ej. products/{id}).
     *
     * ¿Por qué es necesario?
     * - Multer guarda el archivo ANTES de que exista el registro en BD.
     * - Una vez creado el registro, el archivo debe organizarse
     *   bajo una carpeta estable y semántica.
     *
     * Ejemplo de uso:
     *  - Entrada:  "products/tmp/uuid.png"
     *  - Salida:   "products/43/uuid.png"
     *
     * Retorna:
     *  - La nueva ruta RELATIVA que debe persistirse en BD.
     *
     * Notas técnicas importantes:
     * - Este método ASUME que el archivo de origen existe.
     * - La creación del directorio final es responsabilidad de este método.
     * - Si el move falla, el error debe propagarse para permitir rollback.
     */
    static async moveImageToEntityDirectory(
        relativePath: string,
        entity: string,
        entityId: string
    ): Promise<string> {

        const uploadsRoot = path.resolve(process.cwd(), process.env.FILES_PATH!);

        const sourcePath = path.resolve(uploadsRoot, relativePath);
        const entityDir = path.resolve(uploadsRoot, entity, entityId);

        // Asegurar que el directorio por entidad exista
        await fs.mkdir(entityDir, { recursive: true });

        const fileName = path.basename(sourcePath);
        const destinationPath = path.join(entityDir, fileName);

        // Mover el archivo (operación atómica a nivel FS)
        await fs.rename(sourcePath, destinationPath);

        // Retornar ruta RELATIVA para BD
        return path
            .relative(uploadsRoot, destinationPath)
            .replace(/\\/g, "/");
    }

    /**
     * Elimina una imagen si existe en el sistema de archivos.
     *
     * Motivos:
     *  - Garantiza limpieza cuando un registro se elimina o se actualiza.
     *  - Evita acumulación de archivos huérfanos.
     *
     * Consideraciones:
     *  - El método es tolerante a errores.
     *  - Si el archivo no existe, no rompe el flujo.
     */
    static async removeImageIfExists(relativePath: string): Promise<void> {
        if (!relativePath) return;

        const absPath: string = ImageHandler.resolveImagePath(relativePath);

        try {
            await fs.access(absPath);
            await fs.unlink(absPath);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(
                    `Image not found or error deleting: ${absPath} - ${err.message}`
                );
            } else {
                console.error(
                    "Unexpected error while deleting image:",
                    err
                );
            }
        }
    }

    /**
     * Valida si una imagen existe físicamente en el disco.
     *
     * Retorna:
     *  - true → existe
     *  - false → no existe o no se puede acceder
     *
     * Uso típico:
     *  - Validaciones previas a servir archivos
     *  - Fallbacks de imágenes por defecto
     */
    static async doesImageExist(relativePath: string): Promise<boolean> {
        if (!relativePath) return false;

        const absPath: string = ImageHandler.resolveImagePath(relativePath);

        try {
            await fs.access(absPath);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Convierte una imagen del disco a su representación Base64.
     *
     * ¿Para qué se usa?
     *  - Para API públicas que deben servir imágenes sin exponer el disco.
     *  - Para mobile apps que requieren Data URI embebido.
     *
     * Retorna:
     *  - string Base64 → si la conversión fue exitosa
     *  - null → si la imagen no existe o no se pudo leer
     *
     * Nota:
     *  - Este método NO agrega el prefijo `data:image/...;base64,`
     *    ya que eso depende del consumidor.
     */
    static async convertToBase64(relativePath: string): Promise<string | null> {
        if (!relativePath) return null;


        const absPath: string = ImageHandler.resolveImagePath(relativePath);

        try {
            const buffer = await fs.readFile(absPath);
            return buffer.toString("base64");
        } catch (err: unknown) {
            console.error("Error converting image to Base64:", err);
            return null;
        }
    }

    /**
     * Elimina un archivo o un directorio completo.
     *
     * Usos típicos:
     *  - Carpetas de evidencias
     *  - Directorios por shipping-order con múltiples imágenes
     *
     * Consideraciones:
     *  - Detecta dinámicamente si es archivo o carpeta.
     *  - Usa eliminación recursiva para directorios.
     *  - Es tolerante a errores (no rompe el flujo).
     */
    static async removePathIfExists(relativePath: string): Promise<void> {
        if (!relativePath) return;

        const absPath: string = ImageHandler.resolveImagePath(relativePath);

        try {
            const stats: Stats = await fs.stat(absPath);

            if (stats.isFile()) {
                await fs.unlink(absPath);
            } else if (stats.isDirectory()) {
                await fs.rm(absPath, { recursive: true, force: true });
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(
                    `Path not found or error deleting: ${absPath} - ${err.message}`
                );
            } else {
                console.error(
                    "Unexpected error while deleting path:",
                    err
                );
            }
        }
    }
}

export default ImageHandler;
