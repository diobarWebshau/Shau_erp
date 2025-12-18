/**
 * StorageContext (Domain)
 * ------------------------------------------------------------------
 * Define los CONTEXTOS DE ALMACENAMIENTO válidos dentro del ERP.
 *
 * Representa una abstracción de dominio que identifica PARA QUÉ
 * agregado o módulo de negocio se está almacenando un archivo.
 *
 * Función técnica:
 * - Actuar como contrato tipado entre las capas del sistema.
 * - Evitar el uso de strings libres o inferencias desde rutas HTTP.
 * - Garantizar que solo contextos válidos del dominio puedan
 *   participar en operaciones de almacenamiento.
 *
 * Qué hace:
 * - Define explícitamente los contextos permitidos.
 * - Sirve como base para políticas de almacenamiento.
 * - Permite que el dominio controle el significado del upload.
 *
 * Qué no hace:
 * - No define rutas físicas.
 * - No conoce Multer ni Express.
 * - No decide cómo ni dónde se almacenan los archivos.
 *
 * Convención de nombres:
 * Se usa el término "Context" porque representa el CONTEXTO DE NEGOCIO
 * del almacenamiento, no un detalle técnico ni una acción.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Domain: define conceptos puros del sistema.
 * - Application: consume este tipo para resolver decisiones.
 * - Infrastructure: lo usa indirectamente para ejecutar almacenamiento.
 */
export type StorageContext = "products" | "inputs" | "shipping-orders";
