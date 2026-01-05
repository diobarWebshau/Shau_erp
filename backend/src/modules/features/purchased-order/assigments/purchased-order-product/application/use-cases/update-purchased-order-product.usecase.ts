import { PurchasedOrderProductProps, PurchasedOrderProductUpdateProps } from "../../domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { PurchasedOrderProductResponseSchemaDto } from "../dto/purchased-order-product.model.schema";
import { Transaction } from "sequelize";

export class UpdatePurchasedOrderProductUseCase {
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    constructor(repo: IPurchasedOrderProductRepository) {
        this.purchasedOrderProductRepo = repo;
    };
    execute = async (id: number, data: PurchasedOrderProductUpdateProps, tx?: Transaction): Promise<PurchasedOrderProductResponseSchemaDto> => {
        const purchasedOrderProductResponse: PurchasedOrderProductProps = await this.purchasedOrderProductRepo.update(id, data, tx);
        return purchasedOrderProductResponse;
    };
};