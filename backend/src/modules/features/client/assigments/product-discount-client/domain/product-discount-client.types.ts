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

interface ProductDiscountClientProps {
    id: number;
    product_id: number,
    client_id: number,
    discount_percentage: number,
    created_at: Date,
    updated_at: Date
};

type ProductDiscountClientCreateProps = Omit<ProductDiscountClientProps, "id" | "created_at" | "updated_at">;
type ProductDiscountClientUpdateProps = Partial<ProductDiscountClientCreateProps>;

export type {
    ProductDiscountClientProps,
    ProductDiscountClientCreateProps,
    ProductDiscountClientUpdateProps
};
