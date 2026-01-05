import { GetAllInventoryQuerySchema, GetAllLikeToInventoryQuerySchema, GetByIdInventoryQuerySchema } from "./../../application/dto/inventory-query.endpoint.schema"
import { GetAllLikeToInventoryQueryUseCase } from "../../application/use-cases/get-all-like-to-inventory-query.usecase";
import { GetByIdInventoryQueryUseCase } from "../../application/use-cases/get-by-id-inventory-query.usecase";
import { GetAllInventoryQueryUseCase } from "../../application/use-cases/get-all-inventory-query.usecase";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { InventoryQueryRepository } from "../repository/inventory-query.repository";
import { InventoryQueryProps } from "../../domain/inventory-query.types";

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

    getAll = async (_req: ApiRequest<GetAllInventoryQuerySchema>, res: ApiResponse<GetAllInventoryQuerySchema>) => {
        const responseQuery: InventoryQueryProps[] = await this.getAllInventoryQueryUseCase.execute();
        res.status(200).json(responseQuery);
    }
    getAllLikeTo = async (req: ApiRequest<GetAllLikeToInventoryQuerySchema>, res: ApiResponse<GetAllLikeToInventoryQuerySchema>) => {
        const query: GetAllLikeToInventoryQuerySchema["query"] = req.query;
        const responseQuery: InventoryQueryProps[] = await this.getAllLikeToInventoryQueryUseCase.execute(query);
        res.status(200).json(responseQuery);
    }
    getById = async (req: ApiRequest<GetByIdInventoryQuerySchema>, res: ApiResponse<GetByIdInventoryQuerySchema>) => {
        const { inventory_id }: GetByIdInventoryQuerySchema["params"] = req.params;
        const responseQuery: InventoryQueryProps | null = await this.getByIdInventoryQueryUseCase.execute(Number(inventory_id));
        res.status(200).json(responseQuery);
    }
}