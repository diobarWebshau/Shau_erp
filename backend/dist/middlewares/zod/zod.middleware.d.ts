import type { ApiRequest, ApiResponse } from "../../shared/typed-request-endpoint/typed-request.interface.js";
import type { EndpointZodSchema } from "../../shared/typed-request-endpoint/endpoint-zod.schema";
import type { NextFunction } from "express";
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
declare const validateRequest: <S extends EndpointZodSchema>(schema: S) => (req: ApiRequest, _res: ApiResponse, next: NextFunction) => void;
export { validateRequest };
