"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductProcessRepository = void 0;
const product_process_orm_1 = require("../orm/product-process.orm");
const http_error_1 = __importDefault(require("../../../../../../../shared/errors/http/http-error"));
const sequelize_1 = require("../../../../../../../config/mysql/sequelize");
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
    console.log(json);
    return {
        id: json.id,
        process_id: json.process_id,
        product_id: json.product_id,
        sort_order: json.sort_order
    };
};
class ProductProcessRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async () => {
        const rows = await product_process_orm_1.ProductProcessModel.findAll({
            attributes: product_process_orm_1.ProductProcessModel.getAllFields()
        });
        const rowsMap = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    };
    findById = async (id) => {
        const row = await product_process_orm_1.ProductProcessModel.findByPk(id, {
            attributes: product_process_orm_1.ProductProcessModel.getAllFields()
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
            const created = await product_process_orm_1.ProductProcessModel.create(data, { transaction });
            if (!created)
                throw new http_error_1.default(500, "No fue posible crear la asignación del proceso al producto.");
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
            const existing = await product_process_orm_1.ProductProcessModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "La asignación del proceso al producto que se desea actualizar no fue posible encontrarla.");
            // 2. Aplicar UPDATE
            const [affectedCount] = await product_process_orm_1.ProductProcessModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new http_error_1.default(500, "No fue posible actualizar la asignación del proceso al producto.");
            // 3. Obtener la producto actualizada
            const updated = await product_process_orm_1.ProductProcessModel.findByPk(id, {
                transaction,
                attributes: product_process_orm_1.ProductProcessModel.getAllFields(),
            });
            await transaction.commit();
            if (!updated)
                throw new http_error_1.default(500, "No fue posible actualizar la asignación del proceso al producto.");
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
            const existing = await product_process_orm_1.ProductProcessModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "No se encontro la asignación del proceso al producto que se pretende eliminar.");
            const deleted = await product_process_orm_1.ProductProcessModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted)
                throw new http_error_1.default(500, "No fue posible eliminar la asignación del proceso al producto.");
            await transaction.commit();
            return;
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };
}
exports.ProductProcessRepository = ProductProcessRepository;
