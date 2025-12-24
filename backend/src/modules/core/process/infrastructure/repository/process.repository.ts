// src/modules/location/infrastructure/repository/location.repository.ts
import type { ProcessProps, ProcessCreateProps, ProcessUpdateProps, ProcessSearchCriteria } from "../../domain/process.types";
import type { IProcessRepository } from "../../domain/process.repository";
import { ProcessModel } from "../orm/process.orm";
import HttpError from "@shared/errors/http/http-error";
import { Op, Transaction, WhereOptions } from "sequelize";

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


function mapModelToDomain(model: ProcessModel): ProcessProps {
    const json: ProcessProps = model.toJSON();
    return {
        id: json.id,
        name: json.name,
        description: json.description,
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
}

export class ProcessRepository implements IProcessRepository {

    // ================================================================
    // SELECTS
    // ================================================================
    async findAll(query: ProcessSearchCriteria, tx?: Transaction): Promise<ProcessProps[]> {
        const { filter, exclude_ids, ...rest } = query;
        const where: WhereOptions<ProcessProps> = {
            ...(exclude_ids?.length
                ? { id: { [Op.notIn]: exclude_ids } }
                : {}),
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
        const rows: ProcessModel[] = await ProcessModel.findAll({
            where,
            transaction: tx,
            attributes: ProcessModel.getAllFields() as ((keyof ProcessProps)[])
        });
        return rows.map(mapModelToDomain);
    }

    async findById(id: number, tx?: Transaction): Promise<ProcessProps | null> {
        const row: ProcessModel | null = await ProcessModel.findByPk(id, {
            transaction: tx,
            attributes: ProcessModel.getAllFields() as ((keyof ProcessProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }

    async findByName(name: string, tx?: Transaction): Promise<ProcessProps | null> {
        const row: ProcessModel | null = await ProcessModel.findOne({
            where: { name },
            transaction: tx,
            attributes: ProcessModel.getAllFields() as ((keyof ProcessProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }

    // ================================================================
    // CREATE
    // ================================================================
    async create(data: ProcessCreateProps, tx?: Transaction): Promise<ProcessProps> {
        const created: ProcessModel | null = await ProcessModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el tipo de proceso.");
        return mapModelToDomain(created);
    }

    // ================================================================
    // UPDATE
    // ================================================================
    async update(id: number, data: ProcessUpdateProps, tx?: Transaction): Promise<ProcessProps> {
        // 1. Verificar existencia
        const existing: ProcessProps | null = await ProcessModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(
            404,
            "El proceso que se desea actualizar no fue posible encontrarla."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await ProcessModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) throw new HttpError(500, "No fue posible actualizar el proceso.");
        // 3. Obtener la proceso actualizada
        const updated: ProcessModel | null = await ProcessModel.findByPk(id, {
            transaction: tx,
            attributes: ProcessModel.getAllFields() as ((keyof ProcessProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el proceso.");
        return mapModelToDomain(updated);
    }

    // ================================================================
    // DELETE
    // ================================================================
    async delete(id: number, tx?: Transaction): Promise<void> {
        const existing: ProcessModel | null = await ProcessModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(
            404,
            "No se encontro el proceso que se pretende eliminar."
        );
        const deleted: number = await ProcessModel.destroy({
            where: { id },
            transaction: tx
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el proceso.");
        return;
    }
}

export default ProcessRepository;
