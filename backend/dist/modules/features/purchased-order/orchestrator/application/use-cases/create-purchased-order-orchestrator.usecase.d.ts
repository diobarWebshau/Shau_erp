import { IAppliedProductDiscountClientRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-client/domain/applied-product-discount-client.repository.interface";
import { IAppliedProductDiscountRangeRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.repository.interface";
import { IProductDiscountRangeRepository } from "@src/modules/features/products/assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IPurchasedOrderProductRepository } from "../../../assigments/purchased-order-product/domain/purchased-order-product.respository.interface";
import { IClientAddressRepository } from "@src/modules/features/client/assigments/client-addresses/domain/client-address.repository.interface";
import { PurchasedOrderCreateOrchestratorProps } from "../../domain/purchased-order-orchestrator.types";
import { IPurchasedOrderRepository } from "../../../domain/purchased-order.repository.interface";
import { IClientRepository } from "@src/modules/core/client/domain/client.repository.interface";
import { IProductDiscountClientRepository } from "@src/modules/features/client/assigments/product-discount-client/domain/product-discount-client.repository.interface";
interface ICreatePurchasedOrderOrchestratorUseCase {
    purchasedOrderRepo: IPurchasedOrderRepository;
    purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    clientAddressRepo: IClientAddressRepository;
    clientRepo: IClientRepository;
    productDiscountRangeRepo: IProductDiscountRangeRepository;
    productDiscountClientRepo: IProductDiscountClientRepository;
}
export declare class CreatePurchasedOrderOrchestratorUseCase {
    private readonly purchasedOrderRepo;
    private readonly purchasedOrderProductRepo;
    private readonly appliedProductDiscountRangeRepo;
    private readonly productDiscountRangeRepo;
    private readonly clientRepo;
    private readonly clientAddressRepo;
    constructor({ appliedProductDiscountRangeRepo, purchasedOrderProductRepo, purchasedOrderRepo, clientAddressRepo, clientRepo, productDiscountRangeRepo, }: ICreatePurchasedOrderOrchestratorUseCase);
    execute: (data: PurchasedOrderCreateOrchestratorProps) => Promise<void>;
}
export {};
