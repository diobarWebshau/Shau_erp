"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputTypeRepository = void 0;
const input_type_orm_1 = require("../orm/input-type.orm");
const http_error_1 = __importDefault(require("../../../../../shared/errors/http/http-error"));
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
function mapModelToDomain(model) {
    const json = model.toJSON();
    return {
        id: json.id,
        name: json.name,
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
}
class InputTypeRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    async findAll(tx) {
        const rows = await input_type_orm_1.InputTypeModel.findAll({
            attributes: input_type_orm_1.InputTypeModel.getAllFields(),
            transaction: tx
        });
        return rows.map(mapModelToDomain);
    }
    ;
    async findById(id, tx) {
        const row = await input_type_orm_1.InputTypeModel.findByPk(id, {
            attributes: input_type_orm_1.InputTypeModel.getAllFields(),
            transaction: tx
        });
        return row ? mapModelToDomain(row) : null;
    }
    ;
    async findByName(name, tx) {
        const row = await input_type_orm_1.InputTypeModel.findOne({
            where: { name },
            attributes: input_type_orm_1.InputTypeModel.getAllFields(),
            transaction: tx
        });
        return row ? mapModelToDomain(row) : null;
    }
    ;
    // ================================================================
    // CREATE
    // ================================================================
    async create(data, tx) {
        const created = await input_type_orm_1.InputTypeModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear el tipo de insumo.");
        return mapModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    async update(id, data, tx) {
        // 1. Verificar existencia
        const existing = await input_type_orm_1.InputTypeModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El tipo de insumo que se desea actualizar no fue posible encontrarla.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await input_type_orm_1.InputTypeModel.update(data, {
            where: { id },
            transaction: tx
        });
        if (!affectedCount)
            throw new http_error_1.default(500, "No fue posible actualizar el tipo de insumo.");
        // 3. Obtener la insumo actualizada
        const updated = await input_type_orm_1.InputTypeModel.findByPk(id, {
            attributes: input_type_orm_1.InputTypeModel.getAllFields(),
            transaction: tx
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el tipo de insumo.");
        return mapModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    async delete(id, tx) {
        const existing = await input_type_orm_1.InputTypeModel.findByPk(id, {
            transaction: tx,
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el tipo de insumo que se pretende eliminar.");
        const deleted = await input_type_orm_1.InputTypeModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el tipo de insumo.");
        return;
    }
}
exports.InputTypeRepository = InputTypeRepository;
;
exports.default = InputTypeRepository;
