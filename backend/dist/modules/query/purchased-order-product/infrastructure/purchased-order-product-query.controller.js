"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderProductQueryController = void 0;
const get_by_purchased_purchased_order_product_query_usecase_1 = require("../application/usecase/get-by-purchased-purchased-order-product-query.usecase");
const get_by_id_purchased_order_product_query_usecase_1 = require("../application/usecase/get-by-id-purchased-order-product-query.usecase");
const get_all_purchased_order_product_query_usecase_1 = require("../application/usecase/get-all-purchased-order-product-query.usecase");
const purchased_order_product_query_repository_1 = require("./purchased-order-product-query.repository");
class PurchasedOrderProductQueryController {
    purchasedOrderProductRepo;
    getAllPurchasedOrderProductQueryUseCase;
    getByIdPurchasedOrderProductQueryUseCase;
    getByPurchasedPurchasedOrderProductQueryUseCase;
    constructor() {
        this.purchasedOrderProductRepo = new purchased_order_product_query_repository_1.PurchasedOrderProductQueryRepository();
        this.getAllPurchasedOrderProductQueryUseCase = new get_all_purchased_order_product_query_usecase_1.GetAllPurchasedOrderProductQueryUseCase(this.purchasedOrderProductRepo);
        this.getByIdPurchasedOrderProductQueryUseCase = new get_by_id_purchased_order_product_query_usecase_1.GetByIdPurchasedOrderProductQueryUseCase(this.purchasedOrderProductRepo);
        this.getByPurchasedPurchasedOrderProductQueryUseCase = new get_by_purchased_purchased_order_product_query_usecase_1.GetByPurchasedPurchasedOrderProductQueryUseCase(this.purchasedOrderProductRepo);
    }
    ;
    getAll = async (_req, res) => {
        const purchasedOrderProductQueryResponse = await this.getAllPurchasedOrderProductQueryUseCase.execute();
        return res.status(200).json(purchasedOrderProductQueryResponse);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const purchasedOrderProductQueryResponse = await this.getByIdPurchasedOrderProductQueryUseCase.execute(Number(id));
        return res.status(200).json(purchasedOrderProductQueryResponse);
    };
    getPurchasedOrder = async (req, res) => {
        const { purchase_order_id } = req.params;
        const purchasedOrderProductQueryResponse = await this.getByPurchasedPurchasedOrderProductQueryUseCase.execute(Number(purchase_order_id));
        return res.status(200).json(purchasedOrderProductQueryResponse);
    };
}
exports.PurchasedOrderProductQueryController = PurchasedOrderProductQueryController;
;
