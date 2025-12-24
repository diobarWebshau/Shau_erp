"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const sequelize_1 = require("sequelize");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
const product_orm_1 = require("../orm/product.orm");
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
        custom_id: json.custom_id,
        name: json.name,
        type: json.type,
        description: json.description,
        presentation: json.presentation,
        unit_of_measure: json.unit_of_measure,
        production_cost: json.production_cost,
        storage_conditions: json.storage_conditions,
        barcode: json.barcode,
        sku: json.sku,
        sale_price: json.sale_price,
        photo: json.photo,
        is_draft: json.is_draft,
        active: json.active,
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
};
class ProductRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query, tx) => {
        const { filter, exclude_ids, active, ...rest } = query;
        const where = {
            ...(exclude_ids?.length
                ? { id: { [sequelize_1.Op.notIn]: exclude_ids } }
                : {}),
            ...(active !== undefined ? { active } : {}),
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
        const rows = await product_orm_1.ProductModel.findAll({
            where,
            transaction: tx,
            attributes: product_orm_1.ProductModel.getAllFields(),
        });
        return rows.map(pl => mapModelToDomain(pl));
    };
    findById = async (id, tx) => {
        const row = await product_orm_1.ProductModel.findByPk(id, {
            transaction: tx,
            attributes: product_orm_1.ProductModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByName = async (name, tx) => {
        const row = await product_orm_1.ProductModel.findOne({
            transaction: tx,
            where: { name },
            attributes: product_orm_1.ProductModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByCustomId = async (custom_id, tx) => {
        const row = await product_orm_1.ProductModel.findOne({
            transaction: tx,
            where: { custom_id: custom_id },
            attributes: product_orm_1.ProductModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findBySku = async (sku, tx) => {
        const row = await product_orm_1.ProductModel.findOne({
            transaction: tx,
            where: { sku: sku },
            attributes: product_orm_1.ProductModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByBarcode = async (barcode, tx) => {
        const row = await product_orm_1.ProductModel.findOne({
            transaction: tx,
            where: { barcode: barcode },
            attributes: product_orm_1.ProductModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await product_orm_1.ProductModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear el nuevo producto.");
        return mapModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        const existing = await product_orm_1.ProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El producto que se desea actualizar no fue posible encontrarlo.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await product_orm_1.ProductModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new http_error_1.default(500, "No fue posible actualizar el producto.");
        // 3. Obtener la locación actualizada
        const updated = await product_orm_1.ProductModel.findByPk(id, {
            transaction: tx,
            attributes: product_orm_1.ProductModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el producto.");
        return mapModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await product_orm_1.ProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el producto que se pretende eliminar.");
        const deleted = await product_orm_1.ProductModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el producto.");
        return;
    };
}
exports.ProductRepository = ProductRepository;
