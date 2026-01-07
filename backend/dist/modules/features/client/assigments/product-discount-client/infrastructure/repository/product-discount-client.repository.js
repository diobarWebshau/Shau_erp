"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountClientRepository = void 0;
const product_discount_client_orm_1 = require("../orm/product-discount-client.orm");
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
const mapProductDiscountClientModelToDomain = (model) => {
    const productDiscountClientAttributes = model.toJSON();
    return {
        ...productDiscountClientAttributes,
        discount_percentage: decimal_vo_1.DecimalVO.from(productDiscountClientAttributes.discount_percentage),
        created_at: (productDiscountClientAttributes.created_at instanceof Date)
            ? productDiscountClientAttributes.created_at : new Date(productDiscountClientAttributes.created_at),
        updated_at: (productDiscountClientAttributes.updated_at instanceof Date)
            ? productDiscountClientAttributes.updated_at : new Date(productDiscountClientAttributes.updated_at)
    };
};
const mapProductDiscountClientCreateDomainToModel = (data) => {
    return {
        ...data,
        discount_percentage: data.discount_percentage.toString()
    };
};
const mapProductDiscountClientUpdateDomainToModel = (data) => {
    const { discount_percentage, ...rest } = data;
    return {
        ...rest,
        ...(discount_percentage !== undefined
            ? { discount_percentage: discount_percentage.toString() }
            : {}),
    };
};
class ProductDiscountClientRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (tx) => {
        const rows = await product_discount_client_orm_1.ProductDiscountClientModel.findAll({
            transaction: tx,
            attributes: product_discount_client_orm_1.ProductDiscountClientModel.getAllFields()
        });
        const rowsMap = rows.map((r) => mapProductDiscountClientModelToDomain(r));
        return rowsMap;
    };
    findById = async (id, tx) => {
        const row = await product_discount_client_orm_1.ProductDiscountClientModel.findByPk(id, {
            transaction: tx,
            attributes: product_discount_client_orm_1.ProductDiscountClientModel.getAllFields()
        });
        console.log("diobar");
        return row ? mapProductDiscountClientModelToDomain(row) : null;
    };
    findByClientId = async (client_id, tx) => {
        const rows = await product_discount_client_orm_1.ProductDiscountClientModel.findAll({
            where: { client_id: client_id },
            transaction: tx,
            attributes: product_discount_client_orm_1.ProductDiscountClientModel.getAllFields()
        });
        const rowsMap = rows.map((r) => mapProductDiscountClientModelToDomain(r));
        return rowsMap;
    };
    findByProductClientId = async (product_id, client_id, tx) => {
        const row = await product_discount_client_orm_1.ProductDiscountClientModel.findOne({
            transaction: tx,
            where: { client_id: client_id, product_id: product_id },
            attributes: product_discount_client_orm_1.ProductDiscountClientModel.getAllFields()
        });
        console.log(`row`, row);
        return row ? mapProductDiscountClientModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await product_discount_client_orm_1.ProductDiscountClientModel.create(mapProductDiscountClientCreateDomainToModel(data), { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear la asignación del descuento por rango al producto.");
        return mapProductDiscountClientModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await product_discount_client_orm_1.ProductDiscountClientModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "La asignación del descuento por rango al producto que se desea actualizar no fue posible encontrarla.");
        const existingDomain = mapProductDiscountClientModelToDomain(existing);
        if (Object.keys(data))
            return existingDomain;
        const [affectedCount] = await product_discount_client_orm_1.ProductDiscountClientModel.update(mapProductDiscountClientUpdateDomainToModel(data), {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return existingDomain;
        // 3. Obtener la producto actualizada
        const updated = await product_discount_client_orm_1.ProductDiscountClientModel.findByPk(id, {
            transaction: tx,
            attributes: product_discount_client_orm_1.ProductDiscountClientModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la asignación del descuento del producto para el cliente.");
        return mapProductDiscountClientModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await product_discount_client_orm_1.ProductDiscountClientModel.findByPk(id, {
            transaction: tx,
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la asignación del descuento del producto para el cliente que se pretende eliminar.");
        const deleted = await product_discount_client_orm_1.ProductDiscountClientModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar la asignación del descuento del producto al cliente.");
        return;
    };
}
exports.ProductDiscountClientRepository = ProductDiscountClientRepository;
