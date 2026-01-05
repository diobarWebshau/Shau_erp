import type { InventoryCreateProps, InventoryProps, InventoryUpdateProps } from "../../domain/inventory.types";
import type { IInventoryRepository } from "../../domain/inventory.repository.interface";
import HttpError from "@shared/errors/http/http-error";
import { InventoryModel } from "../orm/inventory.orm";
import type { Transaction } from "sequelize";

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

const mapModelToDomain = (model: InventoryModel): InventoryProps => {
    const json: InventoryProps = model.toJSON();
    return {
        id: json.id,
        lead_time: json.lead_time,
        maximum_stock: Number(json.maximum_stock),
        minimum_stock: Number(json.minimum_stock),
        stock: Number(json.stock),
        created_at: json.created_at,
        updated_at: json.updated_at
    };
}

export class InventoryRepository implements IInventoryRepository {
    findAll = async (tx?: Transaction): Promise<InventoryProps[]> => {
        const inventoryResponse: InventoryModel[] = await InventoryModel.findAll({ transaction: tx });
        const inventoryFormmat: InventoryProps[] = inventoryResponse.map(mapModelToDomain);
        return inventoryFormmat;
    };
    findById = async (id: number, tx?: Transaction): Promise<InventoryProps | null> => {
        const inventoryResponse: InventoryModel | null = await InventoryModel.findOne({
            where: { id: id },
            transaction: tx
        });
        if (!inventoryResponse) return null;
        const inventoryFormmat: InventoryProps = mapModelToDomain(inventoryResponse);
        return inventoryFormmat;
    }
    create = async (data: InventoryCreateProps, tx?: Transaction): Promise<InventoryProps> => {
        const created: InventoryModel = await InventoryModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el nuevo inventario.");
        return mapModelToDomain(created);
    }
    update = async (id: number, data: InventoryUpdateProps, tx?: Transaction): Promise<InventoryProps> => {
        // 1. Verificar existencia
        const existing: InventoryModel | null = await InventoryModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El inventario que se desea actualizar no fue posible encontrarlo."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await InventoryModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new HttpError(500, "No fue posible actualizar el inventario.");
        // 3. Obtener la locación actualizada
        const updated: InventoryModel | null = await InventoryModel.findByPk(id, {
            transaction: tx,
            attributes: InventoryModel.getAllFields() as ((keyof InventoryProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el inventario.");
        return mapModelToDomain(updated);
    }
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: InventoryModel | null = await InventoryModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro el inventario que se pretende eliminar."
        );
        const deleted: number = await InventoryModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el inventario.");
        return;
    }
}

