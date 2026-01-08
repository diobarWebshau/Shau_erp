import { ProductDiscountRangeAttributes, ProductDiscountRangeCreateAttributes, ProductDiscountRangeModel, ProductDiscountRangeUpdateAttributes } from "../orm/product-discount-range.orm";
import type { ProductDiscountRangeCreateProps, ProductDiscountRangeProps, ProductDiscountRangeUpdateProps } from "../../domain/product-discount-range.types";
import type { IProductDiscountRangeRepository } from "../../domain/product-discount-range.repository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
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

const mapProductDiscountRangeModelToDomain = (model: ProductDiscountRangeModel): ProductDiscountRangeProps => {
    const pdrAttributes: ProductDiscountRangeAttributes = model.toJSON();
    return {
        id: pdrAttributes.id,
        unit_price: DecimalVO.from(pdrAttributes.unit_price),
        product_id: pdrAttributes.product_id,
        max_qty: DecimalVO.from(pdrAttributes.max_qty),
        min_qty: DecimalVO.from(pdrAttributes.min_qty),
        created_at: pdrAttributes.created_at instanceof Date ? pdrAttributes.created_at : new Date(pdrAttributes.created_at),
        updated_at: pdrAttributes.created_at instanceof Date ? pdrAttributes.created_at : new Date(pdrAttributes.created_at)
    };
};

const mapProductDiscountRangeCreateDomainToModel = (data: ProductDiscountRangeCreateProps): ProductDiscountRangeCreateAttributes => {
    return ({
        ...data,
        max_qty: data.max_qty.toString(),
        min_qty: data.min_qty.toString(),
        unit_price: data.unit_price.toString(),
    })
};

const mapProductDiscountRangeUpdateDomainToModel = (data: ProductDiscountRangeUpdateProps): ProductDiscountRangeUpdateAttributes => {
    const { max_qty, min_qty, unit_price, ...rest } = data;
    return ({
        ...rest,
        ...(
            max_qty !== undefined
                ? { max_qty: max_qty?.toString() }
                : {}
        ),
        ...(
            min_qty !== undefined
                ? { min_qty: min_qty?.toString() }
                : {}
        ),
        ...(
            unit_price !== undefined
                ? { unit_price: unit_price?.toString() }
                : {}
        )
    })
};

export class ProductDiscountRangeRepository implements IProductDiscountRangeRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (tx?: Transaction): Promise<ProductDiscountRangeProps[]> => {
        const rows: ProductDiscountRangeModel[] = await ProductDiscountRangeModel.findAll({
            transaction: tx,
        });
        const rowsMap: ProductDiscountRangeProps[] = rows.map((r) => mapProductDiscountRangeModelToDomain(r));
        return rowsMap;
    }
    findById = async (id: number, tx?: Transaction): Promise<ProductDiscountRangeProps | null> => {
        const row: ProductDiscountRangeModel | null = await ProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        return row ? mapProductDiscountRangeModelToDomain(row) : null;
    }

    findByProductId = async (product_id: number, tx?: Transaction): Promise<ProductDiscountRangeProps[]> => {
        const rows: ProductDiscountRangeModel[] = await ProductDiscountRangeModel.findAll({
            transaction: tx,
            where: { product_id: product_id },
        });
        const rowsMap: ProductDiscountRangeProps[] = rows.map((r) => mapProductDiscountRangeModelToDomain(r));
        return rowsMap;
    };

    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductDiscountRangeCreateProps, tx?: Transaction): Promise<ProductDiscountRangeProps> => {
        const created: ProductDiscountRangeModel = await ProductDiscountRangeModel.create(mapProductDiscountRangeCreateDomainToModel(data), { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear la asignación del descuento por rango al producto.");
        return mapProductDiscountRangeModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: ProductDiscountRangeUpdateProps, tx?: Transaction): Promise<ProductDiscountRangeProps> => {
        // 1. Verificar existencia
        const existing: ProductDiscountRangeModel | null = await ProductDiscountRangeModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "La asignación del descuento por rango al producto que se desea actualizar no fue posible encontrarla."
        );
        const existingDomain = mapProductDiscountRangeModelToDomain(existing);
        if (Object.keys(existing).length) return existingDomain;
        const [affectedCount] = await ProductDiscountRangeModel.update(mapProductDiscountRangeUpdateDomainToModel(data), {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return existingDomain;
        const updated: ProductDiscountRangeModel | null = await ProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la asignación del descuento por rango al producto.");
        return mapProductDiscountRangeModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: ProductDiscountRangeModel | null = await ProductDiscountRangeModel.findByPk(id, {
            transaction: tx,
        });
        if (!existing) throw new HttpError(404,
            "No se encontro la asignación del descuento por rango al producto que se pretende eliminar."
        );
        const deleted: number = await ProductDiscountRangeModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar la asignación del descuento por rango al producto.");
        return;
    }
}
