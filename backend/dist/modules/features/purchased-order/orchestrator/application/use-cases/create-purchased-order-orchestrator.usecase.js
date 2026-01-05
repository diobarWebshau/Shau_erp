"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchasedOrderOrchestratorUseCase = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@src/config/mysql/sequelize");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
;
class CreatePurchasedOrderOrchestratorUseCase {
    purchasedOrderRepo;
    purchasedOrderProductRepo;
    appliedProductDiscountRangeRepo;
    productDiscountRangeRepo;
    // private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    // private readonly productDiscountClientRepo: IProductDiscountClientRepository;
    clientRepo;
    clientAddressRepo;
    constructor({ appliedProductDiscountRangeRepo, purchasedOrderProductRepo, purchasedOrderRepo, clientAddressRepo, clientRepo, productDiscountRangeRepo,
    // productDiscountClientRepo, appliedProductDiscountClientRepo
     }) {
        // this.appliedProductDiscountClientRepo = appliedProductDiscountClientRepo;
        this.appliedProductDiscountRangeRepo = appliedProductDiscountRangeRepo;
        this.purchasedOrderProductRepo = purchasedOrderProductRepo;
        this.productDiscountRangeRepo = productDiscountRangeRepo;
        this.purchasedOrderRepo = purchasedOrderRepo;
        this.clientAddressRepo = clientAddressRepo;
        this.clientRepo = clientRepo;
        // this.productDiscountClientRepo = productDiscountClientRepo;
    }
    ;
    execute = async (data) => {
        const tx = await sequelize_2.sequelize.transaction({
            isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { purchased_order, purchased_order_products } = data;
            const validateClient = await this.clientRepo.findById(purchased_order.client_id, tx);
            if (!validateClient)
                throw new http_error_1.default(404, "El cliente de la orden de compra no existe.");
            const validateClientAddress = await this.clientAddressRepo.findById(purchased_order.client_address_id, tx);
            if (!validateClientAddress)
                throw new http_error_1.default(404, "La direccion del cliente para la orde de compra no existe.");
            if (validateClientAddress.client_id !== validateClient.id) {
                throw new http_error_1.default(404, "La direccion ingresada no pertenece al cliente de la orden de compra.");
            }
            const purchasedOrderCreateResponse = await this.purchasedOrderRepo.create(purchased_order, tx);
            if (purchased_order_products.length) {
                for (const pop of purchased_order_products) {
                    const newPop = {
                        ...pop,
                        purchase_order_id: purchasedOrderCreateResponse.id,
                    };
                    const purchasedOrderProductResponse = await this.purchasedOrderProductRepo.create(newPop, tx);
                    if (pop.price_edit_source === "range") {
                        const productDiscountRanges = await this.productDiscountRangeRepo.findByProductId(pop.product_id, tx);
                        const discountRange = productDiscountRanges.find((pdr) => pdr.min_qty <= pop.qty && pop.qty <= pdr.max_qty);
                        if (discountRange) {
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
            }
            await tx.commit();
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.CreatePurchasedOrderOrchestratorUseCase = CreatePurchasedOrderOrchestratorUseCase;
;
