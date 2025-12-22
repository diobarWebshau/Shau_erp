import type { ProductInputProcessCreateProps, ProductInputProcessProps, ProductInputProcessUpdateProps } from "../../domain/product-input-process.types";
import type { IProductInputProcessRepository } from "../../domain/product-input-process.repository.interface";
import { ProductInputProcessModel } from "../orm/product-input-process.orm";
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

const mapModelToDomain = (model: ProductInputProcessModel): ProductInputProcessProps => {
    const json: ProductInputProcessProps = model.toJSON();
    return {
        id: json.id,
        product_input_id: json.product_input_id,
        product_process_id: json.product_process_id,
        product_id: json.product_id,
        qty: json.qty
    };
};

export class ProductInputProcessRepository implements IProductInputProcessRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (): Promise<ProductInputProcessProps[]> => {
        const rows: ProductInputProcessModel[] = await ProductInputProcessModel.findAll({
            attributes: ProductInputProcessModel.getAllFields() as ((keyof ProductInputProcessProps)[])
        });
        const rowsMap: ProductInputProcessProps[] = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    }
    findById = async (id: number): Promise<ProductInputProcessProps | null> => {
        const row: ProductInputProcessModel | null = await ProductInputProcessModel.findByPk(id, {
            attributes: ProductInputProcessModel.getAllFields() as ((keyof ProductInputProcessProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }

    findByProductInputProcess = async (product_id: number, product_input_id: number, product_process_id: number): Promise<ProductInputProcessProps | null> => {
        const row: ProductInputProcessModel | null = await ProductInputProcessModel.findOne({
            where: {
                product_id: product_id,
                product_input_id: product_input_id,
                product_process_id: product_process_id
            },
            attributes: ProductInputProcessModel.getAllFields() as ((keyof ProductInputProcessProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }
    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductInputProcessCreateProps, tx?: Transaction): Promise<ProductInputProcessProps> => {
        const created: ProductInputProcessModel = await ProductInputProcessModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible asignar la cantidad de insumos consumidos para este proceso del producto.");
        return mapModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: ProductInputProcessUpdateProps, tx?: Transaction): Promise<ProductInputProcessProps> => {
        // 1. Verificar existencia
        const existing: ProductInputProcessModel | null = await ProductInputProcessModel.findByPk(id);
        if (!existing) throw new HttpError(404,
            "La asignación de la cantidad de insumos consumidos en un proceso del producto, no fue posible encontrarla."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await ProductInputProcessModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new HttpError(500, "No fue posible actualizar la cantidad de insumos consumidos para este proceso del producto.");
        // 3. Obtener la producto actualizada
        const updated: ProductInputProcessModel | null = await ProductInputProcessModel.findByPk(id, {
            attributes: ProductInputProcessModel.getAllFields() as ((keyof ProductInputProcessProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la cantidad de insumos consumidos para este proceso del producto.");
        return mapModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: ProductInputProcessModel | null = await ProductInputProcessModel.findByPk(id);
        if (!existing) throw new HttpError(404,
            "No se encontro la asignación de la cantidad de insumos consumidos para este proceso del producto que se pretende eliminar."
        );
        const deleted: number = await ProductInputProcessModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminarla la asignación de la cantidad de insumos consumidos para este proceso del producto.");
        return;
    }
}
