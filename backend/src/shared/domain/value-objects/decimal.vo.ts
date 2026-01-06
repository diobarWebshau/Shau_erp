// Se importa decimal.js para manejar aritmética decimal exacta.
// Evita errores de coma flotante propios de number (IEEE-754).
import DecimalJs from "decimal.js";

// DecimalVO es un Value Object del dominio.
// Representa un valor decimal SIN identidad, inmutable y comparable por valor.
export class DecimalVO {

    // Propiedad privada que encapsula la implementación concreta (decimal.js).
    // Nadie fuera de esta clase puede acceder ni depender de DecimalJs.
    private constructor(
        private readonly v: DecimalJs
    ) { }

    // Método de fábrica estático.
    // Centraliza la creación del Value Object y evita el uso de `new` fuera.
    // Permite crear DecimalVO desde string, number o desde otro DecimalVO.
    static from(value: string | number | DecimalVO): DecimalVO {
        // Si ya es un DecimalVO, se devuelve tal cual.
        // Esto evita recrear instancias innecesarias.
        if (value instanceof DecimalVO) return value;

        // Si es string o number, se delega la precisión a decimal.js
        // y se encapsula dentro del Value Object.
        return new DecimalVO(new DecimalJs(value));
    }

    // Convierte el valor decimal a string exacto.
    // Este método se usa típicamente:
    // - para persistencia (DB)
    // - para DTO / respuestas HTTP
    toString(): string {
        return this.v.toFixed();
    }

    // Convierte el valor decimal a string con una cantidad fija de decimales.
    // Útil cuando el contexto requiere escala controlada (ej. dinero).
    // NO modifica el objeto: devuelve una representación.
    toFixed(dp: number): string {
        return this.v.toFixed(dp);
    }
}
