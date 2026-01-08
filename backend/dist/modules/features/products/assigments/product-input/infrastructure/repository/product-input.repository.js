"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInputRepository = void 0;
const product_inputs_orm_1 = require("../orm/product-inputs.orm");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
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
const mapProductInputModelToDomain = (model) => {
    const productInputAttr = model.toJSON();
    return {
        ...productInputAttr,
        equivalence: decimal_vo_1.DecimalVO.from(productInputAttr.equivalence)
    };
};
const mapProductInputUpdateDomainToModel = (data) => {
    const { equivalence, ...rest } = data;
    return {
        ...rest,
        ...(equivalence !== undefined
            ? { equivalence: equivalence.toString() }
            : {}),
    };
};
const mapProductInputCreateDomainToModel = (data) => {
    return {
        input_id: data.input_id,
        product_id: data.product_id,
        equivalence: data.equivalence.toString()
    };
};
class ProductInputRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (tx) => {
        const rows = await product_inputs_orm_1.ProductInputModel.findAll({
            transaction: tx,
        });
        const rowsMap = rows.map((r) => mapProductInputModelToDomain(r));
        return rowsMap;
    };
    findById = async (id, tx) => {
        const row = await product_inputs_orm_1.ProductInputModel.findByPk(id, {
            transaction: tx,
        });
        return row ? mapProductInputModelToDomain(row) : null;
    };
    findByIdProductInput = async (product_id, input_id, tx) => {
        const row = await product_inputs_orm_1.ProductInputModel.findOne({
            where: {
                product_id: product_id,
                input_id: input_id
            },
            transaction: tx,
        });
        return row ? mapProductInputModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await product_inputs_orm_1.ProductInputModel.create(mapProductInputCreateDomainToModel(data), { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear la asignación del insumo al producto.");
        return mapProductInputModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        const updateData = mapProductInputUpdateDomainToModel(data);
        // 1. Verificar existencia
        const existing = await product_inputs_orm_1.ProductInputModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "La asignación del insumo al producto que se desea actualizar no fue posible encontrarla.");
        const existingDomain = mapProductInputModelToDomain(existing);
        if (updateData)
            return existingDomain;
        const [affectedCount] = await product_inputs_orm_1.ProductInputModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return existingDomain;
        const updated = await product_inputs_orm_1.ProductInputModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la asignación del insumo al producto.");
        return mapProductInputModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await product_inputs_orm_1.ProductInputModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la asignación del insumo al producto que se pretende eliminar.");
        const deleted = await product_inputs_orm_1.ProductInputModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar la asignación del insumo al producto.");
        return;
    };
}
exports.ProductInputRepository = ProductInputRepository;
