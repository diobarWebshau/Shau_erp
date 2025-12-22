"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const sequelize_1 = require("sequelize");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
const clients_orm_1 = require("../orm/clients.orm");
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
        cfdi: json.cfdi,
        city: json.city,
        company_name: json.company_name,
        country: json.country,
        created_at: json.created_at,
        credit_limit: json.credit_limit,
        email: json.email,
        is_active: json.is_active,
        neighborhood: json.neighborhood,
        payment_method: json.payment_method,
        payment_terms: json.payment_terms,
        phone: json.phone,
        state: json.state,
        street: json.street,
        street_number: json.street_number,
        tax_id: json.tax_id,
        tax_regimen: json.tax_regimen,
        updated_at: json.updated_at,
        zip_code: json.zip_code
    };
};
class ClientRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query) => {
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
                        { company_name: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { email: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { tax_id: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { cfdi: { [sequelize_1.Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const rows = await clients_orm_1.ClientModel.findAll({
            where,
            attributes: clients_orm_1.ClientModel.getAllFields(),
        });
        return rows.map(pl => mapModelToDomain(pl));
    };
    findById = async (id) => {
        const row = await clients_orm_1.ClientModel.findByPk(id, {
            attributes: clients_orm_1.ClientModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByCompanyName = async (company_name) => {
        const row = await clients_orm_1.ClientModel.findOne({
            where: { company_name },
            attributes: clients_orm_1.ClientModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByCfdi = async (cfdi) => {
        const row = await clients_orm_1.ClientModel.findOne({
            where: { cfdi: cfdi },
            attributes: clients_orm_1.ClientModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByTaxId = async (tax_id) => {
        const row = await clients_orm_1.ClientModel.findOne({
            where: { tax_id: tax_id },
            attributes: clients_orm_1.ClientModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await clients_orm_1.ClientModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear el nuevo cliente.");
        return mapModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await clients_orm_1.ClientModel.findByPk(id);
        if (!existing)
            throw new http_error_1.default(404, "El cliente que se desea actualizar no fue posible encontrarlo.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await clients_orm_1.ClientModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new http_error_1.default(500, "No fue posible actualizar el cliente.");
        // 3. Obtener la locación actualizada
        const updated = await clients_orm_1.ClientModel.findByPk(id, {
            attributes: clients_orm_1.ClientModel.getAllFields(),
            transaction: tx,
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el cliente.");
        return mapModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await clients_orm_1.ClientModel.findByPk(id);
        if (!existing)
            throw new http_error_1.default(404, "No se encontro la línea de producción que se pretende eliminar.");
        const deleted = await clients_orm_1.ClientModel.destroy({
            where: { id },
            transaction: tx
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el cliente.");
        return;
    };
}
exports.ClientRepository = ClientRepository;
