import { ProductInputAttributes, ProductInputCreateAttributes, ProductInputModel, ProductInputUpdateAttributes } from "../orm/product-inputs.orm";
import type { ProductInputCreateProps, ProductInputProps, ProductInputUpdateProps } from "../../domain/product-input.types";
import type { IProductInputRepository } from "../../domain/product-input.repository.interface";
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

const mapProductInputModelToDomain = (model: ProductInputModel): ProductInputProps => {
    const productInputAttr: ProductInputAttributes = model.toJSON();
    return {
        ...productInputAttr,
        equivalence: DecimalVO.from(productInputAttr.equivalence)
    };
};

const mapProductInputUpdateDomainToModel = (data: ProductInputUpdateProps): ProductInputUpdateAttributes => {
    const { equivalence, ...rest } = data;
    return {
        ...rest,
        ...(
            equivalence !== undefined
                ? { equivalence: equivalence.toString() }
                : {}
        ),
    };
};

const mapProductInputCreateDomainToModel = (data: ProductInputCreateProps): ProductInputCreateAttributes => {
    return {
        input_id: data.input_id,
        product_id: data.product_id,
        equivalence: data.equivalence.toString()
    };
};


export class ProductInputRepository implements IProductInputRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (tx?: Transaction): Promise<ProductInputProps[]> => {
        const rows: ProductInputModel[] = await ProductInputModel.findAll({
            transaction: tx,
        });
        const rowsMap: ProductInputProps[] = rows.map((r) => mapProductInputModelToDomain(r));
        return rowsMap;
    }
    findById = async (id: number, tx?: Transaction): Promise<ProductInputProps | null> => {
        const row: ProductInputModel | null = await ProductInputModel.findByPk(id, {
            transaction: tx,
        });
        return row ? mapProductInputModelToDomain(row) : null;
    }
    findByIdProductInput = async (product_id: number, input_id: number, tx?: Transaction): Promise<ProductInputProps | null> => {
        const row: ProductInputModel | null = await ProductInputModel.findOne({
            where: {
                product_id: product_id,
                input_id: input_id
            },
            transaction: tx,
        });
        return row ? mapProductInputModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductInputCreateProps, tx?: Transaction): Promise<ProductInputProps> => {
        const created: ProductInputModel = await ProductInputModel.create(mapProductInputCreateDomainToModel(data), { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear la asignación del insumo al producto.");
        return mapProductInputModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: ProductInputUpdateProps, tx?: Transaction): Promise<ProductInputProps> => {

        const updateData = mapProductInputUpdateDomainToModel(data);

        // 1. Verificar existencia
        const existing: ProductInputModel | null = await ProductInputModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "La asignación del insumo al producto que se desea actualizar no fue posible encontrarla."
        );
        const existingDomain = mapProductInputModelToDomain(existing);
        if (updateData) return existingDomain;
        const [affectedCount] = await ProductInputModel.update(updateData, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) return existingDomain;
        const updated: ProductInputModel | null = await ProductInputModel.findByPk(id, {
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la asignación del insumo al producto.");
        return mapProductInputModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: ProductInputModel | null = await ProductInputModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro la asignación del insumo al producto que se pretende eliminar."
        );
        const deleted: number = await ProductInputModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar la asignación del insumo al producto.");
        return;
    }
}
