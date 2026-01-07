import type { ProductProps } from "../../domain/product.types";
import type { IProductRepository } from "../../domain/product.repository.interface";
import { ProductCreateDto } from "../dto/product.model.schema";
import { Transaction } from "sequelize";
export declare class CreateProductUseCase {
    private readonly repo;
    constructor(repo: IProductRepository);
    execute(data: ProductCreateDto, tx?: Transaction): Promise<ProductProps>;
}
