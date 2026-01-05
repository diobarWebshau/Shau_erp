"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderProductController = void 0;
const get_by_purchased_purchased_order_product_usecase_1 = require("../../application/use-cases/get-by-purchased-purchased-order-product.usecase");
const purchased_order_repository_1 = require("@src/modules/features/purchased-order/infrastructure/repository/purchased-order.repository");
const get_by_id_purchased_order_product_usecase_1 = require("../../application/use-cases/get-by-id-purchased-order-product.usecase");
const create_purchased_order_product_usecase_1 = require("../../application/use-cases/create-purchased-order-product.usecase");
const update_purchased_order_product_usecase_1 = require("../../application/use-cases/update-purchased-order-product.usecase");
const delete_purchased_order_product_usecase_1 = require("../../application/use-cases/delete-purchased-order-product.usecase");
const get_all_purchased_order_product_usecase_1 = require("../../application/use-cases/get-all-purchased-order-product.usecase");
const producto_repository_1 = require("@src/modules/core/product/infrastructure/repository/producto.repository");
const purchased_order_product_respository_1 = require("../repository/purchased-order-product.respository");
class PurchasedOrderProductController {
    purchasedOrderProductRepo;
    purchasedOrderRepo;
    productRepo;
    getByPurchasedOrderIdPurchasedOrderProductUseCase;
    createPurchasedOrderProductUseCase;
    updatePurchasedOrderProductUseCase;
    deletePurchasedOrderProductUseCase;
    getAllPurchasedOrderProductUseCase;
    getByIdPurchasedOrderProductUseCase;
    constructor() {
        this.purchasedOrderProductRepo = new purchased_order_product_respository_1.PurchasedOrderProductRepository();
        this.purchasedOrderRepo = new purchased_order_repository_1.PurchasedOrderRepository();
        this.productRepo = new producto_repository_1.ProductRepository();
        this.createPurchasedOrderProductUseCase = new create_purchased_order_product_usecase_1.CreatePurchasedOrderProductUseCase({
            productRepo: this.productRepo,
            purchasedOrderProductRepo: this.purchasedOrderProductRepo,
            purchasedOrderRepo: this.purchasedOrderRepo
        });
        this.updatePurchasedOrderProductUseCase = new update_purchased_order_product_usecase_1.UpdatePurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
        this.deletePurchasedOrderProductUseCase = new delete_purchased_order_product_usecase_1.DeletePurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
        this.getAllPurchasedOrderProductUseCase = new get_all_purchased_order_product_usecase_1.GetAllPurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
        this.getByIdPurchasedOrderProductUseCase = new get_by_id_purchased_order_product_usecase_1.GetByIdPurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
        this.getByPurchasedOrderIdPurchasedOrderProductUseCase = new get_by_purchased_purchased_order_product_usecase_1.GetByPurchasedOrderIdPurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
    }
    ;
    getAll = async (_req, res) => {
        const purchasedOrderProductRepo = await this.getAllPurchasedOrderProductUseCase.execute();
        return res.status(200).json(purchasedOrderProductRepo);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const purchasedOrderProductRepo = await this.getByIdPurchasedOrderProductUseCase.execute(Number(id));
        return res.status(200).json(purchasedOrderProductRepo);
    };
    getByPurchasedOrderId = async (req, res) => {
        const { purchase_order_id } = req.params;
        const purchasedOrderProductRepo = await this.getByPurchasedOrderIdPurchasedOrderProductUseCase.execute(Number(purchase_order_id));
        return res.status(200).json(purchasedOrderProductRepo);
    };
    create = async (req, res) => {
        const body = req.body;
        const purchasedOrderProductRepo = await this.createPurchasedOrderProductUseCase.execute(body);
        return res.status(201).json(purchasedOrderProductRepo);
    };
    update = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const purchasedOrderProductRepo = await this.updatePurchasedOrderProductUseCase.execute(Number(id), body);
        return res.status(200).json(purchasedOrderProductRepo);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deletePurchasedOrderProductUseCase.execute(Number(id));
        return res.status(200).json(null);
    };
}
exports.PurchasedOrderProductController = PurchasedOrderProductController;
;
