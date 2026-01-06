import { InventoryAttributes, InventoryCreateAttributes, InventoryModel, InventoryUpdateAttributes } from "../orm/inventory.orm";
import type { InventoryCreateProps, InventoryProps, InventoryUpdateProps } from "../../domain/inventory.types";
import type { IInventoryRepository } from "../../domain/inventory.repository.interface";
import { DecimalVO } from "@shared/domain/value-objects/decimal.vo";
import HttpError from "@shared/errors/http/http-error";
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

const mapInventoryModelToDomain = (model: InventoryModel): InventoryProps => {
    const json: InventoryAttributes = model.toJSON();
    return {
        ...json,
        maximum_stock: DecimalVO.from(json.maximum_stock),
        minimum_stock: DecimalVO.from(json.minimum_stock),
        stock: DecimalVO.from(json.stock),
        created_at: (json.created_at instanceof Date) ? json.created_at : new Date(json.created_at),
        updated_at: (json.updated_at instanceof Date) ? json.updated_at : new Date(json.updated_at)
    };
};

const mapInventoryCreateDomainToModel = (data: InventoryCreateProps): InventoryCreateAttributes => ({
    ...data,
    stock: data.stock.toString(),
    maximum_stock: data.maximum_stock.toString(),
    minimum_stock: data.minimum_stock.toString()
});


const mapInventoryUpdateDomainToModel = (data: InventoryUpdateProps): InventoryUpdateAttributes => {
    const { maximum_stock, minimum_stock, stock, ...rest } = data;
    return {
        ...rest,
        ...(minimum_stock !== undefined
            ? { minimum_stock: minimum_stock.toString() }
            : {}),
        ...(stock !== undefined
            ? { stock: stock.toString() }
            : {}),
        ...(maximum_stock !== undefined
            ? { maximum_stock: maximum_stock.toString() }
            : {}),
    };
};

export class InventoryRepository implements IInventoryRepository {
    findAll = async (tx?: Transaction): Promise<InventoryProps[]> => {
        const inventoryResponse: InventoryModel[] = await InventoryModel.findAll({ transaction: tx });
        const inventoryFormmat: InventoryProps[] = inventoryResponse.map(mapInventoryModelToDomain);
        return inventoryFormmat;
    };
    findById = async (id: number, tx?: Transaction): Promise<InventoryProps | null> => {
        const inventoryResponse: InventoryModel | null = await InventoryModel.findOne({
            where: { id: id },
            transaction: tx
        });
        if (!inventoryResponse) return null;
        const inventoryFormmat: InventoryProps = mapInventoryModelToDomain(inventoryResponse);
        return inventoryFormmat;
    }
    create = async (data: InventoryCreateProps, tx?: Transaction): Promise<InventoryProps> => {
        const created: InventoryModel = await InventoryModel.create(mapInventoryCreateDomainToModel(data), { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el nuevo inventario.");
        return mapInventoryModelToDomain(created);
    }
    update = async (id: number, data: InventoryUpdateProps, tx?: Transaction): Promise<InventoryProps> => {
        // 1. Verificar existencia
        const existing: InventoryModel | null = await InventoryModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El inventario que se desea actualizar no fue posible encontrarlo."
        );

        const existingDomain = mapInventoryModelToDomain(existing);

        if (!Object.keys(data).length) return existingDomain;
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await InventoryModel.update(mapInventoryUpdateDomainToModel(data), {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return existingDomain;
        // 3. Obtener la locación actualizada
        const updated: InventoryModel | null = await InventoryModel.findByPk(id, {
            transaction: tx,
            attributes: InventoryModel.getAllFields() as ((keyof InventoryProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el inventario.");
        return mapInventoryModelToDomain(updated);
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

