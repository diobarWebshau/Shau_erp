/**
 * Domain Types
 * ------------------------------------------------------------------
 * Definen las estructuras de datos puras que representan conceptos
 * del negocio dentro de la capa de dominio. Estos tipos no dependen
 * de frameworks, ORM ni librerías de validación; son contratos
 * internos que los casos de uso consumen y manipulan.
 *
 * Función técnica:
 * - Modelar atributos y propiedades relevantes de un concepto del negocio.
 * - Proveer estructuras tipadas para operaciones de creación, actualización
 *   y manipulación de entidades.
 * - Servir como base para DTOs y schemas, garantizando consistencia en
 *   la comunicación entre capas.
 * - Mantener independencia de infraestructura, asegurando que el dominio
 *   sea portable y libre de dependencias externas.
 *
 * Qué hacen:
 * - Representan datos completos del dominio (Props).
 * - Definen subconjuntos de atributos para creación (CreateProps).
 * - Definen subconjuntos de atributos para actualización (UpdateProps).
 * - Actúan como contratos internos que los casos de uso utilizan para
 *   ejecutar operaciones sobre entidades.
 *
 * Qué no hacen:
 * - No contienen lógica de negocio ni validaciones.
 * - No representan entidades con identidad propia (eso corresponde a las Entity).
 * - No gestionan persistencia ni infraestructura.
 * - No sustituyen a los schemas de validación, sino que los complementan
 *   como tipos puros del dominio.
 *
 * Convención de nombres:
 * - `Props`: atributos completos de la entidad en el dominio.
 * - `CreateProps`: atributos permitidos al crear un registro (sin id ni timestamps).
 * - `UpdateProps`: atributos permitidos al actualizar un registro (parcial).
 * Esta convención deja claro el propósito de cada tipo y su relación con
 * el ciclo de vida de los datos.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: los types viven aquí, representando contratos puros del dominio.
 * - Entities: utilizan estos types para encapsular atributos y comportamientos.
 * - UseCases: consumen estos types para definir entradas y salidas de operaciones.
 * - Features: implementaciones de infraestructura transforman datos externos
 *   hacia/desde estos types.
 * - Orchestrators: exponen endpoints que terminan trabajando con DTOs y schemas
 *   derivados de estos tipos.
 */

interface InputProps {
    id: number,
    custom_id?: string | null
    name?: string | null
    description?: string | null,
    sku?: string | null,
    presentation?: string | null,
    unit_of_measure?: string | null,
    storage_conditions?: string | null,
    barcode?: number | null,
    input_types_id?: number | null,
    unit_cost?: number | null,
    supplier?: string | null,
    photo?: string | null,
    is_draft: boolean,
    status: boolean,
    created_at: Date,
    updated_at: Date
};

type InputCreateProps = Omit<InputProps, "id" | "created_at" | "updated_at">;
type InputUpdateProps = Partial<InputCreateProps>;

interface InputSearchCriteria {
    filter?: string,
    exclude_ids?: number[];

    name?: string | string[],
    description?: string | string[],
    sku?: string | string[],
    presentation?: string | string[],
    unit_of_measure?: string | string[],
    barcode?: string | string[],
    custom_id?: string | string[],

    is_draft?: boolean,
    status?: boolean
}

export {
    InputProps,
    InputCreateProps,
    InputUpdateProps,
    InputSearchCriteria
};