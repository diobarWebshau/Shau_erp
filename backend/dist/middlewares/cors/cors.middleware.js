"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
/* ──────────────────────────────────────────────────────────────────────────────
 *  ACCEPTED_ORIGINS
 * ──────────────────────────────────────────────────────────────────────────────
 * Usamos un Set<string> por tres razones clave:
 *
 * 1) Búsqueda O(1): muchísimos más eficiente que array.includes()
 * 2) Evita duplicados: imposible agregar el mismo origen dos veces por error
 * 3) Se alinea perfectamente con TypeScript estricto: Set<string> es
 *    inmutable en intenciones, lo cual mejora revisiones y mantenibilidad.
 *
 * En un entorno productivo podrías reemplazar esto por una tabla en la base de
 * datos, variables de entorno, o incluso un servicio remoto de autorizaciones.
 */
const ACCEPTED_ORIGINS = new Set([
    "http://localhost:3003",
    "http://localhost:5173",
    "http://localhost:5174",
]);
/* ──────────────────────────────────────────────────────────────────────────────
 *  corsDelegate — CORAZÓN DE LA LÓGICA CORS
 * ──────────────────────────────────────────────────────────────────────────────
 * Aquí es donde realmente aprovechamos `CorsRequest`.
 *
 * ¿Por qué usar CorsOptionsDelegate<CorsRequest>?
 *
 * Porque, tal como definen las declaraciones de tipo del paquete `cors`,
 * SOLO esta variante del API permite recibir:
 *
 *      req: CorsRequest
 *
 * Es decir: acceso a `req.method`, `req.headers`, y otra metadata necesaria
 * cuando se necesitan reglas CORS más avanzadas.
 *
 * En este modo:
 *
 *   cors( corsDelegate )   ─▶  Express ejecuta corsDelegate(req, callback)
 *
 * Y nosotros devolvemos:
 *   callback(null, { origin: true })   → permitido
 *   callback(error, { origin: false }) → bloqueado
 *
 * Esto nos permite:
 *   ✔ Control dinámico de CORS por origen
 *   ✔ Validaciones por método, ruta o headers en el futuro
 *   ✔ Registro detallado de la solicitud
 *   ✔ Compatibilidad total con TypeScript estricto
 */
const corsDelegate = (req, callback) => {
    // El header "Origin" puede venir undefined (cURL, Postman, SSR, server-to-server)
    const origin = req.headers.origin;
    /* -------------------------------------------------------------------------
     * CASO 1 — Peticiones sin header Origin
     * -------------------------------------------------------------------------
     * Requests desde:
     *   - cURL
     *   - Postman
     *   - backends internos
     *   - SSR / renderizado del servidor
     *
     * No tienen sentido ser bloqueadas por CORS porque CORS existe SOLO para
     * navegadores. Por eso, permitimos el acceso.
     */
    if (origin === undefined)
        return callback(null, { origin: true });
    /* -------------------------------------------------------------------------
     * CASO 2 — Origen permitido explícitamente
     * -------------------------------------------------------------------------
     * Aquí garantizamos que el origen viene en nuestra lista blanca.
     */
    if (ACCEPTED_ORIGINS.has(origin))
        return callback(null, { origin: true });
    /* -------------------------------------------------------------------------
     * CASO 3 — Origen NO permitido
     * -------------------------------------------------------------------------
     * Bloqueamos la solicitud devolviendo un error. Es importante generar un
     * mensaje claro porque muchos navegadores silencian errores CORS y el
     * desarrollador necesita ver algo útil en los logs.
     */
    const error = new Error(`CORS Error: Origin "${origin}" is not allowed to access this service.`);
    // Denegamos y notificamos al navegador
    return callback(error, { origin: false });
};
/* ──────────────────────────────────────────────────────────────────────────────
 *  MIDDLEWARE FINAL
 * ──────────────────────────────────────────────────────────────────────────────
 * Construimos el middleware llamando a cors() con nuestro delegado.
 *
 * ¿Por qué es seguro?
 *
 * - TypeScript verifica que corsDelegate cumple con CorsOptionsDelegate<CorsRequest>.
 * - cors() asegura que la integración con Express sea correcta.
 * - Nuestra función determina en tiempo real si permitir o rechazar CORS.
 */
const corsMiddleware = (0, cors_1.default)(corsDelegate);
exports.default = corsMiddleware;
