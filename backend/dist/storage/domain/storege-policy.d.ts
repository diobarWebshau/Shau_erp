import type { StorageContext } from "./storage-context";
/**
 * StoragePolicy (Domain)
 * ------------------------------------------------------------------
 * Define las POLÍTICAS DE ALMACENAMIENTO por contexto de negocio.
 *
 * Este archivo concentra el conocimiento del ERP relacionado con:
 * - qué tipo de archivos se permiten
 * - si requieren ID de entidad
 * - límites de tamaño
 * - estructura lógica del almacenamiento
 *
 * Función técnica:
 * - Centralizar reglas de almacenamiento por contexto.
 * - Evitar duplicación de reglas en HTTP o infraestructura.
 * - Permitir cambios de políticas sin tocar Multer ni routers.
 *
 * Qué hace:
 * - Asocia un StorageContext con sus reglas.
 * - Expone un contrato claro para la capa de aplicación.
 *
 * Qué no hace:
 * - No crea carpetas.
 * - No maneja archivos físicos.
 * - No depende de Express, Multer o FS.
 *
 * Ubicación en la arquitectura:
 * - Domain: contiene reglas estáticas del negocio.
 */
export interface StoragePolicy {
    baseDir: string;
    requiresEntityId: boolean;
    maxFileSizeMb: number;
    allowedMimeTypes: RegExp;
}
export declare const storagePolicies: Record<StorageContext, StoragePolicy>;
