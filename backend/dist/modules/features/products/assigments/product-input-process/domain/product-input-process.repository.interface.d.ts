import type { ProductInputProcessProps, ProductInputProcessCreateProps, ProductInputProcessUpdateProps } from "./product-input-process.types";
import { Transaction } from "sequelize";
/**
 * IRepository
 * ------------------------------------------------------------------
 * Define el contrato que los casos de uso consumen para interactuar
 * con la capa de persistencia. Es una interfaz que abstrae el acceso
 * a los datos, garantizando que el dominio dependa solo de contratos
 * y nunca de implementaciones concretas como ORM o frameworks.
 *
 * Función técnica:
 * - Actuar como punto de acceso a las operaciones CRUD sobre un concepto del dominio.
 * - Proveer métodos tipados para encontrar, crear, actualizar y eliminar registros.
 * - Encapsular la interacción con la infraestructura, manteniendo al dominio aislado
 *   de detalles técnicos como Sequelize, bases de datos o APIs externas.
 * - Servir como contrato estable que puede tener múltiples implementaciones
 *   (ej. repositorio en memoria, repositorio SQL, repositorio NoSQL).
 *
 * Qué hace:
 * - Define las operaciones disponibles sobre un agregado o entidad.
 * - Garantiza consistencia en los tipos de entrada y salida mediante Props y DTOs.
 * - Permite que los casos de uso trabajen con datos sin conocer la infraestructura.
 * - Facilita pruebas unitarias al poder sustituir la implementación real por mocks.
 *
 * Qué no hace:
 * - No contiene lógica de negocio ni reglas del dominio.
 * - No implementa directamente la persistencia (eso ocurre en la capa de infraestructura).
 * - No decide cómo se almacenan los datos ni qué tecnología se usa.
 * - No sustituye a las entidades ni a los casos de uso; su propósito es proveer acceso.
 *
 * Convención de nombres:
 * Las interfaces que representan contratos de comportamiento llevan el prefijo `I`
 * (ej. `IRepository`, `IService`, `IAdapter`). Esto las distingue de entidades,
 * DTOs o tipos de datos, que no llevan prefijo porque representan estructuras
 * concretas y no contratos. Así, `IRepository` → `Repository` en la implementación.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: define entidades y casos de uso que dependen de interfaces.
 * - IRepository: contrato en el dominio que abstrae la persistencia.
 * - Features: implementa el repositorio real (ej. Sequelize, Prisma, Mongo).
 * - UseCases: consumen el contrato para ejecutar operaciones sobre el dominio.
 * - Orchestrators: invocan casos de uso que a su vez utilizan repositorios.
 */
export interface IProductInputProcessRepository {
    findAll(): Promise<ProductInputProcessProps[]>;
    findById(id: number): Promise<ProductInputProcessProps | null>;
    findByProductInputProcess(product_id: number, product_input_id: number, product_process_id: number): Promise<ProductInputProcessProps | null>;
    create(data: ProductInputProcessCreateProps, tx?: Transaction): Promise<ProductInputProcessProps>;
    update(id: number, data: ProductInputProcessUpdateProps, tx?: Transaction): Promise<ProductInputProcessProps>;
    delete(id: number, tx?: Transaction): Promise<void>;
}
