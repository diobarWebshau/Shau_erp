import type { LocationCreateProps, LocationProps, LocationUpdateProps } from "../../domain/location.types";
import type { ILocationRepository } from "../../domain/location.repository.interface";
import HttpError from "@shared/errors/http/http-error";
import { LocationModel } from "../orm/location.model";
import { sequelize } from "@config/mysql/sequelize";
import { Op, Transaction, WhereOptions } from "sequelize";
import { ClientSearchCriteria } from "@src/modules/core/client/domain/client.types";

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

const mapModelToDomain = (model: LocationModel): LocationProps => {
    const json: LocationProps = model.toJSON();
    return {
        id: json.id,
        name: json.name,
        description: json.description,
        custom_id: json.custom_id,
        phone: json.phone,
        street: json.street,
        street_number: json.street_number,
        neighborhood: json.neighborhood,
        city: json.city,
        state: json.state,
        country: json.country,
        zip_code: json.zip_code,
        production_capacity: json.production_capacity,
        location_manager: json.location_manager,
        is_active: Boolean(json.is_active),
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
}

export class LocationRepository implements ILocationRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query: ClientSearchCriteria): Promise<LocationProps[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<LocationProps> = {
            ...(exclude_ids?.length
                ? { id: { [Op.notIn]: exclude_ids } }
                : {}),
            ...(is_active !== undefined ? { is_active } : {}),
            ...Object.fromEntries(
                Object.entries(rest)
                    .filter(([, v]) => v !== undefined)
                    .map(([k, v]) => [
                        k,
                        Array.isArray(v) ? { [Op.notIn]: v } : v,
                    ])
            ),
            ...(filter
                ? {
                    [Op.or]: [
                        { company_name: { [Op.like]: `%${filter}%` } },
                        { email: { [Op.like]: `%${filter}%` } },
                        { tax_id: { [Op.like]: `%${filter}%` } },
                        { cfdi: { [Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const rows: LocationModel[] = await LocationModel.findAll({
            where,
            attributes: LocationModel.getAllFields() as ((keyof LocationProps)[])
        });
        const rowsMap: LocationProps[] = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    }
    findById = async (id: string): Promise<LocationProps | null> => {
        const row: LocationModel | null = await LocationModel.findByPk(id, {
            attributes: LocationModel.getAllFields() as ((keyof LocationProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByName = async (name: string): Promise<LocationProps | null> => {
        const row: LocationModel | null = await LocationModel.findOne({
            where: { name },
            attributes: LocationModel.getAllFields() as ((keyof LocationProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByCustomId = async (custom_id: string): Promise<LocationProps | null> => {
        const row: LocationModel | null = await LocationModel.findOne({
            where: { custom_id },
            attributes: LocationModel.getAllFields() as ((keyof LocationProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: LocationCreateProps): Promise<LocationProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created: LocationModel = await LocationModel.create(data, { transaction });
            if (!created) throw new HttpError(500, "No fue posible crear la nueva locación.");
            await transaction.commit();
            return mapModelToDomain(created);
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: string, data: LocationUpdateProps): Promise<LocationProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            // 1. Verificar existencia
            const existing: LocationModel | null = await LocationModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "La locación que se desea actualizar no fue posible encontrarla."
            );
            // 2. Aplicar UPDATE
            const [affectedCount]: [affectedCount: number] = await LocationModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new HttpError(500, "No fue posible actualizar la locación.");
            // 3. Obtener la locación actualizada
            const updated: LocationModel | null = await LocationModel.findByPk(id, {
                transaction,
                attributes: LocationModel.getAllFields() as ((keyof LocationProps)[]),
            });
            await transaction.commit();
            if (!updated) throw new HttpError(500, "No fue posible actualizar la locación actualizada.");
            return mapModelToDomain(updated);
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: string): Promise<void> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const existing: LocationModel | null = await LocationModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "No se encontro la locación que se pretende eliminar."
            );
            const deleted: number = await LocationModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted) throw new HttpError(500, "No fue posible eliminar la locación.");
            await transaction.commit();
            return;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
