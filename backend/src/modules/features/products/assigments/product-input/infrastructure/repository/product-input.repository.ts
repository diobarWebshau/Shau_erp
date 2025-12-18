import type { ProductInputCreateProps, ProductInputProps, ProductInputUpdateProps } from "../../domain/product-input.types";
import type { IProductInputRepository } from "../../domain/product-input.repository.interface";
import { ProductInputModel } from "../orm/product-inputs.orm";
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

const mapModelToDomain = (model: ProductInputModel): ProductInputProps => {
    const json: ProductInputProps = model.toJSON();
    return {
        id: json.id,
        input_id: json.input_id,
        product_id: json.product_id,
        equivalence: json.equivalence
    };
};

export class ProductInputRepository implements IProductInputRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (): Promise<ProductInputProps[]> => {
        const rows: ProductInputModel[] = await ProductInputModel.findAll({
            attributes: ProductInputModel.getAllFields() as ((keyof ProductInputProps)[])
        });
        const rowsMap: ProductInputProps[] = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    }
    findById = async (id: string): Promise<ProductInputProps | null> => {
        const row: ProductInputModel | null = await ProductInputModel.findByPk(id, {
            attributes: ProductInputModel.getAllFields() as ((keyof ProductInputProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductInputCreateProps): Promise<ProductInputProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            const created: ProductInputModel = await ProductInputModel.create(data, { transaction });
            if (!created) throw new HttpError(500, "No fue posible crear la asignación del insumo al producto.");
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
    update = async (id: string, data: ProductInputUpdateProps): Promise<ProductInputProps> => {
        const transaction: Transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        try {
            // 1. Verificar existencia
            const existing: ProductInputModel | null = await ProductInputModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "La asignación del insumo al producto que se desea actualizar no fue posible encontrarla."
            );
            // 2. Aplicar UPDATE
            const [affectedCount]: [affectedCount: number] = await ProductInputModel.update(data, {
                where: { id },
                transaction,
            });
            if (!affectedCount)
                throw new HttpError(500, "No fue posible actualizar la asignación del insumo al producto.");
            // 3. Obtener la producto actualizada
            const updated: ProductInputModel | null = await ProductInputModel.findByPk(id, {
                transaction,
                attributes: ProductInputModel.getAllFields() as ((keyof ProductInputProps)[]),
            });
            await transaction.commit();
            if (!updated) throw new HttpError(500, "No fue posible actualizar la asignación del insumo al producto.");
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
            const existing: ProductInputModel | null = await ProductInputModel.findByPk(id);
            if (!existing) throw new HttpError(404,
                "No se encontro la asignación del insumo al producto que se pretende eliminar."
            );
            const deleted: number = await ProductInputModel.destroy({
                where: { id },
                transaction,
            });
            if (!deleted) throw new HttpError(500, "No fue posible eliminar la asignación del insumo al producto.");
            await transaction.commit();
            return;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
