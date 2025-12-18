"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProcessQueryToCriteria = void 0;
const query_request_normalizer_1 = require("../../../../../shared/query-reqyest/query-request-normalizer");
/**
 * Query → Criteria Mapper
 * ------------------------------------------------------------------
 * Función de infraestructura que transforma parámetros de consulta HTTP
 * en un objeto tipado de criterios de búsqueda para el dominio.
 *
 * Por qué existe / qué problema resuelve:
 * - Las queries HTTP llegan como strings, arrays o valores ambiguos
 *   (ej. "true", "1", "foo,bar"), lo que genera inconsistencias.
 * - Los casos de uso necesitan trabajar con criterios claros y tipados
 *   (arrays, booleanos, números) para aplicar reglas de negocio sin
 *   depender de cómo se construyó la request.
 * - Este mapper elimina esa fricción: normaliza y convierte los datos
 *   externos en estructuras seguras y consistentes para el dominio.
 *
 * Función técnica:
 * - Recibir queries externas validadas por schemas.
 * - Normalizar valores a tipos consistentes (`normalizeToArray`,
 *   `normalizeToBoolean`, `normalizeToNumberArray`).
 * - Construir un objeto `SearchCriteria` que los casos de uso puedan
 *   consumir directamente.
 *
 * Qué hace:
 * - Convierte parámetros de query en criterios tipados del dominio.
 * - Aísla la capa de aplicación de los detalles de cómo llegan los datos.
 * - Permite que los casos de uso trabajen con filtros claros y seguros.
 *
 * Qué no hace:
 * - No contiene lógica de negocio ni reglas del dominio.
 * - No ejecuta consultas ni interactúa con la base de datos.
 * - No sustituye a los repositorios ni a los casos de uso; su rol es
 *   preparar criterios de entrada.
 *
 * Convención de nombres:
 * - Prefijo `map...`: indica que transforma datos de un formato externo
 *   (query) a uno interno (criteria).
 * - Sufijo `Criteria`: deja claro que el resultado es un objeto de filtros
 *   o condiciones de búsqueda en el dominio.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: define `SearchCriteria` como contrato tipado.
 * - Application: define schemas de validación para las queries.
 * - Infrastructure/HTTP: mappers convierten queries en criterios.
 * - UseCases: consumen criterios tipados para ejecutar operaciones de negocio.
 */
const mapProcessQueryToCriteria = (query) => {
    return {
        filter: query.filter,
        exclude_ids: (0, query_request_normalizer_1.normalizeToNumberArray)(query.exclude_ids),
        description: (0, query_request_normalizer_1.normalizeToArray)(query.description),
        name: (0, query_request_normalizer_1.normalizeToArray)(query.name),
    };
};
exports.mapProcessQueryToCriteria = mapProcessQueryToCriteria;
