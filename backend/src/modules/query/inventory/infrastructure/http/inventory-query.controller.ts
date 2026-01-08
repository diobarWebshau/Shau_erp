import { GetAllInventoryQuerySchema, GetAllLikeToInventoryQuerySchema, GetByIdInventoryQuerySchema } from "./../../application/dto/inventory-query.endpoint.schema"
import { GetAllLikeToInventoryQueryUseCase } from "../../application/use-cases/get-all-like-to-inventory-query.usecase";
import { GetByIdInventoryQueryUseCase } from "../../application/use-cases/get-by-id-inventory-query.usecase";
import { GetAllInventoryQueryUseCase } from "../../application/use-cases/get-all-inventory-query.usecase";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { InventoryQueryResponseDto } from "../../application/dto/inventory-query.model.schema";
import { InventoryQueryRepository } from "../repository/inventory-query.repository";
import { InventoryQueryProps } from "../../domain/inventory-query.types";

const mapInventoryQueryDomainToDto = (data: InventoryQueryProps): InventoryQueryResponseDto => {
    return ({
        ...data,
        available: data.available.toString(),
        commited: data.commited.toString(),
        stock: data.stock.toString(),
        minimum_stock: data.minimum_stock.toString(),
        maximum_stock: data.maximum_stock.toString(),
    });
};

export class InventoryQueryController {
    private readonly inventoryQueryRepo: InventoryQueryRepository;
    private readonly getAllInventoryQueryUseCase: GetAllInventoryQueryUseCase;
    private readonly getAllLikeToInventoryQueryUseCase: GetAllLikeToInventoryQueryUseCase;
    private readonly getByIdInventoryQueryUseCase: GetByIdInventoryQueryUseCase;

    constructor() {
        this.inventoryQueryRepo = new InventoryQueryRepository();
        this.getAllInventoryQueryUseCase = new GetAllInventoryQueryUseCase(this.inventoryQueryRepo);
        this.getAllLikeToInventoryQueryUseCase = new GetAllLikeToInventoryQueryUseCase(this.inventoryQueryRepo);
        this.getByIdInventoryQueryUseCase = new GetByIdInventoryQueryUseCase(this.inventoryQueryRepo);
    };

    getAll = async (_req: ApiRequest<GetAllInventoryQuerySchema>, res: ApiResponse<GetAllInventoryQuerySchema>): Promise<ApiResponse<GetAllInventoryQuerySchema>> => {
        const inventoryQueryResponses: InventoryQueryProps[] = await this.getAllInventoryQueryUseCase.execute();
        const inventoryResult: InventoryQueryResponseDto[] = await Promise.all(inventoryQueryResponses.map(mapInventoryQueryDomainToDto));
        return res.status(200).json(inventoryResult);
    }
    getAllLikeTo = async (req: ApiRequest<GetAllLikeToInventoryQuerySchema>, res: ApiResponse<GetAllLikeToInventoryQuerySchema>): Promise<ApiResponse<GetAllLikeToInventoryQuerySchema>> => {
        const query: GetAllLikeToInventoryQuerySchema["query"] = req.query;
        const inventoryQueryResponses: InventoryQueryProps[] = await this.getAllLikeToInventoryQueryUseCase.execute(query);
        const inventoryResult: InventoryQueryResponseDto[] = await Promise.all(inventoryQueryResponses.map(mapInventoryQueryDomainToDto));
        return res.status(200).json(inventoryResult);
    }
    getById = async (req: ApiRequest<GetByIdInventoryQuerySchema>, res: ApiResponse<GetByIdInventoryQuerySchema>): Promise<ApiResponse<GetByIdInventoryQuerySchema>> => {
        const { inventory_id }: GetByIdInventoryQuerySchema["params"] = req.params;
        const responseQuery: InventoryQueryProps | null = await this.getByIdInventoryQueryUseCase.execute(Number(inventory_id));
        if (!responseQuery) return res.status(204).json(null);
        const inventoryResult = await mapInventoryQueryDomainToDto(responseQuery);
        return res.status(200).json(inventoryResult);
    }
}