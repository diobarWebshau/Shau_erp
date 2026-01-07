"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputRepository = void 0;
const input_orm_1 = require("../orm/input.orm");
const sequelize_1 = require("sequelize");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
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
const mapInputModelToDomain = (model) => {
    const inputAttributes = model.toJSON();
    return {
        ...inputAttributes,
        unit_cost: (inputAttributes.unit_cost) ? decimal_vo_1.DecimalVO.from(inputAttributes.unit_cost) : null,
    };
};
const mapInputCreateDomainToModel = (data) => ({
    custom_id: data.custom_id ?? null,
    name: data.name ?? null,
    description: data.description ?? null,
    sku: data.sku ?? null,
    presentation: data.presentation ?? null,
    unit_of_measure: data.unit_of_measure ?? null,
    storage_conditions: data.storage_conditions ?? null,
    barcode: data.barcode ?? null,
    input_types_id: data.input_types_id ?? null,
    supplier: data.supplier ?? null,
    photo: data.photo ?? null,
    unit_cost: data.unit_cost ? data.unit_cost.toString() : null,
    is_draft: data.is_draft,
    is_active: data.is_active,
});
const mapInputUpdateModelToDomain = (data) => {
    const { unit_cost, ...rest } = data;
    return {
        ...rest,
        ...(unit_cost !== undefined
            ? { unit_cost: unit_cost === null ? null : unit_cost.toString() }
            : {}),
    };
};
class InputRepository {
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
                        { custom_id: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { sku: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { description: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { barcode: { [sequelize_1.Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const rows = await input_orm_1.InputModel.findAll({
            where,
            transaction: tx,
        });
        return rows.map(pl => mapInputModelToDomain(pl));
    };
    findById = async (id, tx) => {
        const row = await input_orm_1.InputModel.findByPk(id, {
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    };
    findByName = async (name, tx) => {
        const row = await input_orm_1.InputModel.findOne({
            where: { name },
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    };
    findByCustomId = async (custom_id, tx) => {
        const row = await input_orm_1.InputModel.findOne({
            where: { custom_id: custom_id },
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    };
    findBySku = async (sku, tx) => {
        const row = await input_orm_1.InputModel.findOne({
            where: { sku: sku },
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    };
    findByBarcode = async (barcode, tx) => {
        const row = await input_orm_1.InputModel.findOne({
            where: { barcode: barcode },
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await input_orm_1.InputModel.create(mapInputCreateDomainToModel(data), { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear el nuevo insumo.");
        return mapInputModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await input_orm_1.InputModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El insumo que se desea actualizar no fue posible encontrarlo.");
        const existingDomain = mapInputModelToDomain(existing);
        if (!Object.keys(data).length)
            return existingDomain;
        // 2. Aplicar UPDATE
        const [affectedCount] = await input_orm_1.InputModel.update(mapInputUpdateModelToDomain(data), {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            return existingDomain;
        // 3. Obtener la locación actualizada
        const updated = await input_orm_1.InputModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el insumo.");
        return mapInputModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await input_orm_1.InputModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el insumo que se pretende eliminar.");
        const deleted = await input_orm_1.InputModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el insumo.");
        return;
    };
}
exports.InputRepository = InputRepository;
