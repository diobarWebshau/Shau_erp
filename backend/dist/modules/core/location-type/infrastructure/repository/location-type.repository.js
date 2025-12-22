"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationTypeRepository = void 0;
const location_type_orm_1 = require("../orm/location-type.orm");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
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
function mapModelToDomain(model) {
    const json = model.toJSON();
    return {
        id: json.id,
        name: json.name,
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
}
class LocationTypeRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    async findAll() {
        const rows = await location_type_orm_1.LocationTypeModel.findAll({
            attributes: location_type_orm_1.LocationTypeModel.getAllFields()
        });
        return rows.map(mapModelToDomain);
    }
    async findById(id) {
        const row = await location_type_orm_1.LocationTypeModel.findByPk(id, {
            attributes: location_type_orm_1.LocationTypeModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    }
    async findByName(name) {
        const row = await location_type_orm_1.LocationTypeModel.findOne({
            where: { name },
            attributes: location_type_orm_1.LocationTypeModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    async create(data, tx) {
        const created = await location_type_orm_1.LocationTypeModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear el tipo de locación.");
        return mapModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    async update(id, data, tx) {
        const existing = await location_type_orm_1.LocationTypeModel.findByPk(id);
        if (!existing)
            throw new http_error_1.default(404, "El tipo de locación que se desea actualizar no fue posible encontrarla.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await location_type_orm_1.LocationTypeModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new http_error_1.default(500, "No fue posible actualizar el tipo de locación.");
        // 3. Obtener la locación actualizada
        const updated = await location_type_orm_1.LocationTypeModel.findByPk(id, {
            attributes: location_type_orm_1.LocationTypeModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el tipo de locación.");
        return mapModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    async delete(id, tx) {
        const existing = await location_type_orm_1.LocationTypeModel.findByPk(id, { transaction: tx });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el tipo de locación que se pretende eliminar.");
        const deleted = await location_type_orm_1.LocationTypeModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el tipo de locación.");
        return;
    }
}
exports.LocationTypeRepository = LocationTypeRepository;
exports.default = LocationTypeRepository;
