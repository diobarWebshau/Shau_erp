"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePurchasedOrderOrchestratorUseCase = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@src/config/mysql/sequelize");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
class UpdatePurchasedOrderOrchestratorUseCase {
    purchasedOrderRepo;
    purchasedOrderProductRepo;
    appliedProductDiscountRangeRepo;
    productDiscountRangeRepo;
    // private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    // private readonly productDiscountClientRepo: IProductDiscountClientRepository;
    //   private readonly clientRepo: IClientRepository;
    //   private readonly clientAddressRepo: IClientAddressRepository;
    constructor({ appliedProductDiscountRangeRepo, purchasedOrderProductRepo, purchasedOrderRepo, 
    // clientAddressRepo,
    // clientRepo,
    productDiscountRangeRepo,
    // productDiscountClientRepo,
    // appliedProductDiscountClientRepo,
     }) {
        this.appliedProductDiscountRangeRepo = appliedProductDiscountRangeRepo;
        this.purchasedOrderProductRepo = purchasedOrderProductRepo;
        this.productDiscountRangeRepo = productDiscountRangeRepo;
        this.purchasedOrderRepo = purchasedOrderRepo;
        // this.clientAddressRepo = clientAddressRepo;
        // this.clientRepo = clientRepo;
    }
    execute = async (id, data) => {
        const tx = await sequelize_2.sequelize.transaction({
            isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
        });
        try {
            const { purchased_order, purchased_order_products_manager } = data;
            const responseUpdatePurchasedOrder = await this.purchasedOrderRepo.update(id, purchased_order, tx);
            const adds = purchased_order_products_manager?.added ?? [];
            const updated = purchased_order_products_manager?.updated ?? [];
            const deleted = purchased_order_products_manager?.deleted ?? [];
            const isChangeProducts = adds.length > 0 || updated.length > 0 || deleted.length > 0;
            if (isChangeProducts) {
                // ----------------------------
                // ADDED
                // ----------------------------
                if (adds.length) {
                    for (const pop of adds) {
                        const newPop = {
                            ...pop,
                            purchase_order_id: responseUpdatePurchasedOrder.id,
                        };
                        const purchasedOrderProductResponse = await this.purchasedOrderProductRepo.create(newPop, tx);
                        if (pop.price_edit_source === "range") {
                            const productDiscountRanges = await this.productDiscountRangeRepo.findByProductId(pop.product_id, tx);
                            const qty = Number(pop.qty);
                            const discountRange = productDiscountRanges.find((r) => Number(r.min_qty) <= qty && qty <= Number(r.max_qty));
                            if (!discountRange) {
                                throw new http_error_1.default(400, "No existe un descuento por rango aplicable para la cantidad ingresada.");
                            }
                            const newApdr = {
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
                            throw new http_error_1.default(404, "El producto de la orden de compra no existe.");
                        }
                        // 2) Estado final (merge)
                        const nextPop = { ...currentPop, ...rest };
                        // 3) Actualizar el POP
                        await this.purchasedOrderProductRepo.update(purchaseOrderProductId, rest, tx);
                        // 4) Traer applied una sola vez (para update/create o delete)
                        const existingApplied = await this.appliedProductDiscountRangeRepo.findByPopId(purchaseOrderProductId, tx);
                        if (nextPop.price_edit_source === "range") {
                            const productDiscountRanges = await this.productDiscountRangeRepo.findByProductId(nextPop.product_id, tx);
                            const qty = Number(nextPop.qty);
                            const discountRange = productDiscountRanges.find((r) => Number(r.min_qty) <= qty && qty <= Number(r.max_qty));
                            if (!discountRange) {
                                throw new http_error_1.default(400, "No existe un descuento por rango aplicable para la cantidad ingresada.");
                            }
                            const payload = {
                                purchase_order_product_id: purchaseOrderProductId,
                                max_qty: discountRange.max_qty,
                                min_qty: discountRange.min_qty,
                                product_discount_range_id: discountRange.id,
                                unit_discount: discountRange.unit_price,
                            };
                            if (existingApplied) {
                                await this.appliedProductDiscountRangeRepo.update(existingApplied.id, payload, tx);
                            }
                            else {
                                await this.appliedProductDiscountRangeRepo.create(payload, tx);
                            }
                        }
                        else {
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
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.UpdatePurchasedOrderOrchestratorUseCase = UpdatePurchasedOrderOrchestratorUseCase;
