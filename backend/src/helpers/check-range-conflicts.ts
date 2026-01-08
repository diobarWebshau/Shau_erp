// Range Conflict Validator (Domain / Application Utility)
// ------------------------------------------------------------------
// Versión que acepta `number` o `DecimalVO` (y null/undefined) sin
// perder tipado estricto, y comparando con semántica decimal cuando aplica.

import { DecimalVO } from "@shared/domain/value-objects/decimal.vo"; // ajusta la ruta

type NumericLike = number | DecimalVO | null | undefined;

export type RangeConflict =
    | "invalid_range"
    | "duplicate"
    | "overlap"
    | null;

/**
 * Helper: normaliza cualquier NumericLike a DecimalVO.
 * - null/undefined -> 0 (misma semántica que tu versión original con Number(... ?? 0))
 */
const toDecimal = (v: NumericLike): DecimalVO => {
    if (v === null || v === undefined) return DecimalVO.from(0);
    return DecimalVO.from(v instanceof DecimalVO ? v : v);
};

export function checkRangeConflicts<
    T extends Record<MinKey | MaxKey, NumericLike>,
    MinKey extends keyof T,
    MaxKey extends keyof T
>(
    ranges: readonly T[],
    minKey: MinKey,
    maxKey: MaxKey
): RangeConflict {
    if (ranges.length < 2) return null;

    // Normalización + validación individual (min <= max)
    const normalized = ranges.map((r) => {
        const min = toDecimal(r[minKey]);
        const max = toDecimal(r[maxKey]);

        if (min.gt(max)) {
            return { min, max, invalid: true as const };
        }

        return { min, max, invalid: false as const };
    });

    if (normalized.some((r) => r.invalid)) return "invalid_range";

    // Ordenación por min (Decimal)
    const sorted = normalized
        .map(({ min, max }) => ({ min, max }))
        .sort((a, b) => {
            if (a.min.lt(b.min)) return -1;
            if (a.min.gt(b.min)) return 1;
            return 0;
        });

    // Comparación secuencial
    for (let i = 0; i < sorted.length - 1; i++) {
        const a = sorted[i];
        const b = sorted[i + 1];

        // 1) Duplicado exacto
        if (a.min.equals(b.min) && a.max.equals(b.max)) return "duplicate";

        // 2) Traslape: b.min <= a.max
        if (b.min.lte(a.max)) return "overlap";
    }

    return null;
}
