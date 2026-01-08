"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountRangeRepository = void 0;
const product_discount_range_orm_1 = require("../orm/product-discount-range.orm");
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
const mapProductDiscountRangeModelToDomain = (model) => {
    const pdrAttributes = model.toJSON();
    return {
        id: pdrAttributes.id,
        unit_price: decimal_vo_1.DecimalVO.from(pdrAttributes.unit_price),
        product_id: pdrAttributes.product_id,
        max_qty: decimal_vo_1.DecimalVO.from(pdrAttributes.max_qty),
        min_qty: decimal_vo_1.DecimalVO.from(pdrAttributes.min_qty),
        created_at: pdrAttributes.created_at instanceof Date ? pdrAttributes.created_at : new Date(pdrAttributes.created_at),
        updated_at: pdrAttributes.created_at instanceof Date ? pdrAttributes.created_at : new Date(pdrAttributes.created_at)
    };
};
const mapProductDiscountRangeCreateDomainToModel = (data) => {
    return ({
        ...data,
        max_qty: data.max_qty.toString(),
        min_qty: data.min_qty.toString(),
        unit_price: data.unit_price.toString(),
    });
};
const mapProductDiscountRangeUpdateDomainToModel = (data) => {
    const { max_qty, min_qty, unit_price, ...rest } = data;
    return ({
        ...rest,
        ...(max_qty !== undefined
            ? { max_qty: max_qty?.toString() }
            : {}),
        ...(min_qty !== undefined
            ? { min_qty: min_qty?.toString() }
            : {}),
        ...(unit_price !== undefined
            ? { unit_price: unit_price?.toString() }
            : {})
    });
};
class ProductDiscountRangeRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (tx) => {
        const rows = await product_discount_range_orm_1.ProductDiscountRangeModel.findAll({
            transaction: tx,
        });
        const rowsMap = rows.map((r) => mapProductDiscountRangeModelToDomain(r));
        return rowsMap;
    };
    findById = async (id, tx) => {
        const row = await product_discount_range_orm_1.ProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        return row ? mapProductDiscountRangeModelToDomain(row) : null;
    };
    findByProductId = async (product_id, tx) => {
        const rows = await product_discount_range_orm_1.ProductDiscountRangeModel.findAll({
            transaction: tx,
            where: { product_id: product_id },
        });
        const rowsMap = rows.map((r) => mapProductDiscountRangeModelToDomain(r));
        return rowsMap;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await product_discount_range_orm_1.ProductDiscountRangeModel.create(mapProductDiscountRangeCreateDomainToModel(data), { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear la asignación del descuento por rango al producto.");
        return mapProductDiscountRangeModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await product_discount_range_orm_1.ProductDiscountRangeModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "La asignación del descuento por rango al producto que se desea actualizar no fue posible encontrarla.");
        const existingDomain = mapProductDiscountRangeModelToDomain(existing);
        if (Object.keys(existing).length)
            return existingDomain;
        const [affectedCount] = await product_discount_range_orm_1.ProductDiscountRangeModel.update(mapProductDiscountRangeUpdateDomainToModel(data), {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return existingDomain;
        const updated = await product_discount_range_orm_1.ProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la asignación del descuento por rango al producto.");
        return mapProductDiscountRangeModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await product_discount_range_orm_1.ProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la asignación del descuento por rango al producto que se pretende eliminar.");
        const deleted = await product_discount_range_orm_1.ProductDiscountRangeModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar la asignación del descuento por rango al producto.");
        return;
    };
}
exports.ProductDiscountRangeRepository = ProductDiscountRangeRepository;
