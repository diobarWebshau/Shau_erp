// * ============================================================
// * 🔵 #MARK:  BLOQUE 1 — Tipos base estrictos + helpers
// * ============================================================

export type ObjectMap = Record<string, unknown>;

export function isObjectMap(value: unknown): value is ObjectMap {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

export interface DiffOpts {
  keys?: string[];
  ignore?: string[];
  nullUndefEqual?: boolean;
  coerceNumberStrings?: boolean;
  objectKeyById?: string[];
}

export const defaultDiffOpts: DiffOpts = {
  nullUndefEqual: true,
  coerceNumberStrings: true,
  objectKeyById: [],
};

export function getId(value: unknown): string | null {
  if (!isObjectMap(value)) return null;
  const raw = value["id"];
  return raw == null ? null : String(raw);
}

export function normalizeScalar(key: string, value: unknown): unknown {
  if (value === null || value === undefined) return value;

  if (key === "delivery_cost") {
    if (typeof value === "string" || typeof value === "number") {
      const num = Number(value);
      return Number.isNaN(num) ? value : num;
    }
  }

  if (
    key === "delivery_date" ||
    key === "shipping_date" ||
    key === "created_at" ||
    key === "updated_at"
  ) {
    try {
      return new Date(String(value)).toISOString();
    } catch {
      return value;
    }
  }

  return value;
}

export function coerceNumberLike(value: unknown, enabled: boolean): unknown {
  if (!enabled) return value;

  if (typeof value === "string" || typeof value === "number") {
    const n = Number(value);
    if (!Number.isNaN(n) && String(n) === String(value)) {
      return n;
    }
  }
  return value;
}

export function toArraySafe<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function stripBase64Prefix(b64: string): string {
  return b64.replace(/^data:.*;base64,/, "");
}

// ============================================================
//  🔥 FUNDAMENTAL PARA BLOQUE 4 Y BLOQUE 5
// ============================================================
// El hijo debe tener id?: unknown para que los managers y diffs funcionen.
export type ChildOfParent<
  TParent,
  TChildKey extends keyof TParent
> =
  TParent[TChildKey] extends Array<infer U>
  ? (U & { id?: unknown })
  : never;

// * ============================================================
// * 🔵 #MARK: BLOQUE 2 — File/base64 + SHA-256
// * ============================================================

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject(new Error("Invalid FileReader result"));
    reader.onerror = () => reject(new Error("File read error"));
    reader.readAsDataURL(file);
  });
}

async function isSameFile(base64: string, file: File): Promise<boolean> {
  const b2 = await fileToBase64(file);
  return stripBase64Prefix(base64) === stripBase64Prefix(b2);
}

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256(buffer: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return toHex(digest);
}

const fileIdCache = new WeakMap<File, string>();

async function getFileId(file: File): Promise<string> {
  const cached = fileIdCache.get(file);
  if (cached) return cached;

  const buf = await file.arrayBuffer();
  const id = await sha256(buf);
  fileIdCache.set(file, id);
  return id;
}

// * ============================================================
// * 🔵 #MARK:  BLOQUE 3 — diffObjects profundo
// * ============================================================

type ObjectDiff = Record<string, unknown>;

async function diffObjects(
  a: unknown,
  b: unknown,
  opts: DiffOpts = defaultDiffOpts
): Promise<ObjectDiff> {

  if (!isObjectMap(a) || !isObjectMap(b)) {
    return a !== b ? { value: b } : {};
  }

  const out: ObjectDiff = {};
  let keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));

  if (opts.keys) keys = keys.filter(k => opts.keys!.includes(k));
  if (opts.ignore) keys = keys.filter(k => !opts.ignore!.includes(k));

  for (const key of keys) {
    if (key === "id") continue;

    const v1 = a[key];
    const v2 = b[key];

    // byId
    if (opts.objectKeyById?.includes(key)) {
      const id1 = getId(v1);
      const id2 = getId(v2);
      if (id1 !== id2) {
        out[key] = v2;
        continue;
      }
      if (isObjectMap(v1) && isObjectMap(v2)) {
        const nested = await diffObjects(v1, v2, opts);
        if (Object.keys(nested).length) out[key] = nested;
      }
      continue;
    }

    // Files
    if (isFile(v1) && isFile(v2)) {
      const [b1, b2] = await Promise.all([fileToBase64(v1), fileToBase64(v2)]);
      if (stripBase64Prefix(b1) !== stripBase64Prefix(b2)) out[key] = v2;
      continue;
    }

    if (typeof v1 === "string" && isFile(v2) && v1.startsWith("data:")) {
      if (!(await isSameFile(v1, v2))) out[key] = v2;
      continue;
    }

    // Arrays
    if (Array.isArray(v1) || Array.isArray(v2)) {
      if (!Array.isArray(v1) || !Array.isArray(v2) || v1.length !== v2.length) {
        out[key] = v2;
        continue;
      }
      for (let i = 0; i < v1.length; i++) {
        const diff = await diffObjects(v1[i], v2[i], opts);
        if (Object.keys(diff).length) {
          out[key] = v2;
          break;
        }
      }
      continue;
    }

    // Objetos
    if (isObjectMap(v1) && isObjectMap(v2)) {
      const nested = await diffObjects(v1, v2, opts);
      if (Object.keys(nested).length) out[key] = nested;
      continue;
    }

    // Escalares
    const n1 = coerceNumberLike(normalizeScalar(key, v1), opts.coerceNumberStrings!);
    const n2 = coerceNumberLike(normalizeScalar(key, v2), opts.coerceNumberStrings!);

    if (opts.nullUndefEqual && n1 == null && n2 == null) continue;

    if (n1 !== n2) out[key] = v2;
  }

  return out;
}

// * ============================================================
// * 🔵 #MARK:  BLOQUE 4 — diffObjectArrays genérico
// * ============================================================

export interface ArrayDiff<TItem> {
  added: TItem[];
  modified: TItem[];
  deleted: TItem[];
}

export function normalizeArrayDiffById<TItem extends { id?: unknown }>(
  diff: ArrayDiff<TItem>
): ArrayDiff<TItem> {
  const ids = new Set(diff.modified.map(m => String(m.id ?? "")));

  const keep = (x: TItem) =>
    x.id == null || !ids.has(String(x.id));

  return {
    added: diff.added.filter(keep),
    modified: diff.modified,
    deleted: diff.deleted.filter(keep)
  };
}

async function deepCompareChild<
  TChild extends { id?: unknown } & Record<string, unknown>
>(
  oldItem: TChild,
  newItem: TChild,
  opts: DiffOpts
): Promise<TChild | null> {

  const keys = opts.keys ?? Object.keys(newItem);

  for (const key of keys) {
    if (opts.ignore?.includes(key)) continue;

    const v1 = oldItem[key];
    const v2 = newItem[key];

    if (opts.nullUndefEqual && v1 == null && v2 == null) continue;

    let a = v1, b = v2;

    if (opts.coerceNumberStrings) {
      const n1 = Number(a), n2 = Number(b);
      if (!Number.isNaN(n1) && !Number.isNaN(n2)) {
        a = n1; b = n2;
      }
    }

    if (opts.objectKeyById?.includes(key)) {
      if (isObjectMap(a) && isObjectMap(b)) {
        if (getId(a) === getId(b)) continue;
        return newItem;
      }
    }

    if (isFile(a) && isFile(b)) {
      const b1 = stripBase64Prefix(await fileToBase64(a));
      const b2 = stripBase64Prefix(await fileToBase64(b));
      if (b1 !== b2) return newItem;
      continue;
    }

    if (typeof a === "string" && isFile(b) && /^data:.*;base64,/.test(a)) {
      if (!(await isSameFile(a, b))) return newItem;
      continue;
    }

    if (a !== b) return newItem;
  }

  return null;
}

export async function diffObjectArrays<
  TChild extends { id?: unknown }
>(
  arr1: readonly TChild[],
  arr2: readonly TChild[],
  opts: DiffOpts = defaultDiffOpts
): Promise<ArrayDiff<TChild>> {

  const hasFiles = arr1.some(isFile) || arr2.some(isFile);
  if (hasFiles) return diffFileArrays(arr1, arr2);

  const map1 = new Map<string, TChild>();
  const map2 = new Map<string, TChild>();

  for (const item of arr1) {
    const id = getId(item);
    if (id) map1.set(id, item);
  }

  for (const item of arr2) {
    const id = getId(item);
    if (id) map2.set(id, item);
  }

  const added: TChild[] = [];
  const modified: TChild[] = [];
  const deleted: TChild[] = [];

  for (const [id, item] of map2) {
    if (!map1.has(id)) added.push(item);
  }

  for (const [id, item] of map1) {
    if (!map2.has(id)) deleted.push(item);
  }

  for (const [id, newItem] of map2) {
    const oldItem = map1.get(id);
    if (!oldItem) continue;
    const diff = await deepCompareChild(oldItem, newItem, opts);
    if (diff) modified.push(diff);
  }

  for (const item of arr2) {
    if (getId(item) === null) added.push(item);
  }

  return { added, modified, deleted };
}

// Narrowing estricto: determina si un T realmente es File
function isFileItem<T>(item: T): item is File & T {
  return isFile(item);
}

async function diffFileArrays<TItem extends { id?: unknown }>(
  arr1: readonly TItem[],
  arr2: readonly TItem[]
): Promise<ArrayDiff<TItem>> {

  const map1 = new Map<string, TItem>();
  const map2 = new Map<string, TItem>();

  const ids1: string[] = [];
  const ids2: string[] = [];

  // Procesa arr1 generando IDs SHA-256
  for (const item of arr1) {
    if (!isFileItem(item)) {
      throw new Error("diffFileArrays recibió un item que no es File");
    }
    const id = await getFileId(item);
    ids1.push(id);
    map1.set(id, item);
  }

  // Procesa arr2 generando IDs SHA-256
  for (const item of arr2) {
    if (!isFileItem(item)) {
      throw new Error("diffFileArrays recibió un item que no es File");
    }
    const id = await getFileId(item);
    ids2.push(id);
    map2.set(id, item);
  }

  // Mapa de frecuencias: permite detectar duplicados correctamente
  const freq1 = new Map<string, number>();
  const freq2 = new Map<string, number>();

  for (const id of ids1) freq1.set(id, (freq1.get(id) ?? 0) + 1);
  for (const id of ids2) freq2.set(id, (freq2.get(id) ?? 0) + 1);

  const added: TItem[] = [];
  const deleted: TItem[] = [];

  // Detecta añadidos
  for (const [id, count2] of freq2.entries()) {
    const count1 = freq1.get(id) ?? 0;
    for (let i = 0; i < count2 - count1; i++) {
      const fileItem = map2.get(id);
      if (fileItem) added.push(fileItem);
    }
  }

  // Detecta eliminados
  for (const [id, count1] of freq1.entries()) {
    const count2 = freq2.get(id) ?? 0;
    for (let i = 0; i < count1 - count2; i++) {
      const fileItem = map1.get(id);
      if (fileItem) deleted.push(fileItem);
    }
  }

  // Archivos no tienen "modified". Siempre added/deleted.
  return { added, modified: [], deleted };
}


// * ============================================================
// * 🔵 #MARK: BLOQUE 5 — Diff con manager hijo (VERSIÓN FINAL FUNCIONAL)
// * ============================================================

// Cada managerKey almacena un diff de hijos
export interface ManagerField<TChild> {
  added: TChild[];
  modified: TChild[];
  deleted: TChild[];
}

// El tipo final del padre aumentado: TParent + opcional managerKey
export type Augmented<
  TParent extends ObjectMap,
  ManagerKey extends string,
  TChild
> = TParent & Partial<Record<ManagerKey, ManagerField<TChild>>>;

// Resultado del diff completo
export interface ParentWithChildDiffSingle<
  TParent extends ObjectMap,
  TChild,
  ManagerKey extends string
> {
  added: Array<Augmented<TParent, ManagerKey, TChild>>;
  deleted: TParent[];
  modified: Array<Augmented<TParent, ManagerKey, TChild>>;
}


// ============================================================
// FUNCIÓN PRINCIPAL
// ============================================================

export async function diffObjectArraysWithChildSingle<
  TParent extends ObjectMap,
  TChildKey extends keyof TParent,
  ManagerKey extends string
>(
  arr1: readonly TParent[],
  arr2: readonly TParent[],
  options: {
    childKey: TChildKey;
    managerKey: ManagerKey;
    parentDiffOpts?: DiffOpts;
    childDiffOpts?: DiffOpts;
  }
): Promise<
  ParentWithChildDiffSingle<TParent, ChildOfParent<TParent, TChildKey>, ManagerKey>
> {

  const {
    childKey,
    managerKey,
    parentDiffOpts = defaultDiffOpts,
    childDiffOpts = defaultDiffOpts,
  } = options;

  type TChild = ChildOfParent<TParent, TChildKey>;

  // Diff base de padres
  const base = await diffObjectArrays(arr1, arr2, parentDiffOpts);

  const resultAdded: Array<Augmented<TParent, ManagerKey, TChild>> = [];
  const resultModified: Array<Augmented<TParent, ManagerKey, TChild>> = [];

  // ============================================================
  // 🔵 ADDED
  // ============================================================
  for (const parentPartial of base.added) {

    // entry nace como ObjectMap, NO como Augmented
    const entry: ObjectMap = { ...parentPartial };

    const id = getId(parentPartial);
    const updatedFull = arr2.find(p => getId(p) === id);

    if (updatedFull) {
      const childArr = toArraySafe<TChild>(updatedFull[childKey]);

      if (childArr.length) {
        // asignación con assertion explícita
        (entry as Record<string, unknown>)[managerKey] = {
          added: childArr,
          deleted: [],
          modified: []
        } satisfies ManagerField<TChild>;
      }
    }

    resultAdded.push(entry as Augmented<TParent, ManagerKey, TChild>);
  }


  // ============================================================
  // 🔵 MODIFIED
  // ============================================================
  for (const parentChanges of base.modified) {

    // entry debe empezar como ObjectMap
    const entry: ObjectMap = { ...parentChanges };

    const id = getId(parentChanges);
    const originalFull = arr1.find(p => getId(p) === id);
    const updatedFull = arr2.find(p => getId(p) === id);

    if (originalFull && updatedFull) {

      const childArr1 = toArraySafe<TChild>(originalFull[childKey]);
      const childArr2 = toArraySafe<TChild>(updatedFull[childKey]);

      let childDiff = await diffObjectArrays<TChild>(childArr1, childArr2, childDiffOpts);
      childDiff = normalizeArrayDiffById(childDiff);

      const hasChanges =
        childDiff.added.length ||
        childDiff.modified.length ||
        childDiff.deleted.length;

      if (hasChanges) {
        // Asignación dinámica con satisfies para evitar errores
        (entry as Record<string, unknown>)[managerKey] =
          childDiff satisfies ManagerField<TChild>;
      }
    }

    resultModified.push(entry as Augmented<TParent, ManagerKey, TChild>);
  }


  // ============================================================
  // 🔵 RETORNO FINAL
  // ============================================================
  return {
    added: resultAdded,
    deleted: base.deleted,
    modified: resultModified
  };
}


// * ============================================================
// * 🔵 #MARK:  BLOQUE 6 — Diff con múltiples hijos y múltiples managers
// * ============================================================

export interface MultiManagerConfig<
  TParent extends ObjectMap,
  TChildKey extends keyof TParent,
  ManagerKey extends string
> {
  childKey: TChildKey;
  managerKey: ManagerKey;
  childDiffOpts?: DiffOpts;
}

export interface ParentWithChildDiffMulti<
  TParent extends ObjectMap,
  ManagerKey extends string
> {
  added: Array<TParent & Partial<Record<ManagerKey, unknown>>>;
  deleted: TParent[];
  modified: Array<TParent & Partial<Record<ManagerKey, unknown>>>;
}


// ============================================================
// FUNCIÓN PRINCIPAL: múltiples children con múltiples managers
// ============================================================

export async function diffObjectArraysWithChildMulti<
  TParent extends ObjectMap,
  ManagerKey extends string
>(
  arr1: readonly TParent[],
  arr2: readonly TParent[],
  configs: ReadonlyArray<
    MultiManagerConfig<TParent, keyof TParent, ManagerKey>
  >,
  parentDiffOpts: DiffOpts = defaultDiffOpts
): Promise<ParentWithChildDiffMulti<TParent, ManagerKey>> {

  // Diff simple de padres
  const base = await diffObjectArrays(arr1, arr2, parentDiffOpts);

  const resultAdded: Array<TParent & Partial<Record<ManagerKey, unknown>>> = [];
  const resultModified: Array<TParent & Partial<Record<ManagerKey, unknown>>> = [];

  // ============================================================
  // 🔵 ADDED
  // ============================================================
  for (const parentPartial of base.added) {

    const entry: ObjectMap = { ...parentPartial };

    const id = getId(parentPartial);
    const updatedFull = arr2.find(p => getId(p) === id);

    if (updatedFull) {
      for (const cfg of configs) {
        // ⚠️ No incluimos childDiffOpts aquí porque NO se usa en ADDED
        const { childKey, managerKey } = cfg;

        type TChild = ChildOfParent<TParent, typeof childKey>;

        const childArr = toArraySafe<TChild>(updatedFull[childKey]);

        if (childArr.length) {
          const field: ManagerField<TChild> = {
            added: childArr,
            modified: [],
            deleted: []
          };

          (entry as Record<string, unknown>)[managerKey] = field;
        }
      }
    }

    resultAdded.push(entry as TParent & Partial<Record<ManagerKey, unknown>>);
  }

  // ============================================================
  // 🔵 MODIFIED
  // ============================================================
  for (const parentChanges of base.modified) {

    const entry: ObjectMap = { ...parentChanges };

    const id = getId(parentChanges);
    const originalFull = arr1.find(p => getId(p) === id);
    const updatedFull = arr2.find(p => getId(p) === id);

    if (originalFull && updatedFull) {

      for (const cfg of configs) {
        const { childKey, managerKey, childDiffOpts = defaultDiffOpts } = cfg;

        type TChild = ChildOfParent<TParent, typeof childKey>;

        const childArr1 = toArraySafe<TChild>(originalFull[childKey]);
        const childArr2 = toArraySafe<TChild>(updatedFull[childKey]);

        let childDiff = await diffObjectArrays<TChild>(childArr1, childArr2, childDiffOpts);

        childDiff = normalizeArrayDiffById(childDiff);

        const hasChanges =
          childDiff.added.length ||
          childDiff.modified.length ||
          childDiff.deleted.length;

        if (hasChanges) {
          (entry as Record<string, unknown>)[managerKey] =
            childDiff satisfies ManagerField<TChild>;
        }
      }
    }

    resultModified.push(entry as TParent & Partial<Record<ManagerKey, unknown>>);
  }



  // ============================================================
  // 🔵 RETORNO FINAL
  // ============================================================
  return {
    added: resultAdded,
    deleted: base.deleted,
    modified: resultModified
  };
}


// * ======================================================================
// * 🔵 #MARK: BLOQUE 7 — Diff multinivel con múltiples managers de hijos (STRICT)
// * ======================================================================


// --------------------------------------------------------------
// CONFIG GENÉRICA DE CADA NIVEL (SIN ANY)
// --------------------------------------------------------------
export interface ChildConfig<
  TParent extends ObjectMap,
  TChildKey extends keyof TParent,
  ManagerKey extends string,
  TChild extends ChildOfParent<TParent, TChildKey> = ChildOfParent<TParent, TChildKey>
> {
  childKey: TChildKey;
  managerKey: ManagerKey;
  childDiffOpts?: DiffOpts;

  children?: readonly ChildConfig<
    TChild,
    keyof TChild & string,
    string
  >[];
}


// --------------------------------------------------------------
// ROOT CONFIG TYPE (ELIMINA POR COMPLETO EL USO DE ANY)
// --------------------------------------------------------------
export type ChildConfigRoot<TParent extends ObjectMap> =
  ChildConfig<
    TParent,
    keyof TParent & string,
    string,
    ChildOfParent<TParent, keyof TParent & string>
  >;


// --------------------------------------------------------------
// RESULTADO FINAL
// --------------------------------------------------------------
export interface ParentWithChildrenDiff<TParent extends ObjectMap> {
  added: TParent[];
  deleted: TParent[];
  modified: TParent[];
}


// --------------------------------------------------------------
// APLICA CONFIGURACIÓN PARA UN NIVEL (NO USA ANY)
// --------------------------------------------------------------
async function applyChildConfig<
  TParent extends ObjectMap,
  TChildKey extends keyof TParent,
  ManagerKey extends string,
  TChild extends ChildOfParent<TParent, TChildKey>
>(
  entry: ObjectMap,
  original: TParent | undefined,
  updated: TParent | undefined,
  config: ChildConfig<TParent, TChildKey, ManagerKey, TChild>
): Promise<void> {

  const { childKey, managerKey, childDiffOpts = defaultDiffOpts, children } = config;

  const childArr1 = original ? toArraySafe<TChild>(original[childKey]) : [];
  const childArr2 = updated ? toArraySafe<TChild>(updated[childKey]) : [];

  let diff = await diffObjectArrays(childArr1, childArr2, childDiffOpts);
  diff = normalizeArrayDiffById(diff);

  const hasChanges =
    diff.added.length > 0 ||
    diff.modified.length > 0 ||
    diff.deleted.length > 0;

  if (!hasChanges) return;

  // asignamos el manager
  (entry as Record<string, unknown>)[managerKey] =
    diff satisfies ManagerField<TChild>;

  // RECURSIÓN si hay children
  if (children && children.length > 0) {

    const changedChildren = [...diff.added, ...diff.modified];

    for (const child of changedChildren) {
      const entryChild = child as unknown as ObjectMap;

      for (const subConfig of children) {
        await applyChildConfig(
          entryChild,
          child,
          child,
          subConfig
        );
      }
    }
  }
}


// --------------------------------------------------------------
// FUNCIÓN PRINCIPAL (SIN NINGÚN ANY)
// --------------------------------------------------------------
export async function diffObjectArraysWithChildren<
  TParent extends ObjectMap,
  Configs extends readonly ChildConfigRoot<TParent>[]
>(
  arr1: readonly TParent[],
  arr2: readonly TParent[],
  configs: Configs,
  parentDiffOpts: DiffOpts = defaultDiffOpts
): Promise<ParentWithChildrenDiff<TParent>> {

  const base = await diffObjectArrays(arr1, arr2, parentDiffOpts);

  const added: TParent[] = [];
  const modified: TParent[] = [];
  const deleted = base.deleted;

  // -----------------------
  // ADDED
  // -----------------------
  for (const partialParent of base.added) {
    const entry: ObjectMap = { ...partialParent };

    const id = getId(partialParent);
    const full = arr2.find(p => getId(p) === id);

    for (const cfg of configs) {
      await applyChildConfig(entry, undefined, full, cfg);
    }

    added.push(entry as TParent);
  }

  // -----------------------
  // MODIFIED
  // -----------------------
  for (const partialParent of base.modified) {
    const entry: ObjectMap = { ...partialParent };

    const id = getId(partialParent);
    const original = arr1.find(p => getId(p) === id);
    const updated = arr2.find(p => getId(p) === id);

    for (const cfg of configs) {
      await applyChildConfig(entry, original, updated, cfg);
    }

    modified.push(entry as TParent);
  }

  return { added, deleted, modified };
}

export async function deepDiff(a: unknown, b: unknown, opts: DiffOpts = defaultDiffOpts) {
  return diffObjects(a, b, opts);
}


// * ============================================================
// * 🔵 #MARK: BLOQUE 8 — Builder multinivel tipado para ChildConfigRoot
// * ============================================================

// ----------------------------------------
// Builder de nivel hijo
// ----------------------------------------
export class ChildConfigBuilder<
  TParent extends ObjectMap,
  TChildKey extends keyof TParent,
  ManagerKey extends string,
  TChild extends ChildOfParent<TParent, TChildKey>
> {

  private readonly cfg: ChildConfig<TParent, TChildKey, ManagerKey, TChild>;

  constructor(childKey: TChildKey, managerKey: ManagerKey) {
    this.cfg = { childKey, managerKey };
  }

  /**
   * Establecer opciones de diff para este nivel
   */
  diffOptions(opts: DiffOpts): this {
    this.cfg.childDiffOpts = opts;
    return this;
  }

  /**
   * Agregar configuraciones de hijos (subniveles)
   */
  children<
    SubKey extends keyof TChild & string,
    SubManager extends string
  >(
    ...children: readonly ChildConfig<
      TChild,
      SubKey,
      SubManager,
      ChildOfParent<TChild, SubKey>
    >[]
  ): this {

    this.cfg.children = children;
    return this;
  }

  /**
   * Finaliza y retorna el ChildConfig resultante
   */
  build(): ChildConfig<TParent, TChildKey, ManagerKey, TChild> {
    return this.cfg;
  }
}



// ----------------------------------------
// Builder de ROOT para el primer nivel
// ----------------------------------------
export class ChildConfigRootBuilder<TParent extends ObjectMap> {

  private readonly configs: ChildConfigRoot<TParent>[] = [];

  /**
   * Agregar un nivel raíz
   */
  add<
    Key extends keyof TParent & string,
    Manager extends string
  >(
    childKey: Key,
    managerKey: Manager,
    configure?: (
      builder: ChildConfigBuilder<
        TParent,
        Key,
        Manager,
        ChildOfParent<TParent, Key>
      >
    ) => void
  ): this {

    const builder = new ChildConfigBuilder<
      TParent,
      Key,
      Manager,
      ChildOfParent<TParent, Key>
    >(childKey, managerKey);

    if (configure) {
      configure(builder);
    }

    const cfg = builder.build() as ChildConfigRoot<TParent>;
    this.configs.push(cfg);

    return this;
  }

  /**
   * Finaliza y retorna el arreglo de configs
   */
  build(): readonly ChildConfigRoot<TParent>[] {
    return this.configs;
  }
}



// ============================================================
// 🔵 FUNCIÓN HELPER PARA CREAR BUILDER
// ============================================================

export function createChildConfigRoot<TParent extends ObjectMap>() {
  return new ChildConfigRootBuilder<TParent>();
}


