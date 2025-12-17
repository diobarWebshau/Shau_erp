"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountRangeRepository = void 0;
const product_discount_range_model_1 = require("../orm/product-discount-range.model");
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
    return {
        id: json.id,
        unit_price: json.unit_price,
        product_id: json.product_id,
        max_qty: json.max_qty,
        min_qty: json.min_qty,
        created_at: json.created_at,
        updated_at: json.created_at
    };
};
class ProductDiscountRangeRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async () => {
        const rows = await product_discount_range_model_1.ProductDiscountRangeModel.findAll({
            attributes: product_discount_range_model_1.ProductDiscountRangeModel.getAllFields()
        });
        const rowsMap = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    };
    findById = async (id) => {
        const row = await product_discount_range_model_1.ProductDiscountRangeModel.findByPk(id, {
            attributes: product_discount_range_model_1.ProductDiscountRangeModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByProductId = async (product_id) => {
        const rows = await product_discount_range_model_1.ProductDiscountRangeModel.findAll({
            where: { product_id: product_id },
            attributes: product_discount_range_model_1.ProductDiscountRangeModel.getAllFields()
        });
        const rowsMap = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data) => {
        const transaction = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created = await product_discount_range_model_1.ProductDiscountRangeModel.create(data, { transaction });
            if (!created)
                throw new http_error_1.default(500, "No fue posible crear la asignación del descuento por rango al producto.");
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
            const existing = await product_discount_range_model_1.ProductDiscountRangeModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "La asignación del descuento por rango al producto que se desea actualizar no fue posible encontrarla.");
            // 2. Aplicar UPDATE
            const [affectedCount] = await product_discount_range_model_1.ProductDiscountRangeModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new http_error_1.default(500, "No fue posible actualizar la asignación del descuento por rango al producto.");
            // 3. Obtener la producto actualizada
            const updated = await product_discount_range_model_1.ProductDiscountRangeModel.findByPk(id, {
                transaction,
                attributes: product_discount_range_model_1.ProductDiscountRangeModel.getAllFields(),
            });
            await transaction.commit();
            if (!updated)
                throw new http_error_1.default(500, "No fue posible actualizar la asignación del descuento por rango al producto.");
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
            const existing = await product_discount_range_model_1.ProductDiscountRangeModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "No se encontro la asignación del descuento por rango al producto que se pretende eliminar.");
            const deleted = await product_discount_range_model_1.ProductDiscountRangeModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted)
                throw new http_error_1.default(500, "No fue posible eliminar la asignación del descuento por rango al producto.");
            await transaction.commit();
            return;
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };
}
exports.ProductDiscountRangeRepository = ProductDiscountRangeRepository;
