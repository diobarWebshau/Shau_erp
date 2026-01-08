import type { ProductInputProcessProps } from "../../domain/product-input-process.types";
import { IProductProcessRepository } from "../../../product-process/domain/product-process.repository.interface";
import type { IProductInputProcessRepository } from "../../domain/product-input-process.repository.interface";
import { IProductInputRepository } from "../../../product-input/domain/product-input.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { ProductInputProcessCreateDto } from "../dto/product-input-process.model.schema";
import { Transaction } from "sequelize";
export declare class CreateProductInputProcessUseCase {
    private readonly repo;
    private readonly repoProduct;
    private readonly repoProductInput;
    private readonly repoProductProcess;
    constructor(repo: IProductInputProcessRepository, repoProduct: IProductRepository, repoProductInput: IProductInputRepository, repoProductProcess: IProductProcessRepository);
    execute(data: ProductInputProcessCreateDto, tx?: Transaction): Promise<ProductInputProcessProps>;
}
