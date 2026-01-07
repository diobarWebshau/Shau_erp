import type { ProductCreateProps, ProductUpdateProps, ProductSearchCriteria, ProductProps } from "../../domain/product.types";
import { ProductAttributes, ProductCreateAttributes, ProductModel, ProductUpdateAttributes } from "../orm/product.orm";
import type { IProductRepository } from "../../domain/product.repository.interface";
import { InputProps } from "@src/modules/core/input/domain/input.types";
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

const mapProductModelToDomain = (model: ProductModel): ProductProps => {
    const productAttributes: ProductAttributes = model.toJSON();
    const productDomain: ProductProps = {
        ...productAttributes,
        production_cost: productAttributes.production_cost ? DecimalVO.from(productAttributes.production_cost) : null,
        sale_price: productAttributes.sale_price ? DecimalVO.from(productAttributes.sale_price) : null,
        created_at: (productAttributes.created_at instanceof Date) ? productAttributes.created_at : new Date(productAttributes.created_at),
        updated_at: (productAttributes.updated_at instanceof Date) ? productAttributes.updated_at : new Date(productAttributes.updated_at)
    };
    return productDomain;
};

const mapProductCreateDomainToModel = (data: ProductCreateProps): ProductCreateAttributes => ({
    is_active: data.is_active,
    is_draft: data.is_draft,
    barcode: data.barcode ? data.barcode : null,
    custom_id: data.custom_id ? data.custom_id : null,
    description: data.description ? data.description : null,
    name: data.name ? data.name : null,
    photo: data.photo ? data.photo : null,
    presentation: data.presentation ? data.presentation : null,
    production_cost: data.production_cost ? data.production_cost.toString() : null,
    sale_price: data.sale_price ? data.sale_price.toString() : null,
    sku: data.sku ? data.sku : null,
    storage_conditions: data.storage_conditions ? data.storage_conditions : null,
    type: data.type ? data.type : null,
    unit_of_measure: data.unit_of_measure ? data.unit_of_measure : null
});

const mapProductUpdateModelToDomain = (data: ProductUpdateProps): ProductUpdateAttributes => {
    const { production_cost, sale_price, ...rest } = data;
    return {
        ...rest,
        ...(production_cost !== undefined
            ? { production_cost: production_cost === null ? null : production_cost.toString() }
            : {}),
        ...(sale_price !== undefined
            ? { sale_price: sale_price === null ? null : sale_price.toString() }
            : {}),
    };
};

export class ProductRepository implements IProductRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (query: ProductSearchCriteria, tx?: Transaction): Promise<ProductProps[]> => {
        const { filter, exclude_ids, is_active, ...rest } = query;
        const where: WhereOptions<ProductAttributes> = {
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
                        { description: { [Op.like]: `%${filter}%` } },
                        { custom_id: { [Op.like]: `%${filter}%` } },
                        { presentation: { [Op.like]: `%${filter}%` } },
                        { storage_conditions: { [Op.like]: `%${filter}%` } },
                    ],
                }
                : {}),
        };
        const rows: ProductModel[] = await ProductModel.findAll({
            where,
            transaction: tx,
            attributes: ProductModel.getAllFields() as (keyof ProductAttributes)[],
        });
        return rows.map(pl => mapProductModelToDomain(pl));
    };
    findById = async (id: number, tx?: Transaction): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findByPk(id, {
            transaction: tx,
        });
        return row ? mapProductModelToDomain(row) : null;
    }
    findByName = async (name: string, tx?: Transaction): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findOne({
            transaction: tx,
            where: { name },
        });
        return row ? mapProductModelToDomain(row) : null;
    }
    findByCustomId = async (custom_id: string, tx?: Transaction): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findOne({
            transaction: tx,
            where: { custom_id: custom_id },
        });
        return row ? mapProductModelToDomain(row) : null;
    }
    findBySku = async (sku: string, tx?: Transaction): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findOne({
            transaction: tx,
            where: { sku: sku },
        });
        return row ? mapProductModelToDomain(row) : null;
    }
    findByBarcode = async (barcode: string, tx?: Transaction): Promise<ProductProps | null> => {
        const row: ProductModel | null = await ProductModel.findOne({
            transaction: tx,
            where: { barcode: barcode },
        });
        return row ? mapProductModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductCreateProps, tx?: Transaction): Promise<ProductProps> => {
        const created: ProductModel = await ProductModel.create(mapProductCreateDomainToModel(data), { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el nuevo producto.");
        return mapProductModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: ProductUpdateProps, tx?: Transaction): Promise<ProductProps> => {
        const existing: ProductModel | null = await ProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "El producto que se desea actualizar no fue posible encontrarlo."
        );
        const existingDomain: InputProps = mapProductModelToDomain(existing);
        if (!Object.keys(data).length) return existingDomain;
        // 2. Aplicar UPDATE
        const [affectedCount] = await ProductModel.update(mapProductUpdateModelToDomain(data), {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return existingDomain;
        const updated: ProductModel | null = await ProductModel.findByPk(id, {
            transaction: tx,
            attributes: ProductModel.getAllFields() as ((keyof ProductAttributes)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el producto.");
        return mapProductModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: ProductModel | null = await ProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro el producto que se pretende eliminar."
        );
        const deleted: number = await ProductModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el producto.");
        return;
    }
};