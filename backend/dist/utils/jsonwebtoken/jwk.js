"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.verifyToken = exports.decodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Validación estricta de la clave secreta para JWT
 */
const secretKey = process.env.JWT_SECRET;
if (!secretKey || typeof secretKey !== "string") {
    throw new Error("JWT secret key is invalid or not defined.");
}
/**
 * Opciones estrictas de creación del token
 */
const signOptions = {
    expiresIn: "1h",
};
/**
 * Genera un token JWT de forma estrictamente tipada
 */
const generateToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, secretKey, signOptions);
    }
    catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        throw new Error(`Error generating token: ${err}`);
    }
};
exports.generateToken = generateToken;
/**
 * Verifica un JWT y retorna siempre un tipo seguro:
 *   → JwtPayload si es un token con payload JSON
 *   → string si es un token con payload en texto plano
 *
 * En este ERP, garantizamos que siempre sea un JwtUserPayload.
 */
const verifyToken = (token, options) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey, options);
        // jsonwebtoken permite cadenas, pero aquí no deberían existir
        if (typeof decoded === "string") {
            throw new Error("Invalid JWT payload format.");
        }
        return decoded;
    }
    catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        throw new Error(`Invalid or expired token: ${err}`);
    }
};
exports.verifyToken = verifyToken;
/**
 * Decodifica un token sin verificarlo.
 * Retorna:
 *   → JwtPayload si es JSON
 *   → null si no se puede decodificar
 */
const decodeToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded || typeof decoded !== "object") {
            return null;
        }
        return decoded;
    }
    catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        throw new Error(`Invalid token: ${err}`);
    }
};
exports.decodeToken = decodeToken;
