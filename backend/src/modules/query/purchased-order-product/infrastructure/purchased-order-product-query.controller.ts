import { GetByPurchasedPurchasedOrderProductQueryUseCase } from "../application/usecase/get-by-purchased-purchased-order-product-query.usecase";
import { GetByIdPurchasedOrderProductQueryUseCase } from "../application/usecase/get-by-id-purchased-order-product-query.usecase";
import { GetAllPurchasedOrderProductQueryUseCase } from "../application/usecase/get-all-purchased-order-product-query.usecase";
import { IPurchasedOrderProductQueryRespository } from "../domain/purchased-order-product-query.repository";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { PurchasedOrderProductQueryRepository } from "./purchased-order-product-query.repository";
import {
    GetAllPurchasedOrderProductQuerySchema, GetByIdPurchasedOrderProductQuerySchema,
    GetByPurchasedOrderIdPurchasedOrderProductQuerySchema
} from "./../application/dto/purchased-order-product-query.endpoint.schema"

export class PurchasedOrderProductQueryController {

    private readonly purchasedOrderProductRepo: IPurchasedOrderProductQueryRespository;
    private readonly getAllPurchasedOrderProductQueryUseCase: GetAllPurchasedOrderProductQueryUseCase;
    private readonly getByIdPurchasedOrderProductQueryUseCase: GetByIdPurchasedOrderProductQueryUseCase;
    private readonly getByPurchasedPurchasedOrderProductQueryUseCase: GetByPurchasedPurchasedOrderProductQueryUseCase;

    constructor() {
        this.purchasedOrderProductRepo = new PurchasedOrderProductQueryRepository();
        this.getAllPurchasedOrderProductQueryUseCase = new GetAllPurchasedOrderProductQueryUseCase(this.purchasedOrderProductRepo);
        this.getByIdPurchasedOrderProductQueryUseCase = new GetByIdPurchasedOrderProductQueryUseCase(this.purchasedOrderProductRepo);
        this.getByPurchasedPurchasedOrderProductQueryUseCase = new GetByPurchasedPurchasedOrderProductQueryUseCase(this.purchasedOrderProductRepo);
    };

    getAll = async (_req: ApiRequest<GetAllPurchasedOrderProductQuerySchema>, res: ApiResponse<GetAllPurchasedOrderProductQuerySchema>) => {
        const purchasedOrderProductQueryResponse = await this.getAllPurchasedOrderProductQueryUseCase.execute();
        return res.status(200).json(purchasedOrderProductQueryResponse);
    };

    getById = async (req: ApiRequest<GetByIdPurchasedOrderProductQuerySchema>, res: ApiResponse<GetByIdPurchasedOrderProductQuerySchema>) => {
        const { id }: GetByIdPurchasedOrderProductQuerySchema["params"] = req.params;
        const purchasedOrderProductQueryResponse = await this.getByIdPurchasedOrderProductQueryUseCase.execute(Number(id));
        return res.status(200).json(purchasedOrderProductQueryResponse);
    };
    getPurchasedOrder = async (req: ApiRequest<GetByPurchasedOrderIdPurchasedOrderProductQuerySchema>, res: ApiResponse<GetByPurchasedOrderIdPurchasedOrderProductQuerySchema>) => {
        const { purchase_order_id }: GetByPurchasedOrderIdPurchasedOrderProductQuerySchema["params"] = req.params;
        const purchasedOrderProductQueryResponse = await this.getByPurchasedPurchasedOrderProductQueryUseCase.execute(Number(purchase_order_id));
        return res.status(200).json(purchasedOrderProductQueryResponse);
    };
};