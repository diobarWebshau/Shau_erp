"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchasedOrderOrchestratorUseCase = void 0;
const get_client_by_id_usecase_1 = require("@src/modules/core/client/application/use-cases/get-client-by-id.usecase");
const get_client_address_by_id_usecase_1 = require("@src/modules/features/client/assigments/client-addresses/application/use-cases/get-client-address-by-id.usecase");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const sequelize_1 = require("@src/config/mysql/sequelize");
const sequelize_2 = require("sequelize");
const create_purchased_order_usecase_1 = require("../../../application/use-cases/create-purchased-order.usecase");
const create_purchased_order_product_usecase_1 = require("../../../assigments/purchased-order-product/application/use-cases/create-purchased-order-product.usecase");
const decimal_vo_1 = require("@src/shared/domain/value-objects/decimal.vo");
class CreatePurchasedOrderOrchestratorUseCase {
    purchasedOrderRepo;
    purchasedOrderProductRepo;
    appliedProductDiscountRangeRepo;
    // private readonly appliedProductDiscountClientRepo: IAppliedProductDiscountClientRepository;
    clientRepo;
    clientAddressRepo;
    productDiscountRangeRepo;
    // private readonly productDiscountClientRepo: IProductDiscountClientRepository;
    productRepo;
    createPurchasedOrderUseCase;
    getByIdClientUseCase;
    getByIdClientAddressUseCase;
    createPurchasedOrderProductUseCase;
    constructor({ appliedProductDiscountRangeRepo, 
    // appliedProductDiscountClientRepo,
    purchasedOrderProductRepo, purchasedOrderRepo, clientAddressRepo, clientRepo, productDiscountRangeRepo, 
    // productDiscountClientRepo,
    productRepo, }) {
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
        this.createPurchasedOrderUseCase = new create_purchased_order_usecase_1.CreatePurchasedOrderUseCase(this.purchasedOrderRepo);
        this.getByIdClientUseCase = new get_client_by_id_usecase_1.GetClientByIdUseCase(this.clientRepo);
        this.getByIdClientAddressUseCase = new get_client_address_by_id_usecase_1.GetClientAddressByIdUseCase(this.clientAddressRepo);
        this.createPurchasedOrderProductUseCase = new create_purchased_order_product_usecase_1.CreatePurchasedOrderProductUseCase({
            productRepo: this.productRepo,
            purchasedOrderProductRepo: this.purchasedOrderProductRepo,
            purchasedOrderRepo: this.purchasedOrderRepo,
        });
    }
    execute = async (data) => {
        const tx = await sequelize_1.sequelize.transaction({
            isolationLevel: sequelize_2.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
        });
        try {
            const { purchased_order, purchased_order_products } = data;
            // ✅ safe array (evita crash si viene undefined)
            const safeProducts = purchased_order_products ?? [];
            const validateClient = await this.getByIdClientUseCase.execute(purchased_order.client_id, tx);
            if (!validateClient) {
                throw new http_error_1.default(404, "El cliente de la orden de compra no existe.");
            }
            const validateClientAddress = await this.getByIdClientAddressUseCase.execute(purchased_order.client_address_id, tx);
            if (!validateClientAddress) {
                throw new http_error_1.default(404, "La direccion del cliente para la orden de compra no existe.");
            }
            if (validateClientAddress.client_id !== validateClient.id) {
                throw new http_error_1.default(404, "La direccion ingresada no pertenece al cliente de la orden de compra.");
            }
            const purchasedOrderCreateResponse = await this.createPurchasedOrderUseCase.execute(purchased_order, tx);
            if (safeProducts.length) {
                for (const pop of safeProducts) {
                    const newPop = {
                        ...pop,
                        purchase_order_id: purchasedOrderCreateResponse.id,
                    };
                    const purchasedOrderProductResponse = await this.createPurchasedOrderProductUseCase.execute(newPop, tx);
                    // ✅ aplicar descuento por rango
                    if (pop.price_edit_source === "range") {
                        const productDiscountRanges = await this.productDiscountRangeRepo.findByProductId(pop.product_id, tx);
                        // ✅ Decimal vs Decimal
                        const qty = decimal_vo_1.DecimalVO.from(pop.qty);
                        const discountRange = productDiscountRanges.find((pdr) => pdr.min_qty.lte(qty) && qty.lte(pdr.max_qty));
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
                    // (Si después aplicas descuento por cliente, aquí va el bloque para "client")
                    // if (pop.price_edit_source === "client") { ... }
                }
            }
            await tx.commit();
            return purchasedOrderCreateResponse;
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.CreatePurchasedOrderOrchestratorUseCase = CreatePurchasedOrderOrchestratorUseCase;
