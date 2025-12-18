"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineRepository = void 0;
const production_lines_orm_1 = require("../orm/production-lines.orm");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
const sequelize_1 = require("../../../../../config/mysql/sequelize");
const sequelize_2 = require("sequelize");
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
        name: json.name,
        custom_id: json.custom_id,
        is_active: Boolean(json.is_active),
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
};
class ProductionLineRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async () => {
        const rows = await production_lines_orm_1.ProductionLineModel.findAll({
            attributes: production_lines_orm_1.ProductionLineModel.getAllFields()
        });
        const rowsMap = rows.map((pl) => mapModelToDomain(pl));
        return rowsMap;
    };
    findById = async (id) => {
        const row = await production_lines_orm_1.ProductionLineModel.findByPk(id, {
            attributes: production_lines_orm_1.ProductionLineModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByName = async (name) => {
        const row = await production_lines_orm_1.ProductionLineModel.findOne({
            where: { name },
            attributes: production_lines_orm_1.ProductionLineModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByCustomId = async (custom_id) => {
        const row = await production_lines_orm_1.ProductionLineModel.findOne({
            where: { custom_id },
            attributes: production_lines_orm_1.ProductionLineModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data) => {
        const transaction = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created = await production_lines_orm_1.ProductionLineModel.create(data, { transaction });
            if (!created)
                throw new http_error_1.default(500, "No fue posible crear la nueva línea de producción.");
            await transaction.commit();
            return mapModelToDomain(created);
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data) => {
        const transaction = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            // 1. Verificar existencia
            const existing = await production_lines_orm_1.ProductionLineModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "La línea de producción que se desea actualizar no fue posible encontrarla.");
            // 2. Aplicar UPDATE
            const [affectedCount] = await production_lines_orm_1.ProductionLineModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new http_error_1.default(500, "No fue posible actualizar la línea de producción.");
            // 3. Obtener la locación actualizada
            const updated = await production_lines_orm_1.ProductionLineModel.findByPk(id, {
                transaction,
                attributes: production_lines_orm_1.ProductionLineModel.getAllFields(),
            });
            await transaction.commit();
            if (!updated)
                throw new http_error_1.default(500, "No fue posible actualizar la línea de producción actualizada.");
            return mapModelToDomain(updated);
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id) => {
        const transaction = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const existing = await production_lines_orm_1.ProductionLineModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "No se encontro la línea de producción que se pretende eliminar.");
            const deleted = await production_lines_orm_1.ProductionLineModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted)
                throw new http_error_1.default(500, "No fue posible eliminar la línea de producción.");
            await transaction.commit();
            return;
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };
}
exports.ProductionLineRepository = ProductionLineRepository;
