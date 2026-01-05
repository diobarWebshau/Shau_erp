import { IAppliedProductDiscountClientRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-client/domain/applied-product-discount-client.repository.interface";
import { IAppliedProductDiscountRangeRepository } from "../../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.repository.interface";
import { IProductDiscountRangeRepository } from "@src/modules/features/products/assigments/product-discounts-ranges/domain/product-discount-range.repository.interface";
import {
  PurchasedOrderProductCreateProps,
  PurchasedOrderProductProps,
} from "../../../assigments/purchased-order-product/domain/purchased-order-product.types";
import { IPurchasedOrderProductRepository } from "../../../assigments/purchased-order-product/domain/purchased-order-product.respository.interface";
// import { IClientAddressRepository } from "@src/modules/features/client/assigments/client-addresses/domain/client-address.repository.interface";
import {
  PurchasedOrderProductCreateOrchestratorProps,
  PurchasedOrderProductUpdateOrchestratorProps,
  PurchasedOrderUpdateOrchestratorProps,
} from "../../domain/purchased-order-orchestrator.types";
import { IPurchasedOrderRepository } from "../../../domain/purchased-order.repository.interface";
// import { IClientRepository } from "@src/modules/core/client/domain/client.repository.interface";
import type { Transaction } from "sequelize";
import { Transaction as sequelizeTx } from "sequelize";
import { sequelize } from "@src/config/mysql/sequelize";
import HttpError from "@src/shared/errors/http/http-error";
import { PurchasedOrderProps } from "../../../domain/purchased-order.types";
import {
  AppliedProductDiscountRangeCreateProps,
} from "../../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.types";
import { IProductDiscountClientRepository } from "@src/modules/features/client/assigments/product-discount-client/domain/product-discount-client.repository.interface";
import { ProductDiscountRangeProps } from "@src/modules/features/products/orchestrator/domain/product-orchestrator.types";

interface IUpdatePurchasedOrderOrchestratorUseCase {
  purchasedOrderRepo: IPurchasedOrderRepository;
  purchasedOrderProductRepo: IPurchasedOrderProductRepository;
  appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
  appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
//   clientAddressRepo: IClientAddressRepository;
//   clientRepo: IClientRepository;
  productDiscountRangeRepo: IProductDiscountRangeRepository;
  productDiscountClientRepo: IProductDiscountClientRepository;
}

export class UpdatePurchasedOrderOrchestratorUseCase {
  private readonly purchasedOrderRepo: IPurchasedOrderRepository;
  private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
  private readonly appliedProductDiscountRangeRepo: IAppliedProductDiscountRangeRepository;
  private readonly productDiscountRangeRepo: IProductDiscountRangeRepository;

  // private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
  // private readonly productDiscountClientRepo: IProductDiscountClientRepository;
//   private readonly clientRepo: IClientRepository;
//   private readonly clientAddressRepo: IClientAddressRepository;

  constructor({
    appliedProductDiscountRangeRepo,
    purchasedOrderProductRepo,
    purchasedOrderRepo,
    // clientAddressRepo,
    // clientRepo,
    productDiscountRangeRepo,
    // productDiscountClientRepo,
    // appliedProductDiscountClientRepo,
  }: IUpdatePurchasedOrderOrchestratorUseCase) {
    this.appliedProductDiscountRangeRepo = appliedProductDiscountRangeRepo;
    this.purchasedOrderProductRepo = purchasedOrderProductRepo;
    this.productDiscountRangeRepo = productDiscountRangeRepo;
    this.purchasedOrderRepo = purchasedOrderRepo;
    // this.clientAddressRepo = clientAddressRepo;
    // this.clientRepo = clientRepo;
  }

  execute = async (id: number, data: PurchasedOrderUpdateOrchestratorProps): Promise<void> => {
    const tx: Transaction = await sequelize.transaction({
      isolationLevel: sequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ,
    });

    try {
      const { purchased_order, purchased_order_products_manager } = data;

      const responseUpdatePurchasedOrder: PurchasedOrderProps =
        await this.purchasedOrderRepo.update(id, purchased_order, tx);

      const adds: PurchasedOrderProductCreateOrchestratorProps[] =
        purchased_order_products_manager?.added ?? [];
      const updated: PurchasedOrderProductUpdateOrchestratorProps[] =
        purchased_order_products_manager?.updated ?? [];
      const deleted: PurchasedOrderProductProps[] =
        purchased_order_products_manager?.deleted ?? [];

      const isChangeProducts = adds.length > 0 || updated.length > 0 || deleted.length > 0;

      if (isChangeProducts) {
        // ----------------------------
        // ADDED
        // ----------------------------
        if (adds.length) {
          for (const pop of adds) {
            const newPop: PurchasedOrderProductCreateProps = {
              ...pop,
              purchase_order_id: responseUpdatePurchasedOrder.id,
            };

            const purchasedOrderProductResponse: PurchasedOrderProductProps =
              await this.purchasedOrderProductRepo.create(newPop, tx);

            if (pop.price_edit_source === "range") {
              const productDiscountRanges: ProductDiscountRangeProps[] =
                await this.productDiscountRangeRepo.findByProductId(pop.product_id, tx);

              const qty = Number(pop.qty);
              const discountRange = productDiscountRanges.find((r) =>
                Number(r.min_qty) <= qty && qty <= Number(r.max_qty)
              );

              if (!discountRange) {
                throw new HttpError(
                  400,
                  "No existe un descuento por rango aplicable para la cantidad ingresada."
                );
              }

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

        // ----------------------------
        // UPDATED
        // ----------------------------
        if (updated.length) {
          for (const popPatch of updated) {
            const { id: purchaseOrderProductId, ...rest } = popPatch;

            // 1) Traer estado actual para calcular el estado final
            const currentPop = await this.purchasedOrderProductRepo.findById(purchaseOrderProductId, tx);
            if (!currentPop) {
              throw new HttpError(404, "El producto de la orden de compra no existe.");
            }

            // 2) Estado final (merge)
            const nextPop = { ...currentPop, ...rest };

            // 3) Actualizar el POP
            await this.purchasedOrderProductRepo.update(purchaseOrderProductId, rest, tx);

            // 4) Traer applied una sola vez (para update/create o delete)
            const existingApplied = await this.appliedProductDiscountRangeRepo.findByPopId(
              purchaseOrderProductId,
              tx
            );

            if (nextPop.price_edit_source === "range") {
              const productDiscountRanges: ProductDiscountRangeProps[] =
                await this.productDiscountRangeRepo.findByProductId(nextPop.product_id, tx);

              const qty = Number(nextPop.qty);
              const discountRange = productDiscountRanges.find((r) =>
                Number(r.min_qty) <= qty && qty <= Number(r.max_qty)
              );

              if (!discountRange) {
                throw new HttpError(
                  400,
                  "No existe un descuento por rango aplicable para la cantidad ingresada."
                );
              }

              const payload: AppliedProductDiscountRangeCreateProps = {
                purchase_order_product_id: purchaseOrderProductId,
                max_qty: discountRange.max_qty,
                min_qty: discountRange.min_qty,
                product_discount_range_id: discountRange.id,
                unit_discount: discountRange.unit_price,
              };

              if (existingApplied) {
                await this.appliedProductDiscountRangeRepo.update(existingApplied.id, payload, tx);
              } else {
                await this.appliedProductDiscountRangeRepo.create(payload, tx);
              }
            } else {
              // Si ya no es range, no debe existir el registro applied range
              if (existingApplied) {
                await this.appliedProductDiscountRangeRepo.delete(existingApplied.id, tx);
              }
            }
          }
        }

        // ----------------------------
        // DELETED
        // ----------------------------
        // Con ON DELETE CASCADE, esto basta.
        if (deleted.length) {
          for (const pop of deleted) {
            const { id: purchaseOrderProductId } = pop;
            await this.purchasedOrderProductRepo.delete(purchaseOrderProductId, tx);
          }
        }
      }

      await tx.commit();
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  };
}
