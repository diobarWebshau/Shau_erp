import type { ProductInputProcessProps } from "../../domain/product-input-process.types";
import type { IProductInputProcessRepository } from "../../domain/product-input-process.repository.interface";
import { ProductInputProcessUpdateDto } from "../dto/product-input-process.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateProductInputProcessUseCase {
    private readonly repo;
    constructor(repo: IProductInputProcessRepository);
    execute(id: number, data: ProductInputProcessUpdateDto, tx?: Transaction): Promise<ProductInputProcessProps>;
}
