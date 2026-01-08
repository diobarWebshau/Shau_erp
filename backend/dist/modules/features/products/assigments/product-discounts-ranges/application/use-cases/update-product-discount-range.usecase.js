"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDiscountRangeUseCase = void 0;
const check_range_conflicts_1 = require("@src/helpers/check-range-conflicts");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
// DTO -> Domain (Update Props)
const mapProductDiscountRangeUpdateDtoToDomain = (data) => {
    const { max_qty, min_qty, unit_price, ...rest } = data;
    return {
        ...rest,
        ...(max_qty !== undefined ? { max_qty: decimal_vo_1.DecimalVO.from(max_qty) } : {}),
        ...(min_qty !== undefined ? { min_qty: decimal_vo_1.DecimalVO.from(min_qty) } : {}),
        ...(unit_price !== undefined ? { unit_price: decimal_vo_1.DecimalVO.from(unit_price) } : {}),
    };
};
// Aplica un patch UpdateProps sobre Props (sin mutar)
const mergeDiscountRange = (base, patch) => {
    return {
        ...base,
        ...patch,
    };
};
class UpdateProductDiscountRangeUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(id, data, tx) {
        const existing = await this.repo.findById(id, tx);
        if (!existing) {
            throw new http_error_1.default(404, "La asignación del descuento por rango al producto que se desea actualizar no fue posible encontrarla.");
        }
        // 1) DTO -> Domain patch
        const updateData = mapProductDiscountRangeUpdateDtoToDomain(data);
        // Si no llegó nada para actualizar (patch vacío), regresa existing
        if (!Object.keys(updateData).length)
            return existing;
        // 2) Construir el estado final que quedaría (merged)
        const merged = mergeDiscountRange(existing, updateData);
        // 3) Validación de rangos contra los demás rangos del mismo producto
        const allExisting = await this.repo.findByProductId(existing.product_id, tx);
        const others = allExisting.filter((r) => r.id !== id);
        // Rangos de otros
        const otherRanges = others.map((r) => ({
            min_qty: r.min_qty,
            max_qty: r.max_qty,
        }));
        // Rango final propuesto (ya con el patch aplicado)
        const mergedRange = {
            min_qty: merged.min_qty,
            max_qty: merged.max_qty,
        };
        const allRanges = [
            ...otherRanges,
            mergedRange,
        ];
        const conflictRanges = (0, check_range_conflicts_1.checkRangeConflicts)(allRanges, "min_qty", "max_qty");
        if (conflictRanges === "invalid_range") {
            throw new http_error_1.default(400, "El rango del descuento es invalído.");
        }
        if (conflictRanges === "duplicate") {
            throw new http_error_1.default(400, "El rango del descuento ya esta aplicado por otro descuento del producto.");
        }
        if (conflictRanges === "overlap") {
            throw new http_error_1.default(400, "El rango del descueto se traslapa con otro descuento ya existente para el producto.");
        }
        // 4) Persistir (solo el patch)
        const updated = await this.repo.update(id, updateData, tx);
        if (!updated) {
            throw new http_error_1.default(500, "No fue posible actualizar la asignacion del insumo al producto.");
        }
        return updated;
    }
}
exports.UpdateProductDiscountRangeUseCase = UpdateProductDiscountRangeUseCase;
