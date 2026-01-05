import { IPurchasedOrderRepository } from "@modules/features/purchased-order/domain/purchased-order.repository.interface";
import { PurchasedOrderProductCreateProps, PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProps } from "@modules/features/purchased-order/domain/purchased-order.types";
import { PurchasedOrderProductResponseSchemaDto } from "../dto/purchased-order-product.model.schema";
import { IProductRepository } from "@modules/core/product/domain/product.repository.interface";
import { ProductProps } from "@modules/core/product/domain/product.types";
import HttpError from "@shared/errors/http/http-error";
import { Transaction } from "sequelize";

interface ICreatePurchasedOrderProductUseCase {
    purchasedOrderProductRepo: IPurchasedOrderProductRepository,
    productRepo: IProductRepository,
    purchasedOrderRepo: IPurchasedOrderRepository
}

export class CreatePurchasedOrderProductUseCase {

    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    private readonly productRepo: IProductRepository;
    private readonly purchasedOrderRepo: IPurchasedOrderRepository;

    constructor({ productRepo, purchasedOrderProductRepo, purchasedOrderRepo }: ICreatePurchasedOrderProductUseCase) {
        this.purchasedOrderProductRepo = purchasedOrderProductRepo;
        this.productRepo = productRepo;
        this.purchasedOrderRepo = purchasedOrderRepo;
    };
    execute = async (data: PurchasedOrderProductCreateProps, tx?: Transaction): Promise<PurchasedOrderProductResponseSchemaDto> => {
        const validatePurchasedOrder: PurchasedOrderProps | null = await this.purchasedOrderRepo.findById(data.purchase_order_id, tx);
        if (!validatePurchasedOrder) throw new HttpError(404, "No fue posible encontrar el producto que se desea añadir a la orden de compra.");
        const validateProduct: ProductProps | null = await this.productRepo.findById(data.product_id, tx);
        if (!validateProduct) throw new HttpError(404, "No fue posible encontrar el producto que se desea añadir a la orden de compra.");
        const purchasedOrderProductResponse: PurchasedOrderProductProps = await this.purchasedOrderProductRepo.create(data, tx);
        return purchasedOrderProductResponse;
    };
};