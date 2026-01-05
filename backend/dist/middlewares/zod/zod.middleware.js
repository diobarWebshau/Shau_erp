"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validation_error_js_1 = require("@shared/errors/validation-error/validation-error.js");
const zod_validator_1 = require("@shared/zod-validators/zod-validator");
/**
 * ============================================================================================
 * 🟣 validateRequest(schema)
 * ============================================================================================
 * Middleware universal de validación para toda la API.
 *
 * OBJETIVOS PRINCIPALES:
 * ----------------------
 * ✔ Validar params, query y body ANTES de llegar al controlador
 * ✔ Garantizar que el controller reciba datos 100% válidos, tipados y normalizados
 * ✔ Centralizar y unificar la validación de todos los endpoints
 * ✔ Lanzar errores estructurados (ValidationError) en caso de falla
 * ✔ Evitar ANY en cualquier parte del proceso
 * ✔ Mantener arquitectura limpia y profesional
 *
 * ¿POR QUÉ ES TAN IMPORTANTE?
 * ---------------------------
 * Porque en un ERP grande, cada endpoint recibe múltiples combinaciones
 * de parámetros, y confiar en los datos del cliente es un error crítico.
 *
 * Este middleware:
 *    - protege seguridad
 *    - protege integridad de datos
 *    - evita lógica duplicada
 *    - garantiza consistencia entre backend y frontend
 *
 * Además, sigue una regla de oro:
 *    ❌ Nunca tocar Zod en los controllers
 *    ✔ Los controllers reciben datos ya procesados y confiables
 */
const validateRequest = (schema) => (req, _res, next) => {
    /**
     * ====================================================================================
     * 🔵 1. NORMALIZAR LA ENTRADA
     * ====================================================================================
     * En peticiones GET o DELETE:
     *    req.body viene como undefined
     *
     * En Express 5, req.query puede venir como {} o como un objeto complejo.
     *
     * La normalización asegura que Zod SIEMPRE reciba objetos válidos.
     *
     * Esto reduce errores falsos como:
     *
     *    "expected object, received undefined"
     */
    const normalizedInput = {
        params: req.params ?? {},
        query: req.query ?? {},
        body: req.body ?? {},
    };
    /**
     * ====================================================================================
     * 🔵 2. EXTRAER SOLO LO QUE SE DEBE VALIDAR
     * ====================================================================================
     * Un schema de endpoint define:
     *     { params, query, body, response }
     *
     * Pero aquí **solo validamos la entrada**, no el response.
     *
     * Por eso hacemos un pick() del schema.
     */
    const shapeToValidate = schema.pick({
        params: true,
        query: true,
        body: true,
    });
    /**
     * ====================================================================================
     * 🔵 3. EJECUTAR LA VALIDACIÓN TIPADA
     * ====================================================================================
     * validateSafeParse() ejecuta safeParse() pero con tipado estricto,
     * sin usar `any`, devolviendo ParsedResult<S>.
     *
     * Esto permite que TypeScript entienda perfectamente:
     *     - parsed.success === true → parsed.data existe
     *     - parsed.success === false → parsed.error existe
     */
    const parsed = (0, zod_validator_1.validateSafeParse)(shapeToValidate, normalizedInput);
    /**
     * ====================================================================================
     * 🔴 4. MANEJO DE ERRORES DE VALIDACIÓN
     * ====================================================================================
     * Si la validación falla, parsed.error.issues contiene un array con:
     *
     *     - path: "params.id" / "query.page" / "body.name" ...
     *     - message: descripción detallada del error
     *
     * Se transforma a un formato limpio y se envuelve en ValidationError:
     *
     *     status: 422
     *     type: "validation_error"
     *     data: lista de issues
     *
     * Este error es capturado por el errorMiddleware global.
     */
    if (!parsed.success) {
        const issues = parsed.error.issues.map(issue => ({
            path: issue.path.join("."),
            message: issue.message,
        }));
        return next(new validation_error_js_1.RequestValidationError(issues));
    }
    /**
     * ====================================================================================
     * 🟢 5. VALIDACIÓN EXITOSA → MUTAR req.params, req.query, req.body
     * ====================================================================================
     * ❌ NO podemos reasignar req.params ni req.query:
     *        req.params = ...
     *        req.query = ...
     *    → Esto rompe Express porque son getters protegidos.
     *
     * ✔ SÍ podemos mutar sus propiedades internas:
     *
     *        Object.assign(req.params, parsed.data.params)
     *
     * req.body sí es reasignable sin riesgo.
     */
    Object.assign(req.params, parsed.data.params);
    Object.assign(req.query, parsed.data.query);
    req.body = parsed.data.body;
    /**
     * ====================================================================================
     * 🟢 6. CONTINUAR AL CONTROLADOR
     * ====================================================================================
     * A partir de aquí, el controlador YA RECIBE:
     *
     *     req.params → tipado y validado
     *     req.query  → tipado y validado
     *     req.body   → tipado y validado
     *
     * No necesita chequear nada más.
     */
    console.log('salgo del zod');
    return next();
};
exports.validateRequest = validateRequest;
