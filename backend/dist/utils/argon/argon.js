"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = exports.verifyPassword = void 0;
const winston_js_1 = __importDefault(require("../winston/winston.js"));
const argon2_1 = __importDefault(require("argon2"));
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
const generateHash = async (password) => {
    if (typeof password !== "string" || password.trim().length === 0) {
        const errorMsg = "Validation error: Password must be a non-empty string.";
        winston_js_1.default.warn(errorMsg, {
            input: password
        });
        return null;
    }
    try {
        /**
         * Configuración correcta para Argon2id.
         *
         * type debe ser tipado así:
         *   type: typeof argon2.argon2id
         *
         * Porque Argon2 no expone un tipo Argon2Type,
         * sino valores numéricos exportados como constantes.
         */
        const options = {
            type: argon2_1.default.argon2id,
            memoryCost: 2 ** 17, // ~128MB
            timeCost: 4, // 4 iteraciones
            parallelism: 2 // recomendado para servidores modernos
        };
        const hashed = await argon2_1.default.hash(password, options);
        return hashed;
    }
    catch (error) {
        const err = error;
        winston_js_1.default.error(`Error generating hash with Argon2: ${err.message}`, { stack: err.stack });
        return null;
    }
};
exports.generateHash = generateHash;
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
const verifyPassword = async (hash, inputPassword) => {
    try {
        const isValid = await argon2_1.default.verify(hash, inputPassword);
        return isValid;
    }
    catch (error) {
        const err = error;
        winston_js_1.default.error(`Error verifying password: ${err.message}`, {
            stack: err.stack
        });
        return false;
    }
};
exports.verifyPassword = verifyPassword;
