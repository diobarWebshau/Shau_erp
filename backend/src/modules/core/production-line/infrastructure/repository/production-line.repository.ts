import type { ProductionLineCreateProps, ProductionLineProps, ProductionLineUpdateProps } from "../../domain/production-line.types";
import type { IProductionLineRepository } from "../../domain/production-line.repository.interface";
import { ProductionLineModel } from "../orm/production-lines.orm";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

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

const mapModelToDomain = (model: ProductionLineModel): ProductionLineProps => {
    const json: ProductionLineProps = model.toJSON();
    return {
        id: json.id,
        name: json.name,
        custom_id: json.custom_id,
        is_active: Boolean(json.is_active),
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
}

export class ProductionLineRepository implements IProductionLineRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (): Promise<ProductionLineProps[]> => {
        const rows: ProductionLineModel[] = await ProductionLineModel.findAll({
            attributes: ProductionLineModel.getAllFields() as ((keyof ProductionLineProps)[])
        });
        const rowsMap: ProductionLineProps[] = rows.map((pl) => mapModelToDomain(pl));
        return rowsMap;
    }
    findById = async (id: number): Promise<ProductionLineProps | null> => {
        const row: ProductionLineModel | null = await ProductionLineModel.findByPk(id, {
            attributes: ProductionLineModel.getAllFields() as ((keyof ProductionLineProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByName = async (name: string): Promise<ProductionLineProps | null> => {
        const row: ProductionLineModel | null = await ProductionLineModel.findOne({
            where: { name },
            attributes: ProductionLineModel.getAllFields() as ((keyof ProductionLineProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByCustomId = async (custom_id: string): Promise<ProductionLineProps | null> => {
        const row: ProductionLineModel | null = await ProductionLineModel.findOne({
            where: { custom_id },
            attributes: ProductionLineModel.getAllFields() as ((keyof ProductionLineProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductionLineCreateProps, tx?: Transaction): Promise<ProductionLineProps> => {
        const created: ProductionLineModel = await ProductionLineModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear la nueva línea de producción.");
        return mapModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: ProductionLineUpdateProps, tx?: Transaction): Promise<ProductionLineProps> => {
        // 1. Verificar existencia
        const existing: ProductionLineModel | null = await ProductionLineModel.findByPk(id);
        if (!existing) throw new HttpError(404,
            "La línea de producción que se desea actualizar no fue posible encontrarla."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await ProductionLineModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new HttpError(500, "No fue posible actualizar la línea de producción.");
        // 3. Obtener la locación actualizada
        const updated: ProductionLineModel | null = await ProductionLineModel.findByPk(id, {
            transaction: tx,
            attributes: ProductionLineModel.getAllFields() as ((keyof ProductionLineProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la línea de producción actualizada.");
        return mapModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: ProductionLineModel | null = await ProductionLineModel.findByPk(id);
        if (!existing) throw new HttpError(404,
            "No se encontro la línea de producción que se pretende eliminar."
        );
        const deleted: number = await ProductionLineModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar la línea de producción.");
        return;
    }
}

