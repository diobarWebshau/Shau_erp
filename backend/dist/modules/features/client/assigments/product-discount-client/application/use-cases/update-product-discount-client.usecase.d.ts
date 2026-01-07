import type { ProductDiscountClientProps } from "../../domain/product-discount-client.types";
import type { IProductDiscountClientRepository } from "../../domain/product-discount-client.repository.interface";
import { ProductDiscountClientUpdateDto } from "../dto/product-discount-client.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateProductDiscountClientUseCase {
    private readonly repo;
    constructor(repo: IProductDiscountClientRepository);
    execute(id: number, data: ProductDiscountClientUpdateDto, tx?: Transaction): Promise<ProductDiscountClientProps>;
}
