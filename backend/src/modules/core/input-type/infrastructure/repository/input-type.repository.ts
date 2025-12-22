// src/modules/Input/infrastructure/repository/Input.repository.ts
import type { InputTypeProps, InputTypeCreateProps, InputTypeUpdateProps } from "../../domain/input-type.types";
import type { IInputTypeRepository } from "../../domain/input-type.repository";
import { InputTypeModel } from "../orm/input-type.orm";
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


function mapModelToDomain(model: InputTypeModel): InputTypeProps {
    const json: InputTypeProps = model.toJSON();
    return {
        id: json.id,
        name: json.name,
        created_at: json.created_at,
        updated_at: json.updated_at,
    };
}

export class InputTypeRepository implements IInputTypeRepository {

    // ================================================================
    // SELECTS
    // ================================================================
    async findAll(): Promise<InputTypeProps[]> {
        const rows: InputTypeModel[] = await InputTypeModel.findAll({
            attributes: InputTypeModel.getAllFields() as ((keyof InputTypeProps)[])
        });
        return rows.map(mapModelToDomain);
    }

    async findById(id: number): Promise<InputTypeProps | null> {
        const row: InputTypeModel | null = await InputTypeModel.findByPk(id, {
            attributes: InputTypeModel.getAllFields() as ((keyof InputTypeProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }

    async findByName(name: string): Promise<InputTypeProps | null> {
        const row: InputTypeModel | null = await InputTypeModel.findOne({
            where: { name },
            attributes: InputTypeModel.getAllFields() as ((keyof InputTypeProps)[])
        });
        return row ? mapModelToDomain(row) : null;
    }

    // ================================================================
    // CREATE
    // ================================================================
    async create(data: InputTypeCreateProps, tx?: Transaction): Promise<InputTypeProps> {
        const created: InputTypeModel | null = await InputTypeModel.create(data, { transaction: tx });
        if (!created) throw new HttpError(500, "No fue posible crear el tipo de insumo.");
        return mapModelToDomain(created);
    }

    // ================================================================
    // UPDATE
    // ================================================================
    async update(id: number, data: InputTypeUpdateProps, tx?: Transaction): Promise<InputTypeProps> {
        // 1. Verificar existencia
        const existing: InputTypeProps | null = await InputTypeModel.findByPk(id);
        if (!existing) throw new HttpError(
            404,
            "El tipo de insumo que se desea actualizar no fue posible encontrarla."
        );
        // 2. Aplicar UPDATE
        const [affectedCount]: [affectedCount: number] = await InputTypeModel.update(data, {
            where: { id },
            transaction: tx
        });
        if (!affectedCount) throw new HttpError(500, "No fue posible actualizar el tipo de insumo.");
        // 3. Obtener la insumo actualizada
        const updated: InputTypeModel | null = await InputTypeModel.findByPk(id, {
            attributes: InputTypeModel.getAllFields() as ((keyof InputTypeProps)[]),
        });
        if (!updated) throw new HttpError(500, "No fue posible actualizar el tipo de insumo.");
        return mapModelToDomain(updated);
    }

    // ================================================================
    // DELETE
    // ================================================================
    async delete(id: number, tx?: Transaction): Promise<void> {
        const existing: InputTypeModel | null = await InputTypeModel.findByPk(id);
        if (!existing) throw new HttpError(
            404,
            "No se encontro el tipo de insumo que se pretende eliminar."
        );
        const deleted: number = await InputTypeModel.destroy({
            where: { id },
            transaction: tx,
        });
        if (!deleted) throw new HttpError(500, "No fue posible eliminar el tipo de insumo.");
        return;
    }
}

export default InputTypeRepository;
