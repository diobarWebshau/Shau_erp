"use strict";
// Range Conflict Validator (Domain / Application Utility)
// ------------------------------------------------------------------
// Versión que acepta `number` o `DecimalVO` (y null/undefined) sin
// perder tipado estricto, y comparando con semántica decimal cuando aplica.
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRangeConflicts = checkRangeConflicts;
const decimal_vo_1 = require("@shared/domain/value-objects/decimal.vo"); // ajusta la ruta
/**
 * Helper: normaliza cualquier NumericLike a DecimalVO.
 * - null/undefined -> 0 (misma semántica que tu versión original con Number(... ?? 0))
 */
const toDecimal = (v) => {
    if (v === null || v === undefined)
        return decimal_vo_1.DecimalVO.from(0);
    return decimal_vo_1.DecimalVO.from(v instanceof decimal_vo_1.DecimalVO ? v : v);
};
function checkRangeConflicts(ranges, minKey, maxKey) {
    if (ranges.length < 2)
        return null;
    // Normalización + validación individual (min <= max)
    const normalized = ranges.map((r) => {
        const min = toDecimal(r[minKey]);
        const max = toDecimal(r[maxKey]);
        if (min.gt(max)) {
            return { min, max, invalid: true };
        }
        return { min, max, invalid: false };
    });
    if (normalized.some((r) => r.invalid))
        return "invalid_range";
    // Ordenación por min (Decimal)
    const sorted = normalized
        .map(({ min, max }) => ({ min, max }))
        .sort((a, b) => {
        if (a.min.lt(b.min))
            return -1;
        if (a.min.gt(b.min))
            return 1;
        return 0;
    });
    // Comparación secuencial
    for (let i = 0; i < sorted.length - 1; i++) {
        const a = sorted[i];
        const b = sorted[i + 1];
        // 1) Duplicado exacto
        if (a.min.equals(b.min) && a.max.equals(b.max))
            return "duplicate";
        // 2) Traslape: b.min <= a.max
        if (b.min.lte(a.max))
            return "overlap";
    }
    return null;
}
