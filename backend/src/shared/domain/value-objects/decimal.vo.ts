// Se importa decimal.js para manejar aritmética decimal exacta.
// Evita errores de coma flotante propios de number (IEEE-754).
import DecimalJs from "decimal.js";

export class DecimalVO {
    private constructor(private readonly v: DecimalJs) { }

    static from(value: string | number | DecimalVO): DecimalVO {
        if (value instanceof DecimalVO) return value;
        return new DecimalVO(new DecimalJs(value));
    }

    toString(): string {
        return this.v.toFixed();
    }

    toFixed(dp: number): string {
        return this.v.toFixed(dp);
    }

    // -----------------------
    // 🧠 OPERACIONES DE DOMINIO
    // -----------------------

    isFinite(): boolean {
        return this.v.isFinite();
    }

    isInteger(): boolean {
        return this.v.isInteger();
    }

    isZero(): boolean {
        return this.v.isZero();
    }

    isPositive(): boolean {
        return this.v.gt(0);
    }

    gt(other: DecimalVO | number | string): boolean {
        return this.v.gt(DecimalVO.from(other).v);
    }

    gte(other: DecimalVO | number | string): boolean {
        return this.v.gte(DecimalVO.from(other).v);
    }

    lt(other: DecimalVO | number | string): boolean {
        return this.v.lt(DecimalVO.from(other).v);
    }

    lte(other: DecimalVO | number | string): boolean {
        return this.v.lte(DecimalVO.from(other).v);
    }

    equals(other: DecimalVO | number | string): boolean {
        return this.v.eq(DecimalVO.from(other).v);
    }
}
