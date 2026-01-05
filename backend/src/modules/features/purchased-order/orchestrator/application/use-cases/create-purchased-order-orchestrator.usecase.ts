import { IAppliedProductDiscountClientRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-client/domain/applied-product-discount-client.repository.interface";
import { IAppliedProductDiscountRangeRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.repository.interface";
import { IProductDiscountRangeRepository } from "@src/modules/features/products/assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { PurchasedOrderProductCreateProps, PurchasedOrderProductProps } from "../../../assigments/purchased-order-product/domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../../assigments/purchased-order-product/domain/purchased-order-product.respository.interface";
import { IClientAddressRepository } from "@src/modules/features/client/assigments/client-addresses/domain/client-address.repository.interface";
import { ProductDiscountRangeProps } from "@src/modules/features/products/orchestrator/domain/product-orchestrator.types";
import { ClientAddressProps } from "@src/modules/features/client/assigments/client-addresses/domain/client-address.types";
import { PurchasedOrderCreateOrchestratorProps } from "../../domain/purchased-order-orchestrator.types";
import { IPurchasedOrderRepository } from "../../../domain/purchased-order.repository.interface";
import { IClientRepository } from "@src/modules/core/client/domain/client.repository.interface";
import type { Transaction } from "sequelize";
import { Transaction as sequelizeTx } from "sequelize";
import { sequelize } from "@src/config/mysql/sequelize";
import { ClientProps } from "@src/modules/core/client/domain/client.types";
import HttpError from "@src/shared/errors/http/http-error";
import { PurchasedOrderProps } from "../../../domain/purchased-order.types";
import {
    AppliedProductDiscountRangeCreateProps,
    // AppliedProductDiscountRangeProps 
} from "../../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.types";
import { IProductDiscountClientRepository } from "@src/modules/features/client/assigments/product-discount-client/domain/product-discount-client.repository.interface";

interface ICreatePurchasedOrderOrchestratorUseCase {
    purchasedOrderRepo: IPurchasedOrderRepository,
    purchasedOrderProductRepo: IPurchasedOrderProductRepository,
    appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository,
    appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository,
    clientAddressRepo: IClientAddressRepository,
    clientRepo: IClientRepository,
    productDiscountRangeRepo: IProductDiscountRangeRepository,
    productDiscountClientRepo: IProductDiscountClientRepository
};

export class CreatePurchasedOrderOrchestratorUseCase {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    private readonly productDiscountRangeRepo: IProductDiscountRangeRepository;
    // private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    // private readonly productDiscountClientRepo: IProductDiscountClientRepository;
    private readonly clientRepo: IClientRepository;
    private readonly clientAddressRepo: IClientAddressRepository;

    constructor({
        appliedProductDiscountRangeRepo,
        purchasedOrderProductRepo, purchasedOrderRepo, clientAddressRepo, clientRepo,
        productDiscountRangeRepo,
        // productDiscountClientRepo, appliedProductDiscountClientRepo
    }: ICreatePurchasedOrderOrchestratorUseCase) {
        // this.appliedProductDiscountClientRepo = appliedProductDiscountClientRepo;
        this.appliedProductDiscountRangeRepo = appliedProductDiscountRangeRepo;
        this.purchasedOrderProductRepo = purchasedOrderProductRepo;
        this.productDiscountRangeRepo = productDiscountRangeRepo;
        this.purchasedOrderRepo = purchasedOrderRepo;
        this.clientAddressRepo = clientAddressRepo;
        this.clientRepo = clientRepo;
        // this.productDiscountClientRepo = productDiscountClientRepo;
    };

    execute = async (data: PurchasedOrderCreateOrchestratorProps) => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: sequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        })
        try {
            const { purchased_order, purchased_order_products }: PurchasedOrderCreateOrchestratorProps = data;

            const validateClient: ClientProps | null = await this.clientRepo.findById(purchased_order.client_id, tx);

            if (!validateClient)
                throw new HttpError(404, "El cliente de la orden de compra no existe.");

            const validateClientAddress: ClientAddressProps | null = await this.clientAddressRepo.findById(purchased_order.client_address_id, tx);

            if (!validateClientAddress)
                throw new HttpError(404, "La direccion del cliente para la orde de compra no existe.");

            if (validateClientAddress.client_id !== validateClient.id) {
                throw new HttpError(404, "La direccion ingresada no pertenece al cliente de la orden de compra.");
            }

            const purchasedOrderCreateResponse: PurchasedOrderProps = await this.purchasedOrderRepo.create(purchased_order, tx);

            if (purchased_order_products.length) {
                for (const pop of purchased_order_products) {
                    const newPop: PurchasedOrderProductCreateProps = {
                        ...pop,
                        purchase_order_id: purchasedOrderCreateResponse.id,
                    };

                    const purchasedOrderProductResponse: PurchasedOrderProductProps = await this.purchasedOrderProductRepo.create(newPop, tx);

                    if (pop.price_edit_source === "range") {
                        const productDiscountRanges: ProductDiscountRangeProps[] = await this.productDiscountRangeRepo.findByProductId(pop.product_id, tx);

                        const discountRange: ProductDiscountRangeProps | undefined = productDiscountRanges.find((pdr) =>
                            pdr.min_qty <= pop.qty && pop.qty <= pdr.max_qty
                        );

                        if (discountRange) {
                            const newApdr: AppliedProductDiscountRangeCreateProps = {
                                purchase_order_product_id: purchasedOrderProductResponse.id,
                                max_qty: discountRange.max_qty,
                                min_qty: discountRange.min_qty,
                                product_discount_range_id: discountRange.id,
                                unit_discount: discountRange.unit_price,
                            };

                            await this.appliedProductDiscountRangeRepo.create(newApdr, tx);
                        }
                    }
                }
            }
            await tx.commit();
        } catch (error) {
            await tx.rollback();
            throw error;
        }
    };
};