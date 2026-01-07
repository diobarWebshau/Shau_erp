import { IAppliedProductDiscountClientRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-client/domain/applied-product-discount-client.repository.interface";
import { IAppliedProductDiscountRangeRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.repository.interface";
import { IProductDiscountRangeRepository } from "@src/modules/features/products/assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IPurchasedOrderProductRepository } from "../../../assigments/purchased-order-product/domain/purchased-order-product.respository.interface";
import { PurchasedOrderUpdateOrchestratorProps } from "../../domain/purchased-order-orchestrator.types";
import { IPurchasedOrderRepository } from "../../../domain/purchased-order.repository.interface";
import { IProductDiscountClientRepository } from "@src/modules/features/client/assigments/product-discount-client/domain/product-discount-client.repository.interface";
interface IUpdatePurchasedOrderOrchestratorUseCase {
    purchasedOrderRepo: IPurchasedOrderRepository;
    purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    productDiscountRangeRepo: IProductDiscountRangeRepository;
    productDiscountClientRepo: IProductDiscountClientRepository;
}
export declare class UpdatePurchasedOrderOrchestratorUseCase {
    private readonly purchasedOrderRepo;
    private readonly purchasedOrderProductRepo;
    private readonly appliedProductDiscountRangeRepo;
    private readonly productDiscountRangeRepo;
    constructor({ appliedProductDiscountRangeRepo, purchasedOrderProductRepo, purchasedOrderRepo, productDiscountRangeRepo, }: IUpdatePurchasedOrderOrchestratorUseCase);
    execute: (id: number, data: PurchasedOrderUpdateOrchestratorProps) => Promise<void>;
}
export {};
