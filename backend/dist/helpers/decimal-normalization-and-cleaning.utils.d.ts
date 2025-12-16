declare function deepNormalizeDecimals<T>(data: T, decimalKeys: readonly string[]): T;
declare function cleanEmptyObjects<T>(obj: T): T;
export { cleanEmptyObjects, deepNormalizeDecimals, };
