import type { InputCreateProps, InputProps, InputUpdateProps, InputSearchCriteria } from "../../domain/input.types";
import type { IInputRepository } from "../../domain/input.repository.interface";
import { Op, Transaction, WhereOptions } from "sequelize";
import HttpError from "@shared/errors/http/http-error";
import { InputModel } from "../orm/input.orm";

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

const mapModelToDomain = (model: InputModel): InputProps => {
    const json: InputProps = model.toJSON();
    return {
        id: json.id,
        custom_id: json.custom_id,
        name: json.name,
        description: json.description,
        presentation: json.presentation,
        unit_of_measure: json.unit_of_measure,
        storage_conditions: json.storage_conditions,
        barcode: json.barcode,
        sku: json.sku,
        photo: json.photo,
        is_draft: json.is_draft,
        created_at: json.created_at,
        updated_at: json.updated_at,
        input_types_id: json.input_types_id,
        is_active: json.is_active,
        supplier: json.supplier,
        unit_cost: json.unit_cost
    };
}

export class InputRepository implements IInputRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query: InputSearchCriteria, tx?: Transaction): Promise<InputProps[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<InputProps> = {
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
        const rows: InputModel[] = await InputModel.findAll({
            where,
            transaction: tx,
            attributes: InputModel.getAllFields() as (keyof InputProps)[],
        });
        return rows.map(pl => mapModelToDomain(pl));
    };
    findById = async (id: number, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findByPk(id, {
            transaction: tx,
            attributes: InputModel.getAllFields() as ((keyof InputProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByName = async (name: string, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findOne({
            where: { name },
            transaction: tx,
            attributes: InputModel.getAllFields() as ((keyof InputProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByCustomId = async (custom_id: string, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findOne({
            where: { custom_id: custom_id },
            transaction: tx,
            attributes: InputModel.getAllFields() as ((keyof InputProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findBySku = async (sku: string, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findOne({
            where: { sku: sku },
            transaction: tx,
            attributes: InputModel.getAllFields() as ((keyof InputProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByBarcode = async (barcode: string, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findOne({
            where: { barcode: barcode },
            transaction: tx,
            attributes: InputModel.getAllFields() as ((keyof InputProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: InputCreateProps, tx?: Transaction): Promise<InputProps> => {
        const created: InputModel = await InputModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el nuevo insumo.");
        return mapModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: InputUpdateProps, tx?: Transaction): Promise<InputProps> => {
        // 1. Verificar existencia
        const existing: InputModel | null = await InputModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El insumo que se desea actualizar no fue posible encontrarlo."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await InputModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new HttpError(500, "No fue posible actualizar el insumo.");
        // 3. Obtener la locación actualizada
        const updated: InputModel | null = await InputModel.findByPk(id, {
            transaction: tx,
            attributes: InputModel.getAllFields() as ((keyof InputProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el insumo.");
        return mapModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: InputModel | null = await InputModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro el insumo que se pretende eliminar."
        );
        const deleted: number = await InputModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el insumo.");
        return;
    }
}

