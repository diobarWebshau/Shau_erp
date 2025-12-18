import type { ProductProcessCreateProps, ProductProcessProps, ProductProcessUpdateProps } from "../../domain/product-process.types";
import type { IProductProcessRepository } from "../../domain/product-process.repository.interface";
import { ProductProcessModel } from "../orm/product-process.orm";
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

const mapModelToDomain = (model: ProductProcessModel): ProductProcessProps => {
    const json: ProductProcessProps = model.toJSON();
    console.log(json);
    return {
        id: json.id,
        process_id: json.process_id,
        product_id: json.product_id,
        sort_order: json.sort_order
    };
};

export class ProductProcessRepository implements IProductProcessRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (): Promise<ProductProcessProps[]> => {
        const rows: ProductProcessModel[] = await ProductProcessModel.findAll({
            attributes: ProductProcessModel.getAllFields() as ((keyof ProductProcessProps)[])
        });
        const rowsMap: ProductProcessProps[] = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    }
    findById = async (id: string): Promise<ProductProcessProps | null> => {
        const row: ProductProcessModel | null = await ProductProcessModel.findByPk(id, {
            attributes: ProductProcessModel.getAllFields() as ((keyof ProductProcessProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductProcessCreateProps): Promise<ProductProcessProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created: ProductProcessModel = await ProductProcessModel.create(data, { transaction });
            if (!created) throw new HttpError(500, "No fue posible crear la asignación del proceso al producto.");
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
    update = async (id: string, data: ProductProcessUpdateProps): Promise<ProductProcessProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            // 1. Verificar existencia
            const existing: ProductProcessModel | null = await ProductProcessModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "La asignación del proceso al producto que se desea actualizar no fue posible encontrarla."
            );
            // 2. Aplicar UPDATE
            const [affectedCount]: [affectedCount: number] = await ProductProcessModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new HttpError(500, "No fue posible actualizar la asignación del proceso al producto.");
            // 3. Obtener la producto actualizada
            const updated: ProductProcessModel | null = await ProductProcessModel.findByPk(id, {
                transaction,
                attributes: ProductProcessModel.getAllFields() as ((keyof ProductProcessProps)[]),
            });
            await transaction.commit();
            if (!updated) throw new HttpError(500, "No fue posible actualizar la asignación del proceso al producto.");
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
            const existing: ProductProcessModel | null = await ProductProcessModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "No se encontro la asignación del proceso al producto que se pretende eliminar."
            );
            const deleted: number = await ProductProcessModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted) throw new HttpError(500, "No fue posible eliminar la asignación del proceso al producto.");
            await transaction.commit();
            return;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
