"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecimalVO = void 0;
// Se importa decimal.js para manejar aritmética decimal exacta.
// Evita errores de coma flotante propios de number (IEEE-754).
const decimal_js_1 = __importDefault(require("decimal.js"));
class DecimalVO {
    v;
    constructor(v) {
        this.v = v;
    }
    static from(value) {
        if (value instanceof DecimalVO)
            return value;
        return new DecimalVO(new decimal_js_1.default(value));
    }
    toString() {
        return this.v.toFixed();
    }
    toFixed(dp) {
        return this.v.toFixed(dp);
    }
    // -----------------------
    // 🧠 OPERACIONES DE DOMINIO
    // -----------------------
    isFinite() {
        return this.v.isFinite();
    }
    isInteger() {
        return this.v.isInteger();
    }
    isZero() {
        return this.v.isZero();
    }
    isPositive() {
        return this.v.gt(0);
    }
    gt(other) {
        return this.v.gt(DecimalVO.from(other).v);
    }
    gte(other) {
        return this.v.gte(DecimalVO.from(other).v);
    }
    lt(other) {
        return this.v.lt(DecimalVO.from(other).v);
    }
    lte(other) {
        return this.v.lte(DecimalVO.from(other).v);
    }
    equals(other) {
        return this.v.eq(DecimalVO.from(other).v);
    }
}
exports.DecimalVO = DecimalVO;
