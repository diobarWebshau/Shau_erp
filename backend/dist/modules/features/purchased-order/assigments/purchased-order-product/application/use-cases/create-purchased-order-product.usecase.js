"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchasedOrderProductUseCase = void 0;
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
class CreatePurchasedOrderProductUseCase {
    purchasedOrderProductRepo;
    productRepo;
    purchasedOrderRepo;
    constructor({ productRepo, purchasedOrderProductRepo, purchasedOrderRepo }) {
        this.purchasedOrderProductRepo = purchasedOrderProductRepo;
        this.productRepo = productRepo;
        this.purchasedOrderRepo = purchasedOrderRepo;
    }
    ;
    execute = async (data, tx) => {
        const validatePurchasedOrder = await this.purchasedOrderRepo.findById(data.purchase_order_id, tx);
        if (!validatePurchasedOrder)
            throw new http_error_1.default(404, "No fue posible encontrar el producto que se desea añadir a la orden de compra.");
        const validateProduct = await this.productRepo.findById(data.product_id, tx);
        if (!validateProduct)
            throw new http_error_1.default(404, "No fue posible encontrar el producto que se desea añadir a la orden de compra.");
        const purchasedOrderProductResponse = await this.purchasedOrderProductRepo.create(data, tx);
        return purchasedOrderProductResponse;
    };
}
exports.CreatePurchasedOrderProductUseCase = CreatePurchasedOrderProductUseCase;
;
