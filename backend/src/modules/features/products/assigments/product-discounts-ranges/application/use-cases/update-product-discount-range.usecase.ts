import type { ProductDiscountRangeUpdateProps, ProductDiscountRangeProps } from "../../domain/product-discount-range.types";
import type { IProductDiscountRangeRepository } from "../../domain/product-discount-range.repository.interface";
import { ProductDiscountRangeUpdateDto } from "../dto/product-discount-range.model.schema";
import { checkRangeConflicts } from "@src/helpers/check-range-conflicts";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

// DTO -> Domain (Update Props)
const mapProductDiscountRangeUpdateDtoToDomain = (
    data: ProductDiscountRangeUpdateDto
): ProductDiscountRangeUpdateProps => {
    const { max_qty, min_qty, unit_price, ...rest } = data;

    return {
        ...rest,
        ...(max_qty !== undefined ? { max_qty: DecimalVO.from(max_qty) } : {}),
        ...(min_qty !== undefined ? { min_qty: DecimalVO.from(min_qty) } : {}),
        ...(unit_price !== undefined ? { unit_price: DecimalVO.from(unit_price) } : {}),
    };
};

// Aplica un patch UpdateProps sobre Props (sin mutar)
const mergeDiscountRange = (
    base: ProductDiscountRangeProps,
    patch: ProductDiscountRangeUpdateProps
): ProductDiscountRangeProps => {
    return {
        ...base,
        ...patch,
    };
};

export class UpdateProductDiscountRangeUseCase {
    constructor(private readonly repo: IProductDiscountRangeRepository) { }

    async execute(id: number, data: ProductDiscountRangeUpdateDto, tx?: Transaction): Promise<ProductDiscountRangeProps> {
        const existing: ProductDiscountRangeProps | null = await this.repo.findById(id, tx);
        if (!existing) {
            throw new HttpError(
                404,
                "La asignación del descuento por rango al producto que se desea actualizar no fue posible encontrarla."
            );
        }

        // 1) DTO -> Domain patch
        const updateData: ProductDiscountRangeUpdateProps = mapProductDiscountRangeUpdateDtoToDomain(data);

        // Si no llegó nada para actualizar (patch vacío), regresa existing
        if (!Object.keys(updateData).length) return existing;

        // 2) Construir el estado final que quedaría (merged)
        const merged: ProductDiscountRangeProps = mergeDiscountRange(existing, updateData);

        // 3) Validación de rangos contra los demás rangos del mismo producto
        const allExisting: ProductDiscountRangeProps[] = await this.repo.findByProductId(existing.product_id, tx);

        const others = allExisting.filter((r) => r.id !== id);

        // Rangos de otros
        const otherRanges: Array<Pick<ProductDiscountRangeProps, "min_qty" | "max_qty">> = others.map((r) => ({
            min_qty: r.min_qty,
            max_qty: r.max_qty,
        }));

        // Rango final propuesto (ya con el patch aplicado)
        const mergedRange: Pick<ProductDiscountRangeProps, "min_qty" | "max_qty"> = {
            min_qty: merged.min_qty,
            max_qty: merged.max_qty,
        };

        const allRanges: Array<Pick<ProductDiscountRangeProps, "min_qty" | "max_qty">> = [
            ...otherRanges,
            mergedRange,
        ];

        const conflictRanges = checkRangeConflicts(allRanges, "min_qty", "max_qty");

        if (conflictRanges === "invalid_range") {
            throw new HttpError(400, "El rango del descuento es invalído.");
        }
        if (conflictRanges === "duplicate") {
            throw new HttpError(400, "El rango del descuento ya esta aplicado por otro descuento del producto.");
        }
        if (conflictRanges === "overlap") {
            throw new HttpError(400, "El rango del descueto se traslapa con otro descuento ya existente para el producto.");
        }

        // 4) Persistir (solo el patch)
        const updated: ProductDiscountRangeProps = await this.repo.update(id, updateData, tx);

        if (!updated) {
            throw new HttpError(500, "No fue posible actualizar la asignacion del insumo al producto.");
        }

        return updated;
    }
}
