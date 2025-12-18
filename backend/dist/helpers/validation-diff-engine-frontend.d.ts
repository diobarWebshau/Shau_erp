type ObjectMap = Record<string, unknown>;
interface DiffOpts {
    keys?: string[];
    ignore?: string[];
    nullUndefEqual?: boolean;
    coerceNumberStrings?: boolean;
    objectKeyById?: string[];
}
type ChildOfParent<TParent, TChildKey extends keyof TParent> = TParent[TChildKey] extends Array<infer U> ? (U & {
    id?: unknown;
}) : never;
type ObjectDiff = Record<string, unknown>;
declare function diffObjects(a: unknown, b: unknown, opts?: DiffOpts): Promise<ObjectDiff>;
interface ArrayDiff<TItem> {
    added: TItem[];
    modified: TItem[];
    deleted: TItem[];
}
declare function normalizeArrayDiffById<TItem extends {
    id?: unknown;
}>(diff: ArrayDiff<TItem>): ArrayDiff<TItem>;
declare function diffObjectArrays<TChild extends {
    id?: unknown;
}>(arr1: readonly TChild[], arr2: readonly TChild[], opts?: DiffOpts): Promise<ArrayDiff<TChild>>;
interface ManagerField<TChild> {
    added: TChild[];
    modified: TChild[];
    deleted: TChild[];
}
type Augmented<TParent extends ObjectMap, ManagerKey extends string, TChild> = TParent & Partial<Record<ManagerKey, ManagerField<TChild>>>;
interface ParentWithChildDiffSingle<TParent extends ObjectMap, TChild, ManagerKey extends string> {
    added: Array<Augmented<TParent, ManagerKey, TChild>>;
    deleted: TParent[];
    modified: Array<Augmented<TParent, ManagerKey, TChild>>;
}
declare function diffObjectArraysWithChildSingle<TParent extends ObjectMap, TChildKey extends keyof TParent, ManagerKey extends string>(arr1: readonly TParent[], arr2: readonly TParent[], options: {
    childKey: TChildKey;
    managerKey: ManagerKey;
    parentDiffOpts?: DiffOpts;
    childDiffOpts?: DiffOpts;
}): Promise<ParentWithChildDiffSingle<TParent, ChildOfParent<TParent, TChildKey>, ManagerKey>>;
interface MultiManagerConfig<TParent extends ObjectMap, TChildKey extends keyof TParent, ManagerKey extends string> {
    childKey: TChildKey;
    managerKey: ManagerKey;
    childDiffOpts?: DiffOpts;
}
interface ParentWithChildDiffMulti<TParent extends ObjectMap, ManagerKey extends string> {
    added: Array<TParent & Partial<Record<ManagerKey, unknown>>>;
    deleted: TParent[];
    modified: Array<TParent & Partial<Record<ManagerKey, unknown>>>;
}
declare function diffObjectArraysWithChildMulti<TParent extends ObjectMap, ManagerKey extends string>(arr1: readonly TParent[], arr2: readonly TParent[], configs: ReadonlyArray<MultiManagerConfig<TParent, keyof TParent, ManagerKey>>, parentDiffOpts?: DiffOpts): Promise<ParentWithChildDiffMulti<TParent, ManagerKey>>;
interface ChildConfig<TParent extends ObjectMap, TChildKey extends keyof TParent, ManagerKey extends string, TChild extends ChildOfParent<TParent, TChildKey> = ChildOfParent<TParent, TChildKey>> {
    childKey: TChildKey;
    managerKey: ManagerKey;
    childDiffOpts?: DiffOpts;
    children?: readonly ChildConfig<TChild, keyof TChild & string, string>[];
}
type ChildConfigRoot<TParent extends ObjectMap> = ChildConfig<TParent, keyof TParent & string, string, ChildOfParent<TParent, keyof TParent & string>>;
interface ParentWithChildrenDiff<TParent extends ObjectMap> {
    added: TParent[];
    deleted: TParent[];
    modified: TParent[];
}
declare function diffObjectArraysWithChildren<TParent extends ObjectMap, Configs extends readonly ChildConfigRoot<TParent>[]>(arr1: readonly TParent[], arr2: readonly TParent[], configs: Configs, parentDiffOpts?: DiffOpts): Promise<ParentWithChildrenDiff<TParent>>;
declare function deepDiff(a: unknown, b: unknown, opts?: DiffOpts): Promise<ObjectDiff>;
declare class ChildConfigBuilder<TParent extends ObjectMap, TChildKey extends keyof TParent, ManagerKey extends string, TChild extends ChildOfParent<TParent, TChildKey>> {
    private readonly cfg;
    constructor(childKey: TChildKey, managerKey: ManagerKey);
    /**
     * Establecer opciones de diff para este nivel
     */
    diffOptions(opts: DiffOpts): this;
    /**
     * Agregar configuraciones de hijos (subniveles)
     */
    children<SubKey extends keyof TChild & string, SubManager extends string>(...children: readonly ChildConfig<TChild, SubKey, SubManager, ChildOfParent<TChild, SubKey>>[]): this;
    /**
     * Finaliza y retorna el ChildConfig resultante
     */
    build(): ChildConfig<TParent, TChildKey, ManagerKey, TChild>;
}
declare class ChildConfigRootBuilder<TParent extends ObjectMap> {
    private readonly configs;
    /**
     * Agregar un nivel raíz
     */
    add<Key extends keyof TParent & string, Manager extends string>(childKey: Key, managerKey: Manager, configure?: (builder: ChildConfigBuilder<TParent, Key, Manager, ChildOfParent<TParent, Key>>) => void): this;
    /**
     * Finaliza y retorna el arreglo de configs
     */
    build(): readonly ChildConfigRoot<TParent>[];
}
declare function createChildConfigRoot<TParent extends ObjectMap>(): ChildConfigRootBuilder<TParent>;
export { diffObjects, deepDiff, diffObjectArrays, normalizeArrayDiffById, diffObjectArraysWithChildSingle, diffObjectArraysWithChildMulti, diffObjectArraysWithChildren, createChildConfigRoot, ChildConfigRootBuilder, ChildConfigBuilder, };
export type { DiffOpts, ArrayDiff, ManagerField, Augmented, ParentWithChildDiffSingle, MultiManagerConfig, ParentWithChildDiffMulti, ChildConfig, ChildConfigRoot, ParentWithChildrenDiff, ObjectMap, ChildOfParent, };
