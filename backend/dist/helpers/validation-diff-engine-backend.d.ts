export type ObjectMap = Record<string, unknown>;
export interface DiffOpts {
    ignore?: readonly string[];
    dateFields?: readonly string[];
    objectFields?: readonly string[];
}
/** Determina si value es un ObjectMap */
export declare function isObjectMap(value: unknown): value is ObjectMap;
/** Normaliza id → string (para backend) */
export declare function normalizeId(id: unknown): string | null;
/** Convierte a array de manera segura */
export declare function toArraySafe<T>(v: unknown): readonly T[];
/**
 * Normaliza fechas a ISO, si el campo está en opts.dateFields.
 * Si no puede parsear, retorna el valor original.
 */
export declare function normalizeMaybeDate(key: string, value: unknown, opts: DiffOpts): unknown;
/**
 * Devuelve un objeto con las propiedades modificadas.
 * Si no hay cambios, retorna {}.
 */
export declare function diffObjects(a: unknown, b: unknown, opts?: DiffOpts): Promise<ObjectMap>;
export interface ArrayDiff<T> {
    added: readonly T[];
    deleted: readonly T[];
    modified: readonly T[];
}
/**
 * diffArrayEntities
 * Requiere:
 *   - Cada entidad debe tener un id (num o string)
 *   - Orden NO importa
 */
export declare function diffArrayEntities<T extends {
    id: unknown;
}>(oldArr: readonly T[], newArr: readonly T[], opts?: DiffOpts): Promise<ArrayDiff<T>>;
export declare function deepDiff(a: unknown, b: unknown, opts?: DiffOpts): Promise<ObjectMap>;
