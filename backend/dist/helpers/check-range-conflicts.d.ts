import { DecimalVO } from "@shared/domain/value-objects/decimal.vo";
type NumericLike = number | DecimalVO | null | undefined;
export type RangeConflict = "invalid_range" | "duplicate" | "overlap" | null;
export declare function checkRangeConflicts<T extends Record<MinKey | MaxKey, NumericLike>, MinKey extends keyof T, MaxKey extends keyof T>(ranges: readonly T[], minKey: MinKey, maxKey: MaxKey): RangeConflict;
export {};
