"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRepository = void 0;
const location_orm_1 = require("../orm/location.orm");
const sequelize_1 = require("sequelize");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
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
const mapLocationModelToDomain = (model) => {
    const locationAttributes = model.toJSON();
    return {
        ...locationAttributes,
        is_active: Boolean(locationAttributes.is_active),
        created_at: locationAttributes.created_at ? locationAttributes.created_at : new Date(locationAttributes.created_at),
        updated_at: locationAttributes.updated_at ? locationAttributes.updated_at : new Date(locationAttributes.updated_at)
    };
};
class LocationRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query, tx) => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where = {
            ...(exclude_ids?.length
                ? { id: { [sequelize_1.Op.notIn]: exclude_ids } }
                : {}),
            ...(is_active !== undefined ? { is_active } : {}),
            ...Object.fromEntries(Object.entries(rest)
                .filter(([, v]) => v !== undefined)
                .map(([k, v]) => [
                k,
                Array.isArray(v) ? { [sequelize_1.Op.notIn]: v } : v,
            ])),
            ...(filter
                ? {
                    [sequelize_1.Op.or]: [
                        { name: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { phone: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { custom_id: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { description: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { state: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { city: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { country: { [sequelize_1.Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const rows = await location_orm_1.LocationModel.findAll({
            where,
            transaction: tx,
        });
        const rowsMap = rows.map((r) => mapLocationModelToDomain(r));
        return rowsMap;
    };
    findById = async (id, tx) => {
        const row = await location_orm_1.LocationModel.findByPk(id, {
            transaction: tx
        });
        return row ? mapLocationModelToDomain(row) : null;
    };
    findByName = async (name, tx) => {
        const row = await location_orm_1.LocationModel.findOne({
            where: { name },
            transaction: tx
        });
        return row ? mapLocationModelToDomain(row) : null;
    };
    findByCustomId = async (custom_id, tx) => {
        const row = await location_orm_1.LocationModel.findOne({
            where: { custom_id },
            transaction: tx,
        });
        return row ? mapLocationModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await location_orm_1.LocationModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear la nueva locación.");
        return mapLocationModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await location_orm_1.LocationModel.findByPk(id, {
            transaction: tx,
        });
        if (!existing)
            throw new http_error_1.default(404, "La locación que se desea actualizar no fue posible encontrarla.");
        const existingDomain = mapLocationModelToDomain(existing);
        if (!Object.keys(data).length)
            return existingDomain;
        // 2. Aplicar UPDATE
        const [affectedCount] = await location_orm_1.LocationModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return existingDomain;
        // 3. Obtener la locación actualizada
        const updated = await location_orm_1.LocationModel.findByPk(id, {
            transaction: tx
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la locación actualizada.");
        return mapLocationModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await location_orm_1.LocationModel.findByPk(id, {
            transaction: tx,
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la locación que se pretende eliminar.");
        const deleted = await location_orm_1.LocationModel.destroy({
            where: { id },
            transaction: tx
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar la locación.");
        return;
    };
}
exports.LocationRepository = LocationRepository;
