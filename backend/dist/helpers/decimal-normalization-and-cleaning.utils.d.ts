declare function deepNormalizeDecimals<T extends Record<string, unknown>>(data: T, decimalKeys: readonly (keyof T)[]): T;
declare function cleanEmptyObjects<T>(obj: T): T;
export { cleanEmptyObjects, deepNormalizeDecimals, };
