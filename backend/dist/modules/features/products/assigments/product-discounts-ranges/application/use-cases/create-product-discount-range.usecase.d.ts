import type { ProductDiscountRangeProps } from "../../domain/product-discount-range.types";
import type { IProductDiscountRangeRepository } from "../../domain/product-discount-range.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { ProductDiscountRangeCreateDto } from "../dto/product-discount-range.model.schema";
import { Transaction } from "sequelize";
export declare class CreateProductDiscountRangeUseCase {
    private readonly repo;
    private readonly repoProduct;
    constructor(repo: IProductDiscountRangeRepository, repoProduct: IProductRepository);
    execute(data: ProductDiscountRangeCreateDto, tx?: Transaction): Promise<ProductDiscountRangeProps>;
}
