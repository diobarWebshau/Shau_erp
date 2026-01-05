import { ProductionLineProductCreateProps, ProductionLineProductProps, ProductionLineProductUpdateProps } from "../../domain/production-line-product.types";
import { IProductionLineProductRepository } from "../../domain/production-line.repository.interface";
import {ProductionLineProductModel} from "../orm/production-line-product.orm";
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

const mapModelToDomain = (model: ProductionLineProductModel): ProductionLineProductProps => {
    const json: ProductionLineProductProps = model.toJSON();
    return {
        id: json.id,
        product_id: json.product_id,
        production_line_id: json.production_line_id
    };
};

export class ProductionLineProductRepository implements IProductionLineProductRepository {
    async findAll(tx?: Transaction): Promise<ProductionLineProductProps[]> {
        const productionLineResponses: ProductionLineProductModel[] = await ProductionLineProductModel.findAll({
            transaction: tx
        });
        const rowsMap = productionLineResponses.map((plp) => mapModelToDomain(plp));
        return rowsMap;
    }
    async findById(id: number, tx?: Transaction): Promise<ProductionLineProductProps | null> {
        const productionLineResponse: ProductionLineProductModel | null = await ProductionLineProductModel.findByPk(id, {
            transaction: tx
        });
        if (productionLineResponse) {
            return mapModelToDomain(productionLineResponse);
        }
        return productionLineResponse;
    }
    async findByProductionLineProduct(production_line_id: number, product_id: number, tx?: Transaction): Promise<ProductionLineProductProps | null> {
        const productionLineResponse: ProductionLineProductModel | null = await ProductionLineProductModel.findOne({
            where: {
                production_line_id: production_line_id,
                product_id: product_id
            },
            transaction: tx
        });
        if (productionLineResponse) {
            return mapModelToDomain(productionLineResponse);
        }
        return productionLineResponse;
    }
    async create(data: ProductionLineProductCreateProps, tx?: Transaction): Promise<ProductionLineProductProps> {
        const created: ProductionLineProductModel = await ProductionLineProductModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear la asignación del producto a la línea de produccion.");
        return mapModelToDomain(created);
    }
    async update(id: number, data: ProductionLineProductUpdateProps, tx?: Transaction): Promise<ProductionLineProductProps> {
        // 1. Verificar existencia
        const existing: ProductionLineProductModel | null = await ProductionLineProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "La asignación del producto hacia la linea de producción que se desea actualizar no fue posible encontrarla."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await ProductionLineProductModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount)
            throw new HttpError(500, "No fue posible actualizar la asignación del insumo al producto.");
        // 3. Obtener la producto actualizada
        const updated: ProductionLineProductModel | null = await ProductionLineProductModel.findByPk(id, {
            attributes: ProductionLineProductModel.getAllFields() as ((keyof ProductionLineProductProps)[]),
            transaction: tx,
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar la asignación del producto hacia la linea de producción.");
        return mapModelToDomain(updated);
    }
    async delete(id: number, tx?: Transaction): Promise<void> {
        const existing: ProductionLineProductModel | null = await ProductionLineProductModel.findByPk(id, {
            transaction: tx
        });
        if (!existing) throw new HttpError(404,
            "No se encontro la asignación del producto hacia la línea de producción que se pretende eliminar."
        );
        const deleted: number = await ProductionLineProductModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar la asignación del producto hacia la línea de producción.");
        return;
    }
}