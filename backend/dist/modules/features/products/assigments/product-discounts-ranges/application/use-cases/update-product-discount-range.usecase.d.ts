import type { ProductDiscountRangeProps } from "../../domain/product-discount-range.types";
import type { IProductDiscountRangeRepository } from "../../domain/product-discount-range.repository.interface";
import { ProductDiscountRangeUpdateDto } from "../dto/product-discount-range.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateProductDiscountRangeUseCase {
    private readonly repo;
    constructor(repo: IProductDiscountRangeRepository);
    execute(id: number, data: ProductDiscountRangeUpdateDto, tx?: Transaction): Promise<ProductDiscountRangeProps>;
}
