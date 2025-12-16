// ============================================================================
// 🔵 DIFF BACKEND (TS STRICT) — MULTINIVEL, ARRAYS SIN IMPORTAR ORDEN, 
// FECHAS ISO, RUTAS STRING, OBJECT DEEP DIFF SIN ANY
// ============================================================================

// =============================================================================
// 🔵 BLOQUE 1 — Tipos base estrictos
// =============================================================================

export type ObjectMap = Record<string, unknown>;

export interface DiffOpts {
  ignore?: readonly string[];
  dateFields?: readonly string[];
  objectFields?: readonly string[]; // campos que deben compararse por igualdad profunda
}

// Opciones por defecto
const defaultOpts: DiffOpts = {
  ignore: [],
  dateFields: [],
  objectFields: []
};

/** Determina si value es un ObjectMap */
export function isObjectMap(value: unknown): value is ObjectMap {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Normaliza id → string (para backend) */
export function normalizeId(id: unknown): string | null {
  if (id == null) return null;
  return String(id);
}

/** Convierte a array de manera segura */
export function toArraySafe<T>(v: unknown): readonly T[] {
  return Array.isArray(v) ? v as readonly T[] : [];
}

/**
 * Normaliza fechas a ISO, si el campo está en opts.dateFields.
 * Si no puede parsear, retorna el valor original.
 */
export function normalizeMaybeDate(
  key: string,
  value: unknown,
  opts: DiffOpts
): unknown {
  if (!opts.dateFields?.includes(key)) return value;

  if (value == null) return value;

  const d = new Date(String(value));
  if (isNaN(d.getTime())) return value;

  return d.toISOString();
}

// =============================================================================
// 🔵 BLOQUE 2 — Comparación profunda de objetos (strict backend)
// =============================================================================

/**
 * Devuelve un objeto con las propiedades modificadas.
 * Si no hay cambios, retorna {}.
 */
export async function diffObjects(
  a: unknown,
  b: unknown,
  opts: DiffOpts = defaultOpts
): Promise<ObjectMap> {

  if (!isObjectMap(a) || !isObjectMap(b)) {
    return a !== b ? { value: b } : {};
  }

  const out: ObjectMap = {};

  const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));

  for (const key of keys) {
    if (opts.ignore?.includes(key)) continue;
    if (key === "id") continue; // id no se diff-ea

    const v1 = normalizeMaybeDate(key, a[key], opts);
    const v2 = normalizeMaybeDate(key, b[key], opts);

    // 🔵 Campo declarado como objeto → se compara profundamente
    if (opts.objectFields?.includes(key)) {
      if (!isObjectMap(v1) || !isObjectMap(v2)) {
        if (v1 !== v2) out[key] = v2;
        continue;
      }
      const nested = await diffObjects(v1, v2, opts);
      if (Object.keys(nested).length > 0) out[key] = v2;
      continue;
    }

    // 🔵 Arrays → se asigna el nuevo si difiere en orden o contenido
    if (Array.isArray(v1) || Array.isArray(v2)) {
      const a1 = toArraySafe<unknown>(v1);
      const a2 = toArraySafe<unknown>(v2);

      if (!await arraysEqual(a1, a2, opts)) {
        out[key] = v2;
      }
      continue;
    }

    // 🔵 Objetos normales
    if (isObjectMap(v1) && isObjectMap(v2)) {
      const nested = await diffObjects(v1, v2, opts);
      if (Object.keys(nested).length > 0) out[key] = v2;
      continue;
    }

    // 🔵 Scalar strict compare
    if (v1 !== v2) out[key] = v2;
  }

  return out;
}

// =============================================================================
// 🔵 BLOQUE 3 — Igualdad profunda para arreglos (orden NO importa)
// =============================================================================

async function arraysEqual(
  a1: readonly unknown[],
  a2: readonly unknown[],
  opts: DiffOpts
): Promise<boolean> {

  if (a1.length !== a2.length) return false;

  // Si los elementos tienen id → comparamos por id
  const items1 = a1.map((v) => {
    if (isObjectMap(v)) return { id: normalizeId(v.id), value: v };
    return { id: null, value: v };
  });

  const items2 = [...a2].map((v) => {
    if (isObjectMap(v)) return { id: normalizeId(v.id), value: v };
    return { id: null, value: v };
  });

  // índice rápido por id
  const map2 = new Map<string | null, unknown[]>();
  for (const it of items2) {
    const bucket = map2.get(it.id) ?? [];
    bucket.push(it.value);
    map2.set(it.id, bucket);
  }

  // Intentamos "emparejar" cada elemento
  for (const it of items1) {
    const bucket = map2.get(it.id);
    if (!bucket || bucket.length === 0) return false;

    let matched = false;

    for (let i = 0; i < bucket.length; i++) {
      if (await deepEqual(it.value, bucket[i], opts)) {
        bucket.splice(i, 1); // remover match
        matched = true;
        break;
      }
    }

    if (!matched) return false;
  }

  return true;
}

// =============================================================================
// 🔵 BLOQUE 4 — Igualdad profunda backend
// =============================================================================

async function deepEqual(
  a: unknown,
  b: unknown,
  opts: DiffOpts
): Promise<boolean> {

  if (a === b) return true;

  // Fechas normalizadas
  if (typeof a === "string" && typeof b === "string") {
    const na = normalizeMaybeDate("", a, opts);
    const nb = normalizeMaybeDate("", b, opts);
    return na === nb;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    const a1 = toArraySafe(a);
    const a2 = toArraySafe(b);
    return await arraysEqual(a1, a2, opts);
  }

  if (isObjectMap(a) && isObjectMap(b)) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of keys) {
      if (!await deepEqual(a[key], b[key], opts)) return false;
    }
    return true;
  }

  return false;
}

// =============================================================================
// 🔵 BLOQUE 5 — Diff de arrays de entidades (con children simples)
// =============================================================================

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
export async function diffArrayEntities<T extends { id: unknown }>(
  oldArr: readonly T[],
  newArr: readonly T[],
  opts: DiffOpts = defaultOpts
): Promise<ArrayDiff<T>> {

  const mapOld = new Map<string, T>();
  const mapNew = new Map<string, T>();

  for (const it of oldArr) {
    const id = normalizeId(it.id);
    if (id) mapOld.set(id, it);
  }
  for (const it of newArr) {
    const id = normalizeId(it.id);
    if (id) mapNew.set(id, it);
  }

  const added: T[] = [];
  const deleted: T[] = [];
  const modified: T[] = [];

  // detect added
  for (const [id, v] of mapNew.entries()) {
    if (!mapOld.has(id)) added.push(v);
  }

  // detect deleted
  for (const [id, v] of mapOld.entries()) {
    if (!mapNew.has(id)) deleted.push(v);
  }

  // detect modified
  for (const [id, newVal] of mapNew.entries()) {
    const oldVal = mapOld.get(id);
    if (!oldVal) continue;

    const diff = await diffObjects(oldVal, newVal, opts);
    if (Object.keys(diff).length > 0) {
      modified.push(newVal);
    }
  }

  return { added, deleted, modified };
}

// =============================================================================
// 🔵 BLOQUE 6 — Export principal (helper final)
// =============================================================================

export async function deepDiff(
  a: unknown,
  b: unknown,
  opts: DiffOpts = defaultOpts
): Promise<ObjectMap> {
  return diffObjects(a, b, opts);
}
