"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessRepository = void 0;
const process_orm_1 = require("../orm/process.orm");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
const sequelize_1 = require("sequelize");
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
        description: json.description,
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
}
class ProcessRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    async findAll(query, tx) {
        const { filter, exclude_ids, ...rest } = query;
        const where = {
            ...(exclude_ids?.length
                ? { id: { [sequelize_1.Op.notIn]: exclude_ids } }
                : {}),
            ...Object.fromEntries(Object.entries(rest)
                .filter(([, v]) => v !== undefined)
                .map(([k, v]) => [
                k,
                Array.isArray(v) ? { [sequelize_1.Op.notIn]: v } : v,
            ])),
            ...(filter
                ? {
                    [sequelize_1.Op.or]: [
                        { company_name: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { email: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { tax_id: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { cfdi: { [sequelize_1.Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const rows = await process_orm_1.ProcessModel.findAll({
            where,
            transaction: tx,
            attributes: process_orm_1.ProcessModel.getAllFields()
        });
        return rows.map(mapModelToDomain);
    }
    async findById(id, tx) {
        const row = await process_orm_1.ProcessModel.findByPk(id, {
            transaction: tx,
            attributes: process_orm_1.ProcessModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    }
    async findByName(name, tx) {
        const row = await process_orm_1.ProcessModel.findOne({
            where: { name },
            transaction: tx,
            attributes: process_orm_1.ProcessModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    async create(data, tx) {
        const created = await process_orm_1.ProcessModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear el tipo de proceso.");
        return mapModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    async update(id, data, tx) {
        // 1. Verificar existencia
        const existing = await process_orm_1.ProcessModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El proceso que se desea actualizar no fue posible encontrarla.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await process_orm_1.ProcessModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new http_error_1.default(500, "No fue posible actualizar el proceso.");
        // 3. Obtener la proceso actualizada
        const updated = await process_orm_1.ProcessModel.findByPk(id, {
            transaction: tx,
            attributes: process_orm_1.ProcessModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el proceso.");
        return mapModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    async delete(id, tx) {
        const existing = await process_orm_1.ProcessModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el proceso que se pretende eliminar.");
        const deleted = await process_orm_1.ProcessModel.destroy({
            where: { id },
            transaction: tx
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el proceso.");
        return;
    }
}
exports.ProcessRepository = ProcessRepository;
exports.default = ProcessRepository;
