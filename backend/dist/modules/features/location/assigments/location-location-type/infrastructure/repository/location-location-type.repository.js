"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationLocationTypeRepository = void 0;
const location_location_type_orm_1 = require("../orm/location-location-type.orm");
const http_error_1 = __importDefault(require("../../../../../../../shared/errors/http/http-error"));
/**
 * Repository (Infrastructure)
 * ------------------------------------------------------------------
 * Implementación concreta de un contrato de repositorio definido en el dominio.
 * Encapsula todo el acceso a datos y la gestión de transacciones, utilizando
 * la tecnología de persistencia elegida (ORM, SQL, NoSQL, API externa, etc.).
 * Su propósito es proveer a los casos de uso una interfaz estable y tipada
 * para interactuar con la persistencia, manteniendo la separación entre
 * dominio e infraestructura.
 *
 * Diferencia contrato vs implementación:
 * - El dominio define la interfaz (ej. `IRepository`) como contrato abstracto.
 * - La infraestructura implementa ese contrato (ej. `Repository`) con una
 *   tecnología concreta (Sequelize, Prisma, Mongo, etc.).
 * - Los casos de uso consumen únicamente el contrato, nunca la implementación,
 *   garantizando independencia del dominio respecto a la infraestructura.
 *
 * Responsabilidades técnicas:
 * - Implementar las operaciones CRUD declaradas en la interfaz del repositorio.
 * - Convertir registros de infraestructura (ORM, API, etc.) en objetos planos
 *   del dominio mediante funciones de mapeo.
 * - Manejar transacciones explícitas para asegurar atomicidad y consistencia.
 * - Traducir errores de infraestructura a errores semánticos para la aplicación.
 *
 * Qué hace:
 * - Provee métodos de acceso a datos tipados y consistentes.
 * - Asegura que los casos de uso trabajen con tipos puros del dominio.
 * - Encapsula detalles de infraestructura (queries, drivers, conexiones).
 * - Garantiza que el dominio dependa solo de interfaces, no de implementaciones concretas.
 *
 * Qué no hace:
 * - No contiene lógica de negocio ni reglas del dominio.
 * - No representa entidades ni objetos del negocio (eso corresponde a las `Entity`).
 * - No expone directamente detalles técnicos de infraestructura a la capa de aplicación.
 * - No sustituye a los casos de uso; su rol es servir como proveedor de datos.
 *
 * Convención de nombres:
 * - La interfaz lleva prefijo `I` (ej. `IRepository`) para indicar que es un contrato
 *   de comportamiento. La implementación concreta (`Repository`) no lleva prefijo,
 *   porque representa la pieza real de infraestructura.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: define entidades y contratos (`IRepository`).
 * - Infrastructure/Repository: implementa el contrato usando la tecnología de persistencia.
 * - UseCases: consumen el contrato para ejecutar operaciones sobre el dominio.
 * - Orchestrators: invocan casos de uso que a su vez utilizan repositorios.
 */
const mapModelToDomain = (model) => {
    const json = model.toJSON();
    return {
        id: json.id,
        location_id: json.location_id,
        location_type_id: json.location_type_id
    };
};
class LocationLocationTypeRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async () => {
        const rows = await location_location_type_orm_1.LocationLocationTypeModel.findAll({
            attributes: location_location_type_orm_1.LocationLocationTypeModel.getAllFields()
        });
        const rowsMap = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    };
    findById = async (id) => {
        const row = await location_location_type_orm_1.LocationLocationTypeModel.findByPk(id, {
            attributes: location_location_type_orm_1.LocationLocationTypeModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByLocationLocationType = async (location_id, location_type_id) => {
        const row = await location_location_type_orm_1.LocationLocationTypeModel.findOne({
            where: {
                location_id: location_id,
                location_type_id: location_type_id
            },
            attributes: location_location_type_orm_1.LocationLocationTypeModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await location_location_type_orm_1.LocationLocationTypeModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear la asignación del tipo de locación a la locación.");
        return mapModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await location_location_type_orm_1.LocationLocationTypeModel.findByPk(id);
        if (!existing)
            throw new http_error_1.default(404, "La asignación del tipo de locación a la locación que se desea actualizar no fue posible encontrarla.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await location_location_type_orm_1.LocationLocationTypeModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new http_error_1.default(500, "No fue posible actualizar la asignación del tipo de locación a la locación.");
        // 3. Obtener la locación actualizada
        const updated = await location_location_type_orm_1.LocationLocationTypeModel.findByPk(id, {
            attributes: location_location_type_orm_1.LocationLocationTypeModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la asignación del tipo de locación a la locación.");
        return mapModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await location_location_type_orm_1.LocationLocationTypeModel.findByPk(id);
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la asignación del tipo de locación a la locaciónque se pretende eliminar.");
        const deleted = await location_location_type_orm_1.LocationLocationTypeModel.destroy({
            where: { id },
            transaction: tx
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar la asignación del tipo de locación a la locación.");
        return;
    };
}
exports.LocationLocationTypeRepository = LocationLocationTypeRepository;
