"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRepository = void 0;
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const inventory_orm_1 = require("../orm/inventory.orm");
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
        lead_time: json.lead_time,
        maximum_stock: Number(json.maximum_stock),
        minimum_stock: Number(json.minimum_stock),
        stock: Number(json.stock),
        created_at: json.created_at,
        updated_at: json.updated_at
    };
};
class InventoryRepository {
    findAll = async (tx) => {
        const inventoryResponse = await inventory_orm_1.InventoryModel.findAll({ transaction: tx });
        const inventoryFormmat = inventoryResponse.map(mapModelToDomain);
        return inventoryFormmat;
    };
    findById = async (id, tx) => {
        const inventoryResponse = await inventory_orm_1.InventoryModel.findOne({
            where: { id: id },
            transaction: tx
        });
        if (!inventoryResponse)
            return null;
        const inventoryFormmat = mapModelToDomain(inventoryResponse);
        return inventoryFormmat;
    };
    create = async (data, tx) => {
        const created = await inventory_orm_1.InventoryModel.create(data, { transaction: tx });
        if (!created)
            throw new http_error_1.default(500, "No fue posible crear el nuevo inventario.");
        return mapModelToDomain(created);
    };
    update = async (id, data, tx) => {
        // 1. Verificar existencia
        const existing = await inventory_orm_1.InventoryModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "El inventario que se desea actualizar no fue posible encontrarlo.");
        // 2. Aplicar UPDATE
        const [affectedCount] = await inventory_orm_1.InventoryModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new http_error_1.default(500, "No fue posible actualizar el inventario.");
        // 3. Obtener la locación actualizada
        const updated = await inventory_orm_1.InventoryModel.findByPk(id, {
            transaction: tx,
            attributes: inventory_orm_1.InventoryModel.getAllFields(),
        });
        if (!updated)
            throw new http_error_1.default(500, "No fue posible actualizar el inventario.");
        return mapModelToDomain(updated);
    };
    delete = async (id, tx) => {
        const existing = await inventory_orm_1.InventoryModel.findByPk(id, {
            transaction: tx
        });
        if (!existing)
            throw new http_error_1.default(404, "No se encontro el inventario que se pretende eliminar.");
        const deleted = await inventory_orm_1.InventoryModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted)
            throw new http_error_1.default(500, "No fue posible eliminar el inventario.");
        return;
    };
}
exports.InventoryRepository = InventoryRepository;
