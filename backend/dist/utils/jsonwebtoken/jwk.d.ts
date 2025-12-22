import type { JwtPayload, VerifyOptions } from "jsonwebtoken";
/**
 * Tipo del payload de usuario para garantizar estructura fuerte.
 *
 * Si quieres que sea genérico como antes, puedo regresarlo a Record<string, unknown>,
 * pero esta forma es la recomendada para un ERP (estricta y segura).
 */
interface JwtUserPayload extends JwtPayload {
    user_id: number;
    role_id: number;
    tenant_id: number;
    permissions: string[];
}
/**
 * Genera un token JWT de forma estrictamente tipada
 */
declare const generateToken: (payload: JwtUserPayload) => string;
/**
 * Verifica un JWT y retorna siempre un tipo seguro:
 *   → JwtPayload si es un token con payload JSON
 *   → string si es un token con payload en texto plano
 *
 * En este ERP, garantizamos que siempre sea un JwtUserPayload.
 */
declare const verifyToken: (token: string, options?: VerifyOptions) => JwtUserPayload;
/**
 * Decodifica un token sin verificarlo.
 * Retorna:
 *   → JwtPayload si es JSON
 *   → null si no se puede decodificar
 */
declare const decodeToken: (token: string) => JwtUserPayload | null;
export { decodeToken, verifyToken, generateToken };
export type { JwtPayload };
