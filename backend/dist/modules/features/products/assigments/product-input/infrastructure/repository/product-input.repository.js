"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInputRepository = void 0;
const product_inputs_orm_1 = require("../orm/product-inputs.orm");
const http_error_1 = __importDefault(require("../../../../../../../shared/errors/http/http-error"));
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
        input_id: json.input_id,
        product_id: json.product_id,
        equivalence: json.equivalence
    };
};
class ProductInputRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async () => {
        const rows = await product_inputs_orm_1.ProductInputModel.findAll({
            attributes: product_inputs_orm_1.ProductInputModel.getAllFields()
        });
        const rowsMap = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    };
    findById = async (id) => {
        const row = await product_inputs_orm_1.ProductInputModel.findByPk(id, {
            attributes: product_inputs_orm_1.ProductInputModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    findByIdProductInput = async (product_id, input_id) => {
        const row = await product_inputs_orm_1.ProductInputModel.findOne({
            where: {
                product_id: product_id,
                input_id: input_id
            },
            attributes: product_inputs_orm_1.ProductInputModel.getAllFields()
        });
        return row ? mapModelToDomain(row) : null;
    };
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data, tx) => {
        const created = await product_inputs_orm_1.ProductInputModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear la asignación del insumo al producto.");
        return mapModelToDomain(created);
    };
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await product_inputs_orm_1.ProductInputModel.findByPk(id);
        if (!existing)
            throw new http_error_1.default(404, "La asignación del insumo al producto que se desea actualizar no fue posible encontrarla.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await product_inputs_orm_1.ProductInputModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new http_error_1.default(500, "No fue posible actualizar la asignación del insumo al producto.");
        // 3. Obtener la producto actualizada
        const updated = await product_inputs_orm_1.ProductInputModel.findByPk(id, {
            attributes: product_inputs_orm_1.ProductInputModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar la asignación del insumo al producto.");
        return mapModelToDomain(updated);
    };
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id, tx) => {
        const existing = await product_inputs_orm_1.ProductInputModel.findByPk(id);
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
