import { IAppliedProductDiscountClientRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-client/domain/applied-product-discount-client.repository.interface";
import { IAppliedProductDiscountRangeRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.repository.interface";
import { AppliedProductDiscountRangeCreateProps } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.types";

import { IProductDiscountRangeRepository } from "@src/modules/features/products/assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import { IProductDiscountClientRepository } from "@src/modules/features/client/assigments/product-discount-client/domain/product-discount-client.repository.interface";

import { PurchasedOrderProductProps } from "../../../assigments/purchased-order-product/domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../../assigments/purchased-order-product/domain/purchased-order-product.respository.interface";

import { IClientAddressRepository } from "@src/modules/features/client/assigments/client-addresses/domain/client-address.repository.interface";
import { ClientAddressProps } from "@src/modules/features/client/assigments/client-addresses/domain/client-address.types";

import { GetClientByIdUseCase } from "@src/modules/core/client/application/use-cases/get-client-by-id.usecase";
import { GetClientAddressByIdUseCase } from "@src/modules/features/client/assigments/client-addresses/application/use-cases/get-client-address-by-id.usecase";

import { PurchasedOrderOrchestratorCreateDto } from "../dto/purchased-order-orchestrator.model.schema";

import { IPurchasedOrderRepository } from "../../../domain/purchased-order.repository.interface";
import { PurchasedOrderProps } from "../../../domain/purchased-order.types";

import { IClientRepository } from "@src/modules/core/client/domain/client.repository.interface";
import { ClientProps } from "@src/modules/core/client/domain/client.types";

import HttpError from "@src/shared/errors/http/http-error";

import { sequelize } from "@src/config/mysql/sequelize";
import { Transaction as sequelizeTx } from "sequelize";
import type { Transaction } from "sequelize";

import { CreatePurchasedOrderUseCase } from "../../../application/use-cases/create-purchased-order.usecase";
import { CreatePurchasedOrderProductUseCase } from "../../../assigments/purchased-order-product/application/use-cases/create-purchased-order-product.usecase";

import { IProductRepository } from "@src/modules/core/product/domain/product.repository.interface";
import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";

// ⚠️ Este tipo lo estás importando desde "products/orchestrator/domain".
// Si en realidad este tipo vive en "product-discounts-ranges", mejor cámbialo a ese lugar.
// Por ahora lo dejo EXACTO como lo tienes para no romper imports.
import { ProductDiscountRangeProps } from "@src/modules/features/products/orchestrator/domain/product-orchestrator.types";

interface ICreatePurchasedOrderOrchestratorUseCase {
    purchasedOrderRepo: IPurchasedOrderRepository;
    purchasedOrderProductRepo: IPurchasedOrderProductRepository;

    appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;

    clientAddressRepo: IClientAddressRepository;
    clientRepo: IClientRepository;

    productDiscountRangeRepo: IProductDiscountRangeRepository;
    productDiscountClientRepo: IProductDiscountClientRepository;

    productRepo: IProductRepository;
}

export class CreatePurchasedOrderOrchestratorUseCase {
    private readonly purchasedOrderRepo: IPurchasedOrderRepository;
    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;

    private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
    // private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;

    private readonly clientRepo: IClientRepository;
    private readonly clientAddressRepo: IClientAddressRepository;

    private readonly productDiscountRangeRepo: IProductDiscountRangeRepository;
    // private readonly productDiscountClientRepo: IProductDiscountClientRepository;

    private readonly productRepo: IProductRepository;

    private readonly createPurchasedOrderUseCase: CreatePurchasedOrderUseCase;
    private readonly getByIdClientUseCase: GetClientByIdUseCase;
    private readonly getByIdClientAddressUseCase: GetClientAddressByIdUseCase;
    private readonly createPurchasedOrderProductUseCase: CreatePurchasedOrderProductUseCase;

    constructor({
        appliedProductDiscountRangeRepo,
        // appliedProductDiscountClientRepo,
        purchasedOrderProductRepo,
        purchasedOrderRepo,
        clientAddressRepo,
        clientRepo,
        productDiscountRangeRepo,
        // productDiscountClientRepo,
        productRepo,
    }: ICreatePurchasedOrderOrchestratorUseCase) {
        // repos
        this.appliedProductDiscountRangeRepo = appliedProductDiscountRangeRepo;
        // this.appliedProductDiscountClientRepo = appliedProductDiscountClientRepo;

        this.purchasedOrderProductRepo = purchasedOrderProductRepo;
        this.purchasedOrderRepo = purchasedOrderRepo;

        this.clientAddressRepo = clientAddressRepo;
        this.clientRepo = clientRepo;

        this.productDiscountRangeRepo = productDiscountRangeRepo;
        // this.productDiscountClientRepo = productDiscountClientRepo;

        this.productRepo = productRepo;

        // use cases
        this.createPurchasedOrderUseCase = new CreatePurchasedOrderUseCase(this.purchasedOrderRepo);
        this.getByIdClientUseCase = new GetClientByIdUseCase(this.clientRepo);
        this.getByIdClientAddressUseCase = new GetClientAddressByIdUseCase(this.clientAddressRepo);

        this.createPurchasedOrderProductUseCase = new CreatePurchasedOrderProductUseCase({
            productRepo: this.productRepo,
            purchasedOrderProductRepo: this.purchasedOrderProductRepo,
            purchasedOrderRepo: this.purchasedOrderRepo,
        });
    }

    execute = async (data: PurchasedOrderOrchestratorCreateDto): Promise<PurchasedOrderProps> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: sequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ,
        });

        try {
            const { purchased_order, purchased_order_products } = data;

            // ✅ safe array (evita crash si viene undefined)
            const safeProducts = purchased_order_products ?? [];

            const validateClient: ClientProps | null =
                await this.getByIdClientUseCase.execute(purchased_order.client_id, tx);

            if (!validateClient) {
                throw new HttpError(404, "El cliente de la orden de compra no existe.");
            }

            const validateClientAddress: ClientAddressProps | null =
                await this.getByIdClientAddressUseCase.execute(purchased_order.client_address_id, tx);

            if (!validateClientAddress) {
                throw new HttpError(404, "La direccion del cliente para la orden de compra no existe.");
            }

            if (validateClientAddress.client_id !== validateClient.id) {
                throw new HttpError(404, "La direccion ingresada no pertenece al cliente de la orden de compra.");
            }

            const purchasedOrderCreateResponse: PurchasedOrderProps =
                await this.createPurchasedOrderUseCase.execute(purchased_order, tx);

            if (safeProducts.length) {
                for (const pop of safeProducts) {
                    const newPop = {
                        ...pop,
                        purchase_order_id: purchasedOrderCreateResponse.id,
                    };

                    const purchasedOrderProductResponse: PurchasedOrderProductProps =
                        await this.createPurchasedOrderProductUseCase.execute(newPop, tx);

                    // ✅ aplicar descuento por rango
                    if (pop.price_edit_source === "range") {
                        const productDiscountRanges: ProductDiscountRangeProps[] =
                            await this.productDiscountRangeRepo.findByProductId(pop.product_id, tx);

                        // ✅ Decimal vs Decimal
                        const qty = DecimalVO.from(pop.qty);

                        const discountRange: ProductDiscountRangeProps | undefined = productDiscountRanges.find((pdr) =>
                            pdr.min_qty.lte(qty) && qty.lte(pdr.max_qty)
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

                    // (Si después aplicas descuento por cliente, aquí va el bloque para "client")
                    // if (pop.price_edit_source === "client") { ... }
                }
            }

            await tx.commit();
            return purchasedOrderCreateResponse;
        } catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
