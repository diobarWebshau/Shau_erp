import { GetByPurchasedOrderIdPurchasedOrderProductUseCase } from "../../application/use-cases/get-by-purchased-purchased-order-product.usecase";
import { PurchasedOrderRepository } from "@src/modules/features/purchased-order/infrastructure/repository/purchased-order.repository";
import { IPurchasedOrderRepository } from "@src/modules/features/purchased-order/domain/purchased-order.repository.interface";
import { GetByIdPurchasedOrderProductUseCase } from "../../application/use-cases/get-by-id-purchased-order-product.usecase";
import { CreatePurchasedOrderProductUseCase } from "../../application/use-cases/create-purchased-order-product.usecase";
import { UpdatePurchasedOrderProductUseCase } from "../../application/use-cases/update-purchased-order-product.usecase";
import { DeletePurchasedOrderProductUseCase } from "../../application/use-cases/delete-purchased-order-product.usecase";
import { GetAllPurchasedOrderProductUseCase } from "../../application/use-cases/get-all-purchased-order-product.usecase";
import { PurchasedOrderProductResponseDto } from "../../application/dto/purchased-order-product.model.schema";
import { IPurchasedOrderProductRepository } from "../../domain/purchased-order-product.respository.interface";
import { ProductRepository } from "@src/modules/core/product/infrastructure/repository/producto.repository";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { PurchasedOrderProductRepository } from "../repository/purchased-order-product.respository";
import { IProductRepository } from "@src/modules/core/product/domain/product.repository.interface";
import {
    CreatePurchasedOrderProduct, DeletePurchasedOrderProduct, GetAllPurchasedOrderProduct,
    GetByIdPurchasedOrderProduct, GetByPurchasedIdPurchasedOrderProduct, UpdatePurchasedOrderProduct
} from "./../../application/dto/purchased-order-product.endpoint.schema"
import { PurchasedOrderProductProps } from "../../domain/purchased-order-product.types";

const mapPopDomainToDto = (data: PurchasedOrderProductProps): PurchasedOrderProductResponseDto => {
    return ({
        ...data,
        original_price: data.original_price.toString(),
        recorded_price: data.recorded_price.toString(),
        qty: data.qty.toString(),
    })
}

export class PurchasedOrderProductController {

    private readonly purchasedOrderProductRepo: IPurchasedOrderProductRepository;
    private readonly purchasedOrderRepo: IPurchasedOrderRepository;
    private readonly productRepo: IProductRepository;

    private readonly getByPurchasedOrderIdPurchasedOrderProductUseCase: GetByPurchasedOrderIdPurchasedOrderProductUseCase;
    private readonly createPurchasedOrderProductUseCase: CreatePurchasedOrderProductUseCase;
    private readonly updatePurchasedOrderProductUseCase: UpdatePurchasedOrderProductUseCase;
    private readonly deletePurchasedOrderProductUseCase: DeletePurchasedOrderProductUseCase;
    private readonly getAllPurchasedOrderProductUseCase: GetAllPurchasedOrderProductUseCase;
    private readonly getByIdPurchasedOrderProductUseCase: GetByIdPurchasedOrderProductUseCase;

    constructor() {
        this.purchasedOrderProductRepo = new PurchasedOrderProductRepository();
        this.purchasedOrderRepo = new PurchasedOrderRepository();
        this.productRepo = new ProductRepository();

        this.createPurchasedOrderProductUseCase = new CreatePurchasedOrderProductUseCase({
            productRepo: this.productRepo,
            purchasedOrderProductRepo: this.purchasedOrderProductRepo,
            purchasedOrderRepo: this.purchasedOrderRepo
        });
        this.updatePurchasedOrderProductUseCase = new UpdatePurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
        this.deletePurchasedOrderProductUseCase = new DeletePurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
        this.getAllPurchasedOrderProductUseCase = new GetAllPurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
        this.getByIdPurchasedOrderProductUseCase = new GetByIdPurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
        this.getByPurchasedOrderIdPurchasedOrderProductUseCase = new GetByPurchasedOrderIdPurchasedOrderProductUseCase(this.purchasedOrderProductRepo);
    };

    getAll = async (_req: ApiRequest<GetAllPurchasedOrderProduct>, res: ApiResponse<GetAllPurchasedOrderProduct>): Promise<ApiResponse<GetAllPurchasedOrderProduct>> => {
        const purchasedOrderProductResponse: PurchasedOrderProductProps[] = await this.getAllPurchasedOrderProductUseCase.execute();
        const purchasedOrderResult = purchasedOrderProductResponse.map(mapPopDomainToDto);
        return res.status(200).json(purchasedOrderResult);
    }
    getById = async (req: ApiRequest<GetByIdPurchasedOrderProduct>, res: ApiResponse<GetByIdPurchasedOrderProduct>): Promise<ApiResponse<GetByIdPurchasedOrderProduct>> => {
        const { id }: GetByIdPurchasedOrderProduct["params"] = req.params;
        const purchasedOrderProductResponse: PurchasedOrderProductProps | null = await this.getByIdPurchasedOrderProductUseCase.execute(Number(id));
        if (!purchasedOrderProductResponse) return res.status(404).json(null);
        const purchasedOrderResult = mapPopDomainToDto(purchasedOrderProductResponse);
        return res.status(200).json(purchasedOrderResult);
    }
    getByPurchasedOrderId = async (req: ApiRequest<GetByPurchasedIdPurchasedOrderProduct>, res: ApiResponse<GetByPurchasedIdPurchasedOrderProduct>): Promise<ApiResponse<GetByPurchasedIdPurchasedOrderProduct>> => {
        const { purchase_order_id }: GetByPurchasedIdPurchasedOrderProduct["params"] = req.params;
        const purchasedOrderProductResponse: PurchasedOrderProductProps[] = await this.getByPurchasedOrderIdPurchasedOrderProductUseCase.execute(Number(purchase_order_id));
        const purchasedOrderResult = purchasedOrderProductResponse.map(mapPopDomainToDto);
        return res.status(200).json(purchasedOrderResult);
    }
    create = async (req: ApiRequest<CreatePurchasedOrderProduct>, res: ApiResponse<CreatePurchasedOrderProduct>): Promise<ApiResponse<CreatePurchasedOrderProduct>> => {
        const body: CreatePurchasedOrderProduct["body"] = req.body;
        const purchasedOrderProductResponse = await this.createPurchasedOrderProductUseCase.execute(body);
        const purchasedOrderResult = mapPopDomainToDto(purchasedOrderProductResponse);

        return res.status(201).json(purchasedOrderResult);
    }
    update = async (req: ApiRequest<UpdatePurchasedOrderProduct>, res: ApiResponse<UpdatePurchasedOrderProduct>): Promise<ApiResponse<UpdatePurchasedOrderProduct>> => {
        const { id }: UpdatePurchasedOrderProduct["params"] = req.params;
        const body: UpdatePurchasedOrderProduct["body"] = req.body;
        const purchasedOrderProductResponse = await this.updatePurchasedOrderProductUseCase.execute(Number(id), body);
        const purchasedOrderResult = mapPopDomainToDto(purchasedOrderProductResponse);
        return res.status(200).json(purchasedOrderResult);
    }
    delete = async (req: ApiRequest<DeletePurchasedOrderProduct>, res: ApiResponse<DeletePurchasedOrderProduct>): Promise<ApiResponse<DeletePurchasedOrderProduct>> => {
        const { id }: DeletePurchasedOrderProduct["params"] = req.params;
        await this.deletePurchasedOrderProductUseCase.execute(Number(id));
        return res.status(200).json(null);
    }
};