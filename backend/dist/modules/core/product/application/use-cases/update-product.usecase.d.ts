import type { IProductRepository } from "../../domain/product.repository.interface";
import type { ProductProps } from "../../domain/product.types";
import { ProductUpdateDto } from "../dto/product.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateProductUseCase {
    private readonly repo;
    constructor(repo: IProductRepository);
    execute(id: number, data: ProductUpdateDto, tx?: Transaction): Promise<ProductProps>;
}
