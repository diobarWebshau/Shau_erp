import type { InputCreateProps, InputProps, InputUpdateProps, InputSearchCriteria } from "../../domain/input.types";
import { InputAttributes, InputCreateAttributes, InputModel, InputUpdateAttributes } from "../orm/input.orm";
import type { IInputRepository } from "../../domain/input.repository.interface";
import { Op, Transaction, WhereOptions } from "sequelize";
import HttpError from "@shared/errors/http/http-error";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";

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

const mapInputModelToDomain = (model: InputModel): InputProps => {
    const inputAttributes: InputAttributes = model.toJSON();
    return {
        ...inputAttributes,
        unit_cost: (inputAttributes.unit_cost) ? DecimalVO.from(inputAttributes.unit_cost) : null,
    };
}

const mapInputCreateDomainToModel = (data: InputCreateProps): InputCreateAttributes => ({
    custom_id: data.custom_id ?? null,
    name: data.name ?? null,
    description: data.description ?? null,
    sku: data.sku ?? null,
    presentation: data.presentation ?? null,
    unit_of_measure: data.unit_of_measure ?? null,
    storage_conditions: data.storage_conditions ?? null,
    barcode: data.barcode ?? null,
    input_types_id: data.input_types_id ?? null,
    supplier: data.supplier ?? null,
    photo: data.photo ?? null,
    unit_cost: data.unit_cost ? data.unit_cost.toString() : null,
    is_draft: data.is_draft,
    is_active: data.is_active,
});

const mapInputUpdateModelToDomain = (data: InputUpdateProps): InputUpdateAttributes => {
    const { unit_cost, ...rest } = data;
    return {
        ...rest,
        ...(unit_cost !== undefined
            ? { unit_cost: unit_cost === null ? null : unit_cost.toString() }
            : {}),
    };
};


export class InputRepository implements IInputRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query: InputSearchCriteria, tx?: Transaction): Promise<InputProps[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<InputAttributes> = {
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
                        { name: { [Op.like]: `%${filter}%` } },
                        { custom_id: { [Op.like]: `%${filter}%` } },
                        { sku: { [Op.like]: `%${filter}%` } },
                        { description: { [Op.like]: `%${filter}%` } },
                        { barcode: { [Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const rows: InputModel[] = await InputModel.findAll({
            where,
            transaction: tx,
        });
        return rows.map(pl => mapInputModelToDomain(pl));
    };
    findById = async (id: number, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findByPk(id, {
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    }
    findByName = async (name: string, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findOne({
            where: { name },
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    }
    findByCustomId = async (custom_id: string, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findOne({
            where: { custom_id: custom_id },
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    }
    findBySku = async (sku: string, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findOne({
            where: { sku: sku },
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    }
    findByBarcode = async (barcode: string, tx?: Transaction): Promise<InputProps | null> => {
        const row: InputModel | null = await InputModel.findOne({
            where: { barcode: barcode },
            transaction: tx,
        });
        return row ? mapInputModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: InputCreateProps, tx?: Transaction): Promise<InputProps> => {
        const created: InputModel = await InputModel.create(mapInputCreateDomainToModel(data), { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el nuevo insumo.");
        return mapInputModelToDomain(created);
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
        const existingDomain: InputProps = mapInputModelToDomain(existing);
        if (!Object.keys(data).length) return existingDomain;
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await InputModel.update(mapInputUpdateModelToDomain(data), {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return existingDomain;
        // 3. Obtener la locación actualizada
        const updated: InputModel | null = await InputModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el insumo.");
        return mapInputModelToDomain(updated);
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

