import type { IInventoryQueryRepository } from "../../domain/inventory-query.repository.interface";
import { InventoryQueryProps, InventorySearchQueryProp } from "../../domain/inventory-query.types";
import { QueryTypes, type Transaction } from "sequelize";
import { sequelize } from "@config/mysql/sequelize";

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

type InventoryQueryPropsRaw = { inventories: InventoryQueryProps[] }
type InventoryQueryByIdPropsRaw = { inventory: InventoryQueryProps }
type WrapperInventoryQueryPropsRaw = {
    0: InventoryQueryPropsRaw
}

type WrapperInventoryQueryByIdPropsRaw = {
    0: InventoryQueryByIdPropsRaw
}

export class InventoryQueryRepository implements IInventoryQueryRepository {
    findAll = async (tx?: Transaction): Promise<InventoryQueryProps[]> => {
        const inventoryQueryResponse: WrapperInventoryQueryPropsRaw[] = await sequelize.query(
            'CALL getInventoryAllLocations();',
            { type: QueryTypes.SELECT, transaction: tx }
        );
        const raw: InventoryQueryPropsRaw | undefined = inventoryQueryResponse.shift()?.[0];
        if (!raw) return [];
        const response: InventoryQueryProps[] = raw.inventories;
        return response;
    };
    findByInventoryId = async (inventory_id: number, tx?: Transaction) => {
        const inventoryQueryResponse: WrapperInventoryQueryByIdPropsRaw[] = await sequelize.query(
            "CALL getInventoryOnLocationById(:inventory_id);",
            {
                type: QueryTypes.SELECT,
                replacements: { inventory_id: inventory_id },
                transaction: tx
            }
        );
        const raw: InventoryQueryByIdPropsRaw | undefined = inventoryQueryResponse.shift()?.[0];
        if (!raw) return null;
        const response: InventoryQueryProps = raw.inventory;
        return response;
    };
    findAllLikeTo = async (query: InventorySearchQueryProp, tx?: Transaction): Promise<InventoryQueryProps[]> => {
        const inventoryQueryResponse: WrapperInventoryQueryPropsRaw[] = await sequelize.query(
            "CALL getInventoryAllLocationsToLike(:search);",
            {
                type: QueryTypes.SELECT,
                transaction: tx,
                replacements: { search: query?.filter.trim() || null },
            }
        );
        const raw: InventoryQueryPropsRaw | undefined = inventoryQueryResponse.shift()?.[0];
        if (!raw) return [];
        const response: InventoryQueryProps[] = raw.inventories;
        return response;
    }
};

