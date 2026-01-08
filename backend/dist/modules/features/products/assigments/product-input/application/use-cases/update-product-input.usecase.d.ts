import type { ProductInputProps } from "../../domain/product-input.types";
import type { IProductInputRepository } from "../../domain/product-input.repository.interface";
import { ProductInputUpdateDto } from "../dto/product-input.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateProductInputUseCase {
    private readonly repo;
    constructor(repo: IProductInputRepository);
    execute(id: number, data: ProductInputUpdateDto, tx?: Transaction): Promise<ProductInputProps>;
}
