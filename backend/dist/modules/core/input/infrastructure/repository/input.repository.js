"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputRepository = void 0;
const sequelize_1 = require("sequelize");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
const input_model_1 = require("../orm/input.model");
const sequelize_2 = require("../../../../../config/mysql/sequelize");
const imageHandlerClass_1 = __importDefault(require("../../../../../helpers/imageHandlerClass"));
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
        description: json.description,
        presentation: json.presentation,
        unit_of_measure: json.unit_of_measure,
        storage_conditions: json.storage_conditions,
        barcode: json.barcode,
        sku: json.sku,
        photo: json.photo,
        is_draft: json.is_draft,
        created_at: json.created_at,
        updated_at: json.updated_at,
        input_types_id: json.input_types_id,
        status: json.status,
        supplier: json.supplier,
        unit_cost: json.unit_cost
    };
};
class InputRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query) => {
        const { filter, exclude_ids, status, ...rest } = query;
        const where = {
            ...(exclude_ids?.length
                ? { id: { [sequelize_1.Op.notIn]: exclude_ids } }
                : {}),
            ...(status !== undefined ? { status } : {}),
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
        const rows = await input_model_1.InputModel.findAll({
            where,
            attributes: input_model_1.InputModel.getAllFields(),
        });
        return rows.map(pl => mapModelToDomain(pl));
    };
    findById = async (id) => {
        const row = await input_model_1.InputModel.findByPk(id, {
            attributes: input_model_1.InputModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByName = async (name) => {
        const row = await input_model_1.InputModel.findOne({
            where: { name },
            attributes: input_model_1.InputModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByCustomId = async (custom_id) => {
        const row = await input_model_1.InputModel.findOne({
            where: { custom_id: custom_id },
            attributes: input_model_1.InputModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findBySku = async (sku) => {
        const row = await input_model_1.InputModel.findOne({
            where: { sku: sku },
            attributes: input_model_1.InputModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByBarcode = async (barcode) => {
        const row = await input_model_1.InputModel.findOne({
            where: { barcode: barcode },
            attributes: input_model_1.InputModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data) => {
        const transaction = await sequelize_2.sequelize.transaction({
            isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created = await input_model_1.InputModel.create(data, { transaction });
            if (!created)
                throw new http_error_1.default(500, "No fue posible crear el nuevo insumo.");
            await transaction.commit();
            return mapModelToDomain(created);
        }
        catch (err) {
            if (data.photo)
                await imageHandlerClass_1.default.removeImageIfExists(data.photo);
            await transaction.rollback();
            throw err;
        }
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data) => {
        const transaction = await sequelize_2.sequelize.transaction({
            isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            // 1. Verificar existencia
            const existing = await input_model_1.InputModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "El insumo que se desea actualizar no fue posible encontrarlo.");
            // 2. Aplicar UPDATE
            const [affectedCount] = await input_model_1.InputModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new http_error_1.default(500, "No fue posible actualizar el insumo.");
            // 3. Obtener la locación actualizada
            const updated = await input_model_1.InputModel.findByPk(id, {
                transaction,
                attributes: input_model_1.InputModel.getAllFields(),
            });
            await transaction.commit();
            if (!updated)
                throw new http_error_1.default(500, "No fue posible actualizar el insumo.");
            return mapModelToDomain(updated);
        }
        catch (err) {
            if (data.photo)
                await imageHandlerClass_1.default.removeImageIfExists(data.photo);
            await transaction.rollback();
            throw err;
        }
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id) => {
        const transaction = await sequelize_2.sequelize.transaction({
            isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const existing = await input_model_1.InputModel.findByPk(id);
            if (!existing)
                throw new http_error_1.default(404, "No se encontro el insumo que se pretende eliminar.");
            const deleted = await input_model_1.InputModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted)
                throw new http_error_1.default(500, "No fue posible eliminar el insumo.");
            await transaction.commit();
            return;
        }
        catch (err) {
            await transaction.rollback();
            throw err;
        }
    };
}
exports.InputRepository = InputRepository;
