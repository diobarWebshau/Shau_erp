"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  __dirname EN COMMONJS
 * ──────────────────────────────────────────────────────────────────────────────
 * En CommonJS (el entorno de Node.js por defecto), __dirname se expone
 * automáticamente como una variable global.
 *
 * ¿Por qué usar __dirname aquí?
 *   - Siempre apunta al directorio ACTUAL donde está este archivo.
 *   - Es estable y no depende del directorio desde donde se ejecute Node.
 *   - Permite construir rutas absolutas para los archivos del logger.
 *
 * ¿Qué problema resuelve?
 *   - Evita que los logs se escriban en ubicaciones inesperadas cuando:
 *       · Ejecutas tu app con PM2
 *       · Haces build a /dist
 *       · Corres node desde una carpeta distinta
 *
 * Tener rutas absolutas asegura que los logs SIEMPRE terminen en la carpeta correcta.
 */
const dirname = __dirname;
/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN DE ROTACIÓN DE LOGS GENERALES
 * ──────────────────────────────────────────────────────────────────────────────
 * DailyRotateFile es un transporte especial para Winston que:
 *   - Crea un archivo de log POR DÍA (o por tamaño).
 *   - Genera historial automático (app-2025-01-01.log, app-2025-01-02.log…)
 *   - Elimina logs antiguos según maxFiles.
 *
 * ¿Por qué usarlo en un ERP?
 *   - Evita que un archivo único crezca a tamaños absurdos.
 *   - Mejora rendimiento del disco.
 *   - Facilita auditoría y análisis histórico.
 */
const fileRotationOptions = {
    datePattern: "YYYY-MM-DD",
    maxSize: "20m", // Rota si supera 20 MB
    maxFiles: "14d", // Mantiene solo 14 días
    filename: path_1.default.join(dirname, "../../../dist/logs/generals/app-%DATE%.log") // Archivo por día
};
/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  CONFIG DE ROTACIÓN PARA EXCEPCIONES NO MANEJADAS
 * ──────────────────────────────────────────────────────────────────────────────
 * Winston puede capturar:
 *   - Excepciones no controladas (throw sin catch)
 *   - Promesas rechazadas
 *
 * Queremos registrar estas fallas en un archivo SEPARADO para:
 *   - Auditorías de fallos graves.
 *   - Seguridad y análisis forense.
 *   - Mayor claridad al investigar errores críticos del backend.
 */
const exceptionRotationOptions = {
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
    filename: path_1.default.join(dirname, "../../../dist/logs/exceptions/exceptions-%DATE%.log")
};
/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  INSTANCIA DEL TRANSPORTE ROTATIVO
 * ──────────────────────────────────────────────────────────────────────────────
 * Se define fuera del logger para:
 *   - mantener tipado explícito
 *   - poder reutilizarlo si fuera necesario
 */
const rotatingFileTransport = new winston_daily_rotate_file_1.default(fileRotationOptions);
/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  FORMATO DE LOGS
 * ──────────────────────────────────────────────────────────────────────────────
 * Winston usa "format" para transformar el contenido antes de escribirlo.
 *
 * Combinamos varios formatos:
 *
 *   1) colorize()
 *       - Agrega colores a la consola para mejorar legibilidad.
 *
 *   2) timestamp()
 *       - Añade fecha y hora en cada línea del log.
 *       - Es esencial en sistemas ERP donde depuración y auditoría
 *         requieren exactitud temporal.
 *
 *   3) printf()
 *       - Permite controlar EXACTAMENTE cómo se ve cada línea del log.
 *
 * Con este formato obtenemos líneas como:
 *   2025-01-10 14:22:33 [INFO]: Usuario 42 creó un producto
 */
const loggerFormat = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.printf((info) => `${info.timestamp} [${String(info.level).toUpperCase()}]: ${info.message}`));
/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  OPCIONES DEL LOGGER PRINCIPAL
 * ──────────────────────────────────────────────────────────────────────────────
 * LoggerOptions asegura que no se agreguen propiedades inválidas.
 *
 * Transports:
 *   - Console(): logs en consola (útil en dev)
 *   - rotatingFileTransport: logs persistentes diarios
 *
 * exceptionHandlers:
 *   - Captura excepciones fatales y las escribe en archivos separados.
 *
 * El nivel "info" significa:
 *   - se registrarán: info, warn, error
 *   - NO se registrarán: debug, verbose, silly
 */
const loggerOptions = {
    level: "info",
    format: loggerFormat,
    transports: [
        new winston_1.default.transports.Console(),
        rotatingFileTransport
    ],
    exceptionHandlers: [
        new winston_daily_rotate_file_1.default(exceptionRotationOptions)
    ]
};
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
const winstonLogger = winston_1.default.createLogger(loggerOptions);
exports.default = winstonLogger;
