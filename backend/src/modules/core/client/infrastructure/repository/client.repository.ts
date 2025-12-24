import type { ClientCreateProps, ClientProps, ClientUpdateProps, ClientSearchCriteria } from "../../domain/client.types";
import type { IClientRepository } from "../../domain/client.repository.interface";
import { Op, Transaction, WhereOptions } from "sequelize";
import HttpError from "@shared/errors/http/http-error";
import { ClientModel } from "../orm/clients.orm";

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

const mapModelToDomain = (model: ClientModel): ClientProps => {
    const json: ClientProps = model.toJSON();
    return {
        id: json.id,
        cfdi: json.cfdi,
        city: json.city,
        company_name: json.company_name,
        country: json.country,
        created_at: json.created_at,
        credit_limit: json.credit_limit,
        email: json.email,
        is_active: json.is_active,
        neighborhood: json.neighborhood,
        payment_method: json.payment_method,
        payment_terms: json.payment_terms,
        phone: json.phone,
        state: json.state,
        street: json.street,
        street_number: json.street_number,
        tax_id: json.tax_id,
        tax_regimen: json.tax_regimen,
        updated_at: json.updated_at,
        zip_code: json.zip_code
    };
};

export class ClientRepository implements IClientRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query: ClientSearchCriteria, tx?: Transaction): Promise<ClientProps[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<ClientProps> = {
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
            where,
            attributes: ClientModel.getAllFields() as (keyof ClientProps)[],
            transaction: tx,
        });
        return rows.map(pl => mapModelToDomain(pl));
    };
    findById = async (id: number, tx?: Transaction): Promise<ClientProps | null> => {
        const row: ClientModel | null = await ClientModel.findByPk(id, {
            attributes: ClientModel.getAllFields() as ((keyof ClientProps)[]),
            transaction: tx,
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByCompanyName = async (company_name: string, tx?: Transaction): Promise<ClientProps | null> => {
        const row: ClientModel | null = await ClientModel.findOne({
            where: { company_name },
            transaction: tx,
            attributes: ClientModel.getAllFields() as ((keyof ClientProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByCfdi = async (cfdi: string, tx?: Transaction): Promise<ClientProps | null> => {
        const row: ClientModel | null = await ClientModel.findOne({
            where: { cfdi: cfdi },
            transaction: tx,
            attributes: ClientModel.getAllFields() as ((keyof ClientProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByTaxId = async (tax_id: string, tx?: Transaction): Promise<ClientProps | null> => {
        const row: ClientModel | null = await ClientModel.findOne({
            where: { tax_id: tax_id },
            transaction: tx,
            attributes: ClientModel.getAllFields() as ((keyof ClientProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ClientCreateProps, tx?: Transaction): Promise<ClientProps> => {
        const created: ClientModel = await ClientModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el nuevo cliente.");
        return mapModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: ClientUpdateProps, tx?: Transaction): Promise<ClientProps> => {
        // 1. Verificar existencia
        const existing: ClientModel | null = await ClientModel.findByPk(id);
        if (!existing) throw new HttpError(404,
            "El cliente que se desea actualizar no fue posible encontrarlo."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await ClientModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new HttpError(500, "No fue posible actualizar el cliente.");
        // 3. Obtener la locación actualizada
        const updated: ClientModel | null = await ClientModel.findByPk(id, {
            attributes: ClientModel.getAllFields() as ((keyof ClientProps)[]),
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el cliente.");
        return mapModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: ClientModel | null = await ClientModel.findByPk(id);
        if (!existing) throw new HttpError(404,
            "No se encontro la línea de producción que se pretende eliminar."
        );
        const deleted: number = await ClientModel.destroy({
            where: { id },
            transaction: tx
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el cliente.");
        return;
    }
}

