import type { Logger } from "winston";
/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  INSTANCIA FINAL DEL LOGGER
 * ──────────────────────────────────────────────────────────────────────────────
 * winston.createLogger() devuelve la instancia central del sistema de logs.
 *
 * ¿Por qué exportarla así?
 *   - Un solo logger para toda la aplicación → consistencia total.
 *   - Centralización de formatos → mantenimiento más fácil.
 *   - Si mañana quieres enviar logs a:
 *         · ElasticSearch
 *         · Loki
 *         · Datadog
 *         · Graylog
 *     Solo debes agregar un transporte aquí.
 *
 * ¿Ventajas en un ERP?
 *   - Auditoría empresarial real.
 *   - Diagnóstico rápido de fallos.
 *   - Registros separados de errores críticos.
 *   - Facilidad para debugging en producción.
 */
declare const winstonLogger: Logger;
export default winstonLogger;
