"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderController = void 0;
const get_by_id_purchased_order_usecase_1 = require("../../application/use-cases/get-by-id-purchased-order.usecase");
const get_all_purchased_order_usecase_1 = require("../../application/use-cases/get-all-purchased-order.usecase");
const create_purchased_order_usecase_1 = require("../../application/use-cases/create-purchased-order.usecase");
const delete_purchased_order_usecase_1 = require("../../application/use-cases/delete-purchased-order.usecase");
const update_purchased_order_usecase_1 = require("../../application/use-cases/update-purchased-order.usecase");
const purchased_order_repository_1 = require("../repository/purchased-order.repository");
class PurchasedOrderController {
    purchasedOrderRepo;
    createPurchasedOrderUseCase;
    updatePurchasedOrderUseCase;
    deletePurchasedOrderUseCase;
    getAllPurchasedOrderUseCase;
    getByIdPurchasedOrderUseCase;
    constructor() {
        this.purchasedOrderRepo = new purchased_order_repository_1.PurchasedOrderRepository();
        this.createPurchasedOrderUseCase = new create_purchased_order_usecase_1.CreatePurchasedOrderUseCase(this.purchasedOrderRepo);
        this.updatePurchasedOrderUseCase = new update_purchased_order_usecase_1.UpdatePurchasedOrderUseCase(this.purchasedOrderRepo);
        this.deletePurchasedOrderUseCase = new delete_purchased_order_usecase_1.DeletePurchasedOrderUseCase(this.purchasedOrderRepo);
        this.getAllPurchasedOrderUseCase = new get_all_purchased_order_usecase_1.GetAllPurchasedOrderUseCase(this.purchasedOrderRepo);
        this.getByIdPurchasedOrderUseCase = new get_by_id_purchased_order_usecase_1.GetByIdPurchasedOrderUseCase(this.purchasedOrderRepo);
    }
    ;
    getAll = async (_req, res) => {
        const purchasedOrderResponses = await this.getAllPurchasedOrderUseCase.execute();
        return res.status(200).json(purchasedOrderResponses);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const purchasedOrderResponse = await this.getByIdPurchasedOrderUseCase.execute(Number(id));
        return res.status(200).json(purchasedOrderResponse);
    };
    create = async (req, res) => {
        const body = req.body;
        const bodyFormatted = {
            ...body,
            delivery_date: new Date(body.delivery_date)
        };
        const purchasedOrderCreateResponse = await this.createPurchasedOrderUseCase.execute(bodyFormatted);
        return res.status(201).json(purchasedOrderCreateResponse);
    };
    update = async (req, res) => {
        const body = req.body;
        const { id } = req.params;
        const { delivery_date, ...rest } = body;
        const bodyFormatted = {
            ...rest,
            ...(delivery_date ? { delivery_date: new Date(delivery_date) } : {})
        };
        const purchasedOrderCreateResponse = await this.updatePurchasedOrderUseCase.execute(Number(id), bodyFormatted);
        return res.status(200).json(purchasedOrderCreateResponse);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deletePurchasedOrderUseCase.execute(Number(id));
        return res.status(200).json(null);
    };
}
exports.PurchasedOrderController = PurchasedOrderController;
