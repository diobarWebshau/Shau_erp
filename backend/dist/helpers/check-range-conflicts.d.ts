/**
 * Range Conflict Validator (Domain / Application Utility)
 * ------------------------------------------------------------------
 * Función utilitaria genérica y completamente tipada que detecta
 * inconsistencias semánticas en un conjunto de rangos numéricos,
 * incluyendo tanto invalidez individual de rangos como conflictos
 * entre ellos.
 *
 * Los rangos están definidos por un límite inferior (min) y uno
 * superior (max), y son comunes en escenarios como:
 * - Rangos de descuentos
 * - Precios escalonados
 * - Cantidades mínimas
 * - Tramos de tarifas
 * - Thresholds operativos
 *
 * ------------------------------------------------------------------
 * Propósito conceptual
 * ------------------------------------------------------------------
 * Garantizar que un conjunto de rangos:
 * - Sea internamente válido (min <= max)
 * - No contenga rangos duplicados
 * - No contenga rangos traslapados
 *
 * Evitando así estados inválidos o ambiguos dentro del dominio.
 *
 * ------------------------------------------------------------------
 * Diferencia con otras capas
 * ------------------------------------------------------------------
 * - Entity:
 *   No modela identidad ni ciclo de vida.
 *
 * - UseCase:
 *   No coordina flujos ni dependencias externas.
 *
 * - Repository:
 *   No conoce persistencia ni almacenamiento.
 *
 * - Controller / UI:
 *   No conoce HTTP, formularios ni feedback visual.
 *
 * Esta función es **lógica pura**:
 * - Determinística
 * - Sin efectos secundarios
 * - Sin mutaciones
 *
 * ------------------------------------------------------------------
 * Tipado genérico (TypeScript estricto)
 * ------------------------------------------------------------------
 * - `T` representa cualquier objeto que posea dos propiedades
 *   numéricas (o numéricas opcionales).
 * - `MinKey` y `MaxKey` definen dinámicamente qué propiedades
 *   representan el mínimo y el máximo.
 *
 * El contrato de tipos garantiza:
 * - Existencia de las claves
 * - Valores numéricos (`number | null | undefined`)
 *
 * ------------------------------------------------------------------
 * Qué valida
 * ------------------------------------------------------------------
 * 1. Rango inválido: `min > max`
 * 2. Rangos duplicados exactos
 * 3. Rangos traslapados
 *
 * ------------------------------------------------------------------
 * @returns
 * - `"invalid_range"` si existe un rango con `min > max`
 * - `"duplicate"` si existen rangos idénticos
 * - `"overlap"` si existen rangos traslapados
 * - `null` si todo el conjunto es válido
 */
type NumericLike = number | null | undefined;
export type RangeConflict = "invalid_range" | "duplicate" | "overlap" | null;
export declare function checkRangeConflicts<T extends Record<MinKey | MaxKey, NumericLike>, MinKey extends keyof T, MaxKey extends keyof T>(ranges: readonly T[], minKey: MinKey, maxKey: MaxKey): RangeConflict;
export {};
