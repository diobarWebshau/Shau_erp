"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRangeConflicts = checkRangeConflicts;
function checkRangeConflicts(ranges, minKey, maxKey) {
    // Un solo rango (o ninguno) nunca puede entrar en conflicto
    if (ranges.length < 2)
        return null;
    /**
     * Normalización + validación individual
     * ------------------------------------------------------------------
     * Se transforma cada rango a una estructura interna homogénea
     * `{ min, max }` y se valida inmediatamente su consistencia
     * interna (min <= max).
     */
    const normalized = ranges.map(r => {
        const min = Number(r[minKey] ?? 0);
        const max = Number(r[maxKey] ?? 0);
        // ❌ Rango inválido a nivel individual
        if (min > max) {
            return { min, max, invalid: true };
        }
        return { min, max, invalid: false };
    });
    // Si existe al menos un rango inválido, se aborta
    if (normalized.some(r => r.invalid)) {
        return "invalid_range";
    }
    /**
     * Ordenación
     * ------------------------------------------------------------------
     * Una vez garantizada la validez individual, los rangos se
     * ordenan por su límite inferior para permitir comparación
     * secuencial.
     */
    const sorted = normalized
        .map(({ min, max }) => ({ min, max }))
        .sort((a, b) => a.min - b.min);
    /**
     * Comparación secuencial
     * ------------------------------------------------------------------
     * Se compara cada rango con el siguiente para detectar:
     * - Duplicados exactos
     * - Traslapes parciales o totales
     */
    for (let i = 0; i < sorted.length - 1; i++) {
        const a = sorted[i];
        const b = sorted[i + 1];
        // 1️⃣ Duplicado exacto
        if (a.min === b.min && a.max === b.max) {
            return "duplicate";
        }
        // 2️⃣ Traslape
        if (b.min <= a.max) {
            return "overlap";
        }
    }
    // Conjunto completamente válido
    return null;
}
