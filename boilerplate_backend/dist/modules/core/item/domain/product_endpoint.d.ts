import { CreateProductBody, ProductDTO, UpdateProductBody } from "./product_dto.js";
export interface GetProductRequest {
    params: {
        id: string;
    };
}
export interface GetProductResponse {
    product: ProductDTO;
}
export interface CreateProductRequest {
    body: CreateProductBody;
}
export interface CreateProductResponse {
    product: ProductDTO;
}
export interface UpdateProductRequest {
    params: {
        id: string;
    };
    body: UpdateProductBody;
}
export interface UpdateProductResponse {
    product: ProductDTO;
}
export interface DeleteProductRequest {
    params: {
        id: string;
    };
}
export interface DeleteProductResponse {
    success: true;
}
