import { GetByIdPurchasedOrderUseCase } from "../../application/use-cases/get-by-id-purchased-order.usecase";
import { PurchasedOrderCreateProps, PurchasedOrderUpdateProps } from "../../domain/purchased-order.types";
import { GetAllPurchasedOrderUseCase } from "../../application/use-cases/get-all-purchased-order.usecase";
import { CreatePurchasedOrderUseCase } from "../../application/use-cases/create-purchased-order.usecase";
import { DeletePurchasedOrderUseCase } from "../../application/use-cases/delete-purchased-order.usecase";
import { UpdatePurchasedOrderUseCase } from "../../application/use-cases/update-purchased-order.usecase";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { PurchasedOrderResponseschemaDto } from "../../application/dto/purchased-order.model.schema";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderRepository } from "../repository/purchased-order.repository";
import {
    CreatePurchasedOrderSchema, DeletePurchasedOrderSchema,
    GetAllPurchasedOrderSchema, GetByIdPurchasedOrderSchema,
    UpdatePurchasedOrderSchema
} from "./../../application/dto/purchased-order.endpoint.schema"

export class PurchasedOrderController {

    private readonly purchasedOrderRepo: IPurchasedOrderRepository;
    private readonly createPurchasedOrderUseCase: CreatePurchasedOrderUseCase;
    private readonly updatePurchasedOrderUseCase: UpdatePurchasedOrderUseCase;
    private readonly deletePurchasedOrderUseCase: DeletePurchasedOrderUseCase;
    private readonly getAllPurchasedOrderUseCase: GetAllPurchasedOrderUseCase;
    private readonly getByIdPurchasedOrderUseCase: GetByIdPurchasedOrderUseCase;

    constructor() {
        this.purchasedOrderRepo = new PurchasedOrderRepository();
        this.createPurchasedOrderUseCase = new CreatePurchasedOrderUseCase(this.purchasedOrderRepo);
        this.updatePurchasedOrderUseCase = new UpdatePurchasedOrderUseCase(this.purchasedOrderRepo);
        this.deletePurchasedOrderUseCase = new DeletePurchasedOrderUseCase(this.purchasedOrderRepo);
        this.getAllPurchasedOrderUseCase = new GetAllPurchasedOrderUseCase(this.purchasedOrderRepo);
        this.getByIdPurchasedOrderUseCase = new GetByIdPurchasedOrderUseCase(this.purchasedOrderRepo);
    };

    getAll = async (_req: ApiRequest<GetAllPurchasedOrderSchema>, res: ApiResponse<GetAllPurchasedOrderSchema>): Promise<ApiResponse<GetAllPurchasedOrderSchema>> => {
        const purchasedOrderResponses: PurchasedOrderResponseschemaDto[] = await this.getAllPurchasedOrderUseCase.execute();
        return res.status(200).json(purchasedOrderResponses);
    };
    getById = async (req: ApiRequest<GetByIdPurchasedOrderSchema>, res: ApiResponse<GetByIdPurchasedOrderSchema>): Promise<ApiResponse<GetByIdPurchasedOrderSchema>> => {
        const { id }: GetByIdPurchasedOrderSchema["params"] = req.params;
        const purchasedOrderResponse: PurchasedOrderResponseschemaDto | null = await this.getByIdPurchasedOrderUseCase.execute(Number(id));
        return res.status(200).json(purchasedOrderResponse);
    };
    create = async (req: ApiRequest<CreatePurchasedOrderSchema>, res: ApiResponse<CreatePurchasedOrderSchema>): Promise<ApiResponse<CreatePurchasedOrderSchema>> => {
        const body: CreatePurchasedOrderSchema["body"] = req.body;
        const bodyFormatted: PurchasedOrderCreateProps = {
            ...body,
            delivery_date: new Date(body.delivery_date)
        };
        const purchasedOrderCreateResponse: PurchasedOrderResponseschemaDto =
            await this.createPurchasedOrderUseCase.execute(bodyFormatted);
        return res.status(201).json(purchasedOrderCreateResponse);
    };
    update = async (req: ApiRequest<UpdatePurchasedOrderSchema>, res: ApiResponse<UpdatePurchasedOrderSchema>): Promise<ApiResponse<UpdatePurchasedOrderSchema>> => {
        const body: UpdatePurchasedOrderSchema["body"] = req.body;
        const { id }: UpdatePurchasedOrderSchema["params"] = req.params
        const { delivery_date, ...rest } = body;

        const bodyFormatted: PurchasedOrderUpdateProps = {
            ...rest,
            ...(delivery_date ? { delivery_date: new Date(delivery_date) } : {})
        };
        const purchasedOrderCreateResponse: PurchasedOrderResponseschemaDto =
            await this.updatePurchasedOrderUseCase.execute(Number(id), bodyFormatted);
        return res.status(200).json(purchasedOrderCreateResponse);
    };
    delete = async (req: ApiRequest<DeletePurchasedOrderSchema>, res: ApiResponse<DeletePurchasedOrderSchema>): Promise<ApiResponse<DeletePurchasedOrderSchema>> => {
        const { id }: DeletePurchasedOrderSchema["params"] = req.params;
        await this.deletePurchasedOrderUseCase.execute(Number(id));
        return res.status(200).json(null);
    };

}