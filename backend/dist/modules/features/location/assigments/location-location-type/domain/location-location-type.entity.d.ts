import type { LocationLocationTypeProps } from "./location-location-type.types";
/**
 * Entity
 * ------------------------------------------------------------------
 * Representa una entidad del dominio dentro de la arquitectura.
 * Encapsula un concepto del negocio con identidad propia y sirve
 * como punto central para contener reglas, comportamientos o invariantes.
 *
 * Función técnica:
 * - Modelar un objeto significativo para la lógica empresarial.
 * - Mantener sus propiedades encapsuladas y accesibles de forma controlada.
 * - Proveer un lugar natural para futuras reglas de negocio, validaciones
 *   o comportamientos específicos.
 * - Garantizar separación entre dominio, infraestructura y presentación.
 *
 * Qué hace:
 * - Define la estructura y la identidad de un concepto del negocio.
 * - Centraliza atributos relevantes y asegura consistencia en su uso.
 * - Actúa como base para extender reglas de dominio sin depender de frameworks.
 *
 * Qué no hace:
 * - No contiene lógica de infraestructura ni detalles técnicos de persistencia.
 * - No depende de ORM, bases de datos o librerías externas.
 * - No sustituye a DTOs ni a UseCases; su propósito es representar el concepto,
 *   no transportar datos ni orquestar operaciones.
 *
 * Convención de nombres:
 * Se nombran con el sufijo `Entity` para dejar claro que pertenecen al dominio
 * y representan un concepto con identidad propia. Esto las diferencia de DTOs
 * (que transportan datos) y de UseCases (que representan acciones del sistema).
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: las entidades viven aquí, modelando los conceptos del negocio.
 * - Features: implementan infraestructura y repositorios que interactúan con ellas.
 * - UseCases: ejecutan operaciones sobre estas entidades.
 * - Orchestrators: exponen endpoints que utilizan entidades y casos de uso
 *   para responder a solicitudes externas.
 */
export declare class LocationLocationTypeEntity {
    private readonly props;
    constructor(props: LocationLocationTypeProps);
    get values(): LocationLocationTypeProps;
}
