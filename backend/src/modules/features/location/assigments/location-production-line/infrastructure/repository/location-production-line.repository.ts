import type { LocationProductionLineCreateProps, LocationProductionLineProps, LocationProductionLineUpdateProps } from "../../domain/location-production-line.types";
import type { ILocationProductionLineRepository } from "../../domain/location-production-line.repository.interface";
import { LocationProductionLineModel } from "../orm/location-production-line.orm";
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

const mapModelToDomain = (model: LocationProductionLineModel): LocationProductionLineProps => {
    const json: LocationProductionLineProps = model.toJSON();
    return {
        id: json.id,
        location_id: json.location_id,
        production_line_id: json.production_line_id
    };
}

export class LocationProductionLineRepository implements ILocationProductionLineRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (tx?: Transaction): Promise<LocationProductionLineProps[]> => {
        const rows: LocationProductionLineModel[] = await LocationProductionLineModel.findAll({
            transaction: tx,
            attributes: LocationProductionLineModel.getAllFields() as ((keyof LocationProductionLineProps)[])
        });
        const rowsMap: LocationProductionLineProps[] = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    }
    findById = async (id: number, tx?: Transaction): Promise<LocationProductionLineProps | null> => {
        const row: LocationProductionLineModel | null = await LocationProductionLineModel.findByPk(id, {
            transaction: tx,
            attributes: LocationProductionLineModel.getAllFields() as ((keyof LocationProductionLineProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByIdLocationProductionLine = async (location_id: number, production_line_id: number, tx?: Transaction): Promise<LocationProductionLineProps | null> => {
        const row: LocationProductionLineModel | null = await LocationProductionLineModel.findOne({
            transaction: tx,
            where: {
                location_id: location_id,
                production_line_id: production_line_id
            },
            attributes: LocationProductionLineModel.getAllFields() as ((keyof LocationProductionLineProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: LocationProductionLineCreateProps, tx?: Transaction): Promise<LocationProductionLineProps> => {
        const created: LocationProductionLineModel = await LocationProductionLineModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear la asignación de la línea de producción a la locación.");
        return mapModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: LocationProductionLineUpdateProps, tx?: Transaction): Promise<LocationProductionLineProps> => {
        // 1. Verificar existencia
        const existing: LocationProductionLineModel | null = await LocationProductionLineModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "La asignación de la línea de producción a la locación que se desea actualizar no fue posible encontrarla."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await LocationProductionLineModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new HttpError(500, "No fue posible actualizar la asignación de la línea de producción a la locación.");
        // 3. Obtener la locación actualizada
        const updated: LocationProductionLineModel | null = await LocationProductionLineModel.findByPk(id, {
            transaction: tx,
            attributes: LocationProductionLineModel.getAllFields() as ((keyof LocationProductionLineProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la asignación de la línea de producción a la locación.");
        return mapModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: LocationProductionLineModel | null = await LocationProductionLineModel.findByPk(id, {
            transaction: tx,
        });
        if (!existing) throw new HttpError(404,
            "No se encontro la asignación de la línea de producción a la locacíon que se pretende eliminar."
        );
        const deleted: number = await LocationProductionLineModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar la asignación de la línea de producción a la locación.");
        return;
    }
}
