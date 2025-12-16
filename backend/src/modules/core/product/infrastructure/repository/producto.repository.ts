import type { ProductCreateProps, ProductProps, ProductUpdateProps, ProductSearchCriteria } from "../../domain/product.types";
import type { IProductRepository } from "../../domain/product.repository.interface";
import { Op, Transaction, WhereOptions } from "sequelize";
import HttpError from "@shared/errors/http/http-error";
import { ProductModel } from "../orm/product.model";
import { sequelize } from "@config/mysql/sequelize";
import ImageHandler from "@helpers/imageHandlerClass";

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

const mapModelToDomain = (model: ProductModel): ProductProps => {
    const json: ProductProps = model.toJSON();
    return {
        id: json.id,
        custom_id: json.custom_id,
        name: json.name,
        type: json.type,
        description: json.description,
        presentation: json.presentation,
        unit_of_measure: json.unit_of_measure,
        production_cost: json.production_cost,
        storage_conditions: json.storage_conditions,
        barcode: json.barcode,
        sku: json.sku,
        sale_price: json.sale_price,
        photo: json.photo,
        is_draft: json.is_draft,
        active: json.active,
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
}

export class ProductRepository implements IProductRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query: ProductSearchCriteria): Promise<ProductProps[]> => {
        const { filter, exclude_ids, active, ...rest } = query;
        const where: WhereOptions<ProductProps> = {
            ...(exclude_ids?.length
                ? { id: { [Op.notIn]: exclude_ids } }
                : {}),
            ...(active !== undefined ? { active } : {}),
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
        const rows: ProductModel[] = await ProductModel.findAll({
            where,
            attributes: ProductModel.getAllFields() as (keyof ProductProps)[],
        });
        return rows.map(pl => mapModelToDomain(pl));
    };
    findById = async (id: string): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findByPk(id, {
            attributes: ProductModel.getAllFields() as ((keyof ProductProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByName = async (name: string): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findOne({
            where: { name },
            attributes: ProductModel.getAllFields() as ((keyof ProductProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByCustomId = async (custom_id: string): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findOne({
            where: { custom_id: custom_id },
            attributes: ProductModel.getAllFields() as ((keyof ProductProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findBySku = async (sku: string): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findOne({
            where: { sku: sku },
            attributes: ProductModel.getAllFields() as ((keyof ProductProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    findByBarcode = async (barcode: string): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findOne({
            where: { barcode: barcode },
            attributes: ProductModel.getAllFields() as ((keyof ProductProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductCreateProps): Promise<ProductProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created: ProductModel = await ProductModel.create(data, { transaction });
            if (!created) throw new HttpError(500, "No fue posible crear el nuevo producto.");
            await transaction.commit();
            return mapModelToDomain(created);
        } catch (err) {
            if (data.photo) await ImageHandler.removeImageIfExists(data.photo);
            await transaction.rollback();
            throw err;
        }
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: string, data: ProductUpdateProps): Promise<ProductProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            // 1. Verificar existencia
            const existing: ProductModel | null = await ProductModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "El producto que se desea actualizar no fue posible encontrarlo."
            );
            // 2. Aplicar UPDATE
            const [affectedCount]: [affectedCount: number] = await ProductModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new HttpError(500, "No fue posible actualizar el producto.");
            // 3. Obtener la locación actualizada
            const updated: ProductModel | null = await ProductModel.findByPk(id, {
                transaction,
                attributes: ProductModel.getAllFields() as ((keyof ProductProps)[]),
            });
            await transaction.commit();
            if (!updated) throw new HttpError(500, "No fue posible actualizar el producto.");
            return mapModelToDomain(updated);
        } catch (err) {
            if (data.photo) await ImageHandler.removeImageIfExists(data.photo);
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
            const existing: ProductModel | null = await ProductModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "No se encontro el producto que se pretende eliminar."
            );
            const deleted: number = await ProductModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted) throw new HttpError(500, "No fue posible eliminar el producto.");
            await transaction.commit();
            return;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}

