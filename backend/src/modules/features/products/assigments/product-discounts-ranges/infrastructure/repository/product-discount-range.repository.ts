import type { ProductDiscountRangeCreateProps, ProductDiscountRangeProps, ProductDiscountRangeUpdateProps } from "../../domain/product-discount-range.types";
import type { IProductDiscountRangeRepository } from "../../domain/product-discount-range.repository.interface";
import { ProductDiscountRangeModel } from "../orm/product-discount-range.model";
import HttpError from "@shared/errors/http/http-error";
import { sequelize } from "@config/mysql/sequelize";
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

const mapModelToDomain = (model: ProductDiscountRangeModel): ProductDiscountRangeProps => {
    const json: ProductDiscountRangeProps = model.toJSON();
    return {
        id: json.id,
        unit_price: json.unit_price,
        product_id: json.product_id,
        max_qty: json.max_qty,
        min_qty: json.max_qty,
        created_at: json.created_at,
        updated_at: json.created_at
    };
};

export class ProductDiscountRangeRepository implements IProductDiscountRangeRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (): Promise<ProductDiscountRangeProps[]> => {
        const rows: ProductDiscountRangeModel[] = await ProductDiscountRangeModel.findAll({
            attributes: ProductDiscountRangeModel.getAllFields() as ((keyof ProductDiscountRangeProps)[])
        });
        const rowsMap: ProductDiscountRangeProps[] = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    }
    findById = async (id: string): Promise<ProductDiscountRangeProps | null> => {
        const row: ProductDiscountRangeModel | null = await ProductDiscountRangeModel.findByPk(id, {
            attributes: ProductDiscountRangeModel.getAllFields() as ((keyof ProductDiscountRangeProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductDiscountRangeCreateProps): Promise<ProductDiscountRangeProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created: ProductDiscountRangeModel = await ProductDiscountRangeModel.create(data, { transaction });
            if (!created) throw new HttpError(500, "No fue posible crear la asignación del descuento por rango al producto.");
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
    update = async (id: string, data: ProductDiscountRangeUpdateProps): Promise<ProductDiscountRangeProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            // 1. Verificar existencia
            const existing: ProductDiscountRangeModel | null = await ProductDiscountRangeModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "La asignación del descuento por rango al producto que se desea actualizar no fue posible encontrarla."
            );
            // 2. Aplicar UPDATE
            const [affectedCount]: [affectedCount: number] = await ProductDiscountRangeModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new HttpError(500, "No fue posible actualizar la asignación del descuento por rango al producto.");
            // 3. Obtener la producto actualizada
            const updated: ProductDiscountRangeModel | null = await ProductDiscountRangeModel.findByPk(id, {
                transaction,
                attributes: ProductDiscountRangeModel.getAllFields() as ((keyof ProductDiscountRangeProps)[]),
            });
            await transaction.commit();
            if (!updated) throw new HttpError(500, "No fue posible actualizar la asignación del descuento por rango al producto.");
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
            const existing: ProductDiscountRangeModel | null = await ProductDiscountRangeModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "No se encontro la asignación del descuento por rango al producto que se pretende eliminar."
            );
            const deleted: number = await ProductDiscountRangeModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted) throw new HttpError(500, "No fue posible eliminar la asignación del descuento por rango al producto.");
            await transaction.commit();
            return;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
