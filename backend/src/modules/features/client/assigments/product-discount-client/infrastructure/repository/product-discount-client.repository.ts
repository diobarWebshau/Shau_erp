import type { ProductDiscountClientCreateProps, ProductDiscountClientProps, ProductDiscountClientUpdateProps } from "../../domain/product-discount-client.types";
import type { IProductDiscountClientRepository } from "../../domain/product-discount-client.repository.interface";
import { ProductDiscountClientModel } from "../orm/product-discount-client.orm";
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

const mapModelToDomain = (model: ProductDiscountClientModel): ProductDiscountClientProps => {
    const json: ProductDiscountClientProps = model.toJSON();
    return {
        id: json.id,
        discount_percentage: json.discount_percentage,
        product_id: json.product_id,
        client_id: json.client_id,
        created_at: json.created_at,
        updated_at: json.created_at
    };
};

export class ProductDiscountClientRepository implements IProductDiscountClientRepository {
    // ================================================================
    // SELECTS
    // ================================================================
    findAll = async (): Promise<ProductDiscountClientProps[]> => {
        const rows: ProductDiscountClientModel[] = await ProductDiscountClientModel.findAll({
            attributes: ProductDiscountClientModel.getAllFields() as ((keyof ProductDiscountClientProps)[])
        });
        const rowsMap: ProductDiscountClientProps[] = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    }
    findById = async (id: number): Promise<ProductDiscountClientProps | null> => {
        const row: ProductDiscountClientModel | null = await ProductDiscountClientModel.findByPk(id, {
            attributes: ProductDiscountClientModel.getAllFields() as ((keyof ProductDiscountClientProps)[])
        });
        console.log("diobar");
        return row ? mapModelToDomain(row) : null;
    }

    findByClientId = async (client_id: number): Promise<ProductDiscountClientProps[]> => {
        const rows: ProductDiscountClientModel[] = await ProductDiscountClientModel.findAll({
            where: { client_id: client_id },
            attributes: ProductDiscountClientModel.getAllFields() as ((keyof ProductDiscountClientProps)[])
        });
        const rowsMap: ProductDiscountClientProps[] = rows.map((r) => mapModelToDomain(r));
        return rowsMap;
    }

    findByProductClientId = async (product_id: number, client_id: number): Promise<ProductDiscountClientProps | null> => {
        const row: ProductDiscountClientModel | null = await ProductDiscountClientModel.findOne({
            where: { client_id: client_id, product_id: product_id },
            attributes: ProductDiscountClientModel.getAllFields() as ((keyof ProductDiscountClientProps)[])
        });
        console.log(`row`, row);
        return row ? mapModelToDomain(row) : null;
    }

    // ================================================================
    // CREATE
    // ================================================================
    create = async (data: ProductDiscountClientCreateProps, tx?: Transaction): Promise<ProductDiscountClientProps> => {
        const created: ProductDiscountClientModel = await ProductDiscountClientModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear la asignación del descuento por rango al producto.");
        return mapModelToDomain(created);
    }
    // ================================================================
    // UPDATE
    // ================================================================
    update = async (id: number, data: ProductDiscountClientUpdateProps, tx?: Transaction): Promise<ProductDiscountClientProps> => {
        // 1. Verificar existencia
        const existing: ProductDiscountClientModel | null = await ProductDiscountClientModel.findByPk(id);
        if (!existing) throw new HttpError(404,
            "La asignación del descuento por rango al producto que se desea actualizar no fue posible encontrarla."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await ProductDiscountClientModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new HttpError(500, "No fue posible actualizar la asignación del descuento del producto para el cliente.");
        // 3. Obtener la producto actualizada
        const updated: ProductDiscountClientModel | null = await ProductDiscountClientModel.findByPk(id, {
            attributes: ProductDiscountClientModel.getAllFields() as ((keyof ProductDiscountClientProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la asignación del descuento del producto para el cliente.");
        return mapModelToDomain(updated);
    }
    // ================================================================
    // DELETE
    // ================================================================
    delete = async (id: number, tx?: Transaction): Promise<void> => {
        const existing: ProductDiscountClientModel | null = await ProductDiscountClientModel.findByPk(id);
        if (!existing) throw new HttpError(404,
            "No se encontro la asignación del descuento del producto para el cliente que se pretende eliminar."
        );
        const deleted: number = await ProductDiscountClientModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar la asignación del descuento del producto al cliente.");
        return;
    }
}
