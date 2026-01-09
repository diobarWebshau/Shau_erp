import { GetByIdPurchasedOrderUseCase } from "../../application/use-cases/get-by-id-purchased-order.usecase";
import { GetAllPurchasedOrderUseCase } from "../../application/use-cases/get-all-purchased-order.usecase";
import { CreatePurchasedOrderUseCase } from "../../application/use-cases/create-purchased-order.usecase";
import { DeletePurchasedOrderUseCase } from "../../application/use-cases/delete-purchased-order.usecase";
import { UpdatePurchasedOrderUseCase } from "../../application/use-cases/update-purchased-order.usecase";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { PurchasedOrderResponseDto } from "../../application/dto/purchased-order.model.schema";
import { IPurchasedOrderRepository } from "../../domain/purchased-order.repository.interface";
import { PurchasedOrderRepository } from "../repository/purchased-order.repository";
import { PurchasedOrderProps } from "../../domain/purchased-order.types";
import {
    CreatePurchasedOrderSchema, DeletePurchasedOrderSchema,
    GetAllPurchasedOrderSchema, GetByIdPurchasedOrderSchema,
    UpdatePurchasedOrderSchema
} from "./../../application/dto/purchased-order.endpoint.schema";

const mapPurchasedOrderDomainToDto = (data: PurchasedOrderProps): PurchasedOrderResponseDto => {
    const { delivery_date, total_price, created_at, updated_at, ...poRest } = data;
    return ({
        ...poRest,
        delivery_date: delivery_date ? delivery_date.toISOString() : null,
        total_price: total_price.toString(),
        created_at: created_at.toISOString(),
        updated_at: updated_at.toISOString()
    });
}

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
        const purchasedOrderResponses: PurchasedOrderProps[] = await this.getAllPurchasedOrderUseCase.execute();
        const purchasedOrderResults = purchasedOrderResponses.map(mapPurchasedOrderDomainToDto);
        return res.status(200).json(purchasedOrderResults);
    };
    getById = async (req: ApiRequest<GetByIdPurchasedOrderSchema>, res: ApiResponse<GetByIdPurchasedOrderSchema>): Promise<ApiResponse<GetByIdPurchasedOrderSchema>> => {
        const { id }: GetByIdPurchasedOrderSchema["params"] = req.params;
        const purchasedOrderResponse: PurchasedOrderProps | null = await this.getByIdPurchasedOrderUseCase.execute(Number(id));
        if (!purchasedOrderResponse) return res.status(404).json(null);
        const purchasedOrderResult = mapPurchasedOrderDomainToDto(purchasedOrderResponse);
        return res.status(200).json(purchasedOrderResult);
    };
    create = async (req: ApiRequest<CreatePurchasedOrderSchema>, res: ApiResponse<CreatePurchasedOrderSchema>): Promise<ApiResponse<CreatePurchasedOrderSchema>> => {
        const body: CreatePurchasedOrderSchema["body"] = req.body;
        const purchasedOrderCreateResponse: PurchasedOrderProps = await this.createPurchasedOrderUseCase.execute(body);
        const purchasedOrderResult = mapPurchasedOrderDomainToDto(purchasedOrderCreateResponse);
        return res.status(201).json(purchasedOrderResult);
    };
    update = async (req: ApiRequest<UpdatePurchasedOrderSchema>, res: ApiResponse<UpdatePurchasedOrderSchema>): Promise<ApiResponse<UpdatePurchasedOrderSchema>> => {
        const body: UpdatePurchasedOrderSchema["body"] = req.body;
        const { id }: UpdatePurchasedOrderSchema["params"] = req.params
        const purchasedOrderCreateResponse: PurchasedOrderProps = await this.updatePurchasedOrderUseCase.execute(Number(id), body);
        const purchasedOrderResult = mapPurchasedOrderDomainToDto(purchasedOrderCreateResponse);
        return res.status(200).json(purchasedOrderResult);
    };
    delete = async (req: ApiRequest<DeletePurchasedOrderSchema>, res: ApiResponse<DeletePurchasedOrderSchema>): Promise<ApiResponse<DeletePurchasedOrderSchema>> => {
        const { id }: DeletePurchasedOrderSchema["params"] = req.params;
        await this.deletePurchasedOrderUseCase.execute(Number(id));
        return res.status(200).json(null);
    };

}