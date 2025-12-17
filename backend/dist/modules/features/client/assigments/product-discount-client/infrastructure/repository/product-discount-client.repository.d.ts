import type { ProductDiscountClientCreateProps, ProductDiscountClientProps, ProductDiscountClientUpdateProps } from "../../domain/product-discount-client.types";
import type { IProductDiscountClientRepository } from "../../domain/product-discount-client.repository.interface";
export declare class ProductDiscountClientRepository implements IProductDiscountClientRepository {
    findAll: () => Promise<ProductDiscountClientProps[]>;
    findById: (id: number) => Promise<ProductDiscountClientProps | null>;
    findByClientId: (client_id: number) => Promise<ProductDiscountClientProps[]>;
    findByProductClientId: (product_id: number, client_id: number) => Promise<ProductDiscountClientProps | null>;
    create: (data: ProductDiscountClientCreateProps) => Promise<ProductDiscountClientProps>;
    update: (id: number, data: ProductDiscountClientUpdateProps) => Promise<ProductDiscountClientProps>;
    delete: (id: number) => Promise<void>;
}
