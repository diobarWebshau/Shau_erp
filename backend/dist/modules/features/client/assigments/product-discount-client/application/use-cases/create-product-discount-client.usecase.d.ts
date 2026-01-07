import type { ProductDiscountClientProps } from "../../domain/product-discount-client.types";
import type { IProductDiscountClientRepository } from "../../domain/product-discount-client.repository.interface";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { IClientRepository } from "@modules/core/client/domain/client.repository.interface";
import { ProductDiscountClientCreateDto } from "../dto/product-discount-client.model.schema";
import { Transaction } from "sequelize";
export declare class CreateProductDiscountClientUseCase {
    private readonly repo;
    private readonly repoProduct;
    private readonly repoClient;
    constructor(repo: IProductDiscountClientRepository, repoProduct: IProductRepository, repoClient: IClientRepository);
    execute(data: ProductDiscountClientCreateDto, tx?: Transaction): Promise<ProductDiscountClientProps>;
}
