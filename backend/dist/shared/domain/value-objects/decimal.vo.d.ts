export declare class DecimalVO {
    private readonly v;
    private constructor();
    static from(value: string | number | DecimalVO): DecimalVO;
    toString(): string;
    toFixed(dp: number): string;
    isFinite(): boolean;
    isInteger(): boolean;
    isZero(): boolean;
    isPositive(): boolean;
    gt(other: DecimalVO | number | string): boolean;
    gte(other: DecimalVO | number | string): boolean;
    lt(other: DecimalVO | number | string): boolean;
    lte(other: DecimalVO | number | string): boolean;
    equals(other: DecimalVO | number | string): boolean;
}
