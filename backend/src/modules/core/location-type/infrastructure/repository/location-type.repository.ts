// src/modules/location/infrastructure/repository/location.repository.ts
import type { LocationTypeProps, LocationTypeCreateProps, LocationTypeUpdateProps } from "../../domain/location-type.types";
import type { ILocationTypeRepository } from "../../domain/location-type.repository";
import { LocationTypeModel } from "../orm/location-type.orm";
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


function mapModelToDomain(model: LocationTypeModel): LocationTypeProps {
    const json: LocationTypeProps = model.toJSON();
    return {
        id: json.id,
        name: json.name,
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
}

export class LocationTypeRepository implements ILocationTypeRepository {

    // ================================================================
    // SELECTS
    // ================================================================
    async findAll(): Promise<LocationTypeProps[]> {
        const rows: LocationTypeModel[] = await LocationTypeModel.findAll({
            attributes: LocationTypeModel.getAllFields() as ((keyof LocationTypeProps)[])
        });
        return rows.map(mapModelToDomain);
    }

    async findById(id: number): Promise<LocationTypeProps | null> {
        const row: LocationTypeModel | null = await LocationTypeModel.findByPk(id, {
            attributes: LocationTypeModel.getAllFields() as ((keyof LocationTypeProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }

    async findByName(name: string): Promise<LocationTypeProps | null> {
        const row: LocationTypeModel | null = await LocationTypeModel.findOne({
            where: { name },
            attributes: LocationTypeModel.getAllFields() as ((keyof LocationTypeProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }

    // ================================================================
    // CREATE
    // ================================================================
    async create(data: LocationTypeCreateProps, tx?: Transaction): Promise<LocationTypeProps> {
        const created: LocationTypeModel | null = await LocationTypeModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el tipo de locación.");
        return mapModelToDomain(created);
    }

    // ================================================================
    // UPDATE
    // ================================================================
    async update(id: number, data: LocationTypeUpdateProps, tx?: Transaction): Promise<LocationTypeProps> {
        const existing: LocationTypeProps | null = await LocationTypeModel.findByPk(id);
        if (!existing) throw new HttpError(
            404,
            "El tipo de locación que se desea actualizar no fue posible encontrarla."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await LocationTypeModel.update(data, {
            where: { id },
            transaction: tx,
        });
        if (!affectedCount) throw new HttpError(500, "No fue posible actualizar el tipo de locación.");
        // 3. Obtener la locación actualizada
        const updated: LocationTypeModel | null = await LocationTypeModel.findByPk(id, {
            attributes: LocationTypeModel.getAllFields() as ((keyof LocationTypeProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el tipo de locación.");
        return mapModelToDomain(updated);
    }

    // ================================================================
    // DELETE
    // ================================================================
    async delete(id: number, tx?: Transaction): Promise<void> {
        const existing: LocationTypeModel | null = await LocationTypeModel.findByPk(id, {transaction: tx});
        if (!existing) throw new HttpError(
            404,
            "No se encontro el tipo de locación que se pretende eliminar."
        );
        const deleted: number = await LocationTypeModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el tipo de locación.");
        return;
    }
}

export default LocationTypeRepository;
