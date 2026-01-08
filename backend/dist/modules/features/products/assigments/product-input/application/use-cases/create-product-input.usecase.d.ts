import { IProductRepository } from "@src/modules/core/product/domain/product.repository.interface";
import type { ProductInputProps } from "../../domain/product-input.types";
import type { IProductInputRepository } from "../../domain/product-input.repository.interface";
import { IInputRepository } from "@src/modules/core/input/domain/input.repository.interface";
import { ProductInputCreateDto } from "../dto/product-input.model.schema";
import { Transaction } from "sequelize";
export declare class CreateProductInputUseCase {
    private readonly repo;
    private readonly repoProduct;
    private readonly repoInput;
    constructor(repo: IProductInputRepository, repoProduct: IProductRepository, repoInput: IInputRepository);
    execute(data: ProductInputCreateDto, tx?: Transaction): Promise<ProductInputProps>;
}
