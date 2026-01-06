import type { ClientCreateProps, ClientUpdateProps, ClientProps, ClientSearchCriteria } from "../../domain/client.types";
import { ClientModel, ClientAttributes, ClientCreateAttributes, ClientUpdateAttributes } from "../orm/clients.orm";
import type { IClientRepository } from "../../domain/client.repository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import { Op, Transaction, WhereOptions } from "sequelize";
import HttpError from "@shared/errors/http/http-error";

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

const mapClientModelToDomain = (model: ClientModel): ClientProps => {
    const data: ClientAttributes = model.toJSON();
    return {
        ...data,
        credit_limit: (data.credit_limit) ? DecimalVO.from(data.credit_limit) : null,
        created_at: (data.created_at instanceof Date) ? data.created_at : new Date(data.created_at),
        updated_at: (data.updated_at instanceof Date) ? data.updated_at : new Date(data.updated_at)
    };
};

const mapClientCreateDomainToModel = (data: ClientCreateProps): ClientCreateAttributes => ({
    ...data,
    credit_limit: data.credit_limit ? data.credit_limit.toString() : null,
});


const mapClientUpdateDomainToModel = (data: ClientUpdateProps): ClientUpdateAttributes => {
    const { credit_limit, ...rest } = data;
    return {
        ...rest,
        ...(credit_limit !== undefined
            ? { credit_limit: credit_limit === null ? null : credit_limit.toString() }
            : {}),
    };
};

export class ClientRepository implements IClientRepository {
    // ================================================================
    // | SELECTS                                                      |
    // ================================================================
    findAll = async (query: ClientSearchCriteria, tx?: Transaction): Promise<ClientProps[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<ClientAttributes> = {
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
        const rows: ClientModel[] = await ClientModel.findAll({
            where, transaction: tx,
        });
        return rows.map(pl => mapClientModelToDomain(pl));
    };
    findById = async (id: number, tx?: Transaction): Promise<ClientProps | null> => {
        const row: ClientModel | null = await ClientModel.findByPk(id, {
            attributes: ClientModel.getAllFields() as ((keyof ClientAttributes)[]),
            transaction: tx,
        });
        return row ? mapClientModelToDomain(row) : null;
    }
    findByCompanyName = async (company_name: string, tx?: Transaction): Promise<ClientProps | null> => {
        const row: ClientModel | null = await ClientModel.findOne({
            where: { company_name },
            transaction: tx,
        });
        return row ? mapClientModelToDomain(row) : null;
    }
    findByCfdi = async (cfdi: string, tx?: Transaction): Promise<ClientProps | null> => {
        const row: ClientModel | null = await ClientModel.findOne({
            where: { cfdi: cfdi },
            transaction: tx,
        });
        return row ? mapClientModelToDomain(row) : null;
    }
    findByTaxId = async (tax_id: string, tx?: Transaction): Promise<ClientProps | null> => {
        const row: ClientModel | null = await ClientModel.findOne({
            where: { tax_id: tax_id },
            transaction: tx,
        });
        return row ? mapClientModelToDomain(row) : null;
    }
    // ================================================================
    // | CREATE                                                       |
    // ================================================================
    create = async (data: ClientCreateProps, tx?: Transaction): Promise<ClientProps> => {
        const created: ClientModel = await ClientModel.create(mapClientCreateDomainToModel(data), { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el nuevo cliente.");
        return mapClientModelToDomain(created);
    }
    // ================================================================
    // | UPDATE                                                       |
    // ================================================================
    update = async (id: number, data: ClientUpdateProps, tx?: Transaction): Promise<ClientProps> => {
        const existing = await ClientModel.findByPk(id, {
            transaction: tx,
        });
        if (!existing) throw new HttpError(404, "El cliente que se desea actualizar no fue posible encontrarlo.");

        const existingDomain = mapClientModelToDomain(existing);

        if (!Object.keys(data).length) return existingDomain;

        const [affectedCount] = await ClientModel.update(mapClientUpdateDomainToModel(data), {
            where: { id },
            transaction: tx,
        });

        if (!affectedCount) return existingDomain;

        const updated = await ClientModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el cliente.");

        return mapClientModelToDomain(updated);
    };

    // ================================================================
    // | DELETE                                                       |
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: ClientModel | null = await ClientModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro el cliente que se pretende eliminar."
        );
        const deleted: number = await ClientModel.destroy({
            where: { id },
            transaction: tx
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el cliente.");
        return;
    }
}

