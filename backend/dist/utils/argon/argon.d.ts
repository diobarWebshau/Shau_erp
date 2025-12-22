/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  GENERATE HASH — Argon2id
 * ──────────────────────────────────────────────────────────────────────────────
 * Genera un hash seguro usando Argon2id, el algoritmo recomendado por OWASP.
 *
 * Ventajas de Argon2id:
 *   - Alta resistencia a ataques GPU.
 *   - Configurable en memoria, tiempo y paralelismo.
 *   - Más seguro y moderno que bcrypt.
 *
 * Retorna:
 *   ✔ string → si se generó correctamente.
 *   ✔ null → si hubo cualquier error o datos inválidos.
 */
declare const generateHash: (password: string) => Promise<string | null>;
/**
 * ──────────────────────────────────────────────────────────────────────────────
 *  VERIFY PASSWORD
 * ──────────────────────────────────────────────────────────────────────────────
 * Verifica un password plano contra un hash Argon2id.
 *
 * Retorna:
 *   ✔ true → si coincide
 *   ✔ false → si NO coincide o si ocurre un error.
 *
 * Usamos try/catch porque verify() también puede lanzar.
 */
declare const verifyPassword: (hash: string, inputPassword: string) => Promise<boolean>;
export { verifyPassword, generateHash };
