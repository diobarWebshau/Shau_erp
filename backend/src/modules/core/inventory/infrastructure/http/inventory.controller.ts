import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { IInventoryRepository } from "../../domain/inventory.repository.interface";
import { InventoryRepository } from "../repository/inventory.repository";
import {
    CreateInventorySchema, DeleteInventorySchema,
    GetAllInventoryScehma, GetByIdInventoryScehma,
    UpdateInventorySchema
} from "./../../application/dto/inventory.usecases.schema";
import { GetAllInventoryUseCase } from "../../application/use-cases/get-all-inventory.usecase";
import { GetByIdInventoryUseCase } from "../../application/use-cases/get-by-id-inventory.usecase";
import { UpdateInventoryUseCase } from "../../application/use-cases/update-inventory.usecase";
import { DeleteInventoryUseCase } from "../../application/use-cases/delete-inventory.usecase";
import { CreateInventoryUseCase } from "../../application/use-cases/create-inventory.usecase";
import { inventoryResponseDto } from "../../application/dto/inventory.model.schema";

export class InventoryController {

    private readonly repo: IInventoryRepository;
    private readonly getAllInventoryUseCase: GetAllInventoryUseCase;
    private readonly getByIdInventoryUseCase: GetByIdInventoryUseCase;
    private readonly updateInventoryUseCase: UpdateInventoryUseCase;
    private readonly deleteInventoryUseCase: DeleteInventoryUseCase;
    private readonly createInventoryUseCase: CreateInventoryUseCase;

    constructor() {
        this.repo = new InventoryRepository();
        this.createInventoryUseCase = new CreateInventoryUseCase(this.repo);
        this.getByIdInventoryUseCase = new GetByIdInventoryUseCase(this.repo);
        this.getAllInventoryUseCase = new GetAllInventoryUseCase(this.repo);
        this.updateInventoryUseCase = new UpdateInventoryUseCase(this.repo);
        this.deleteInventoryUseCase = new DeleteInventoryUseCase(this.repo);
    };

    getAll = async (_req: ApiRequest<GetAllInventoryScehma>, res: ApiResponse<GetAllInventoryScehma>) => {
        const inventoryResponses: inventoryResponseDto[] = await this.getAllInventoryUseCase.execute();
        return res.status(200).json(inventoryResponses);
    }

    getById = async (req: ApiRequest<GetByIdInventoryScehma>, res: ApiResponse<GetByIdInventoryScehma>) => {
        const { id }: GetByIdInventoryScehma["params"] = req.params;
        const inventoryResponse: inventoryResponseDto | null = await this.getByIdInventoryUseCase.execute(Number(id));
        return res.status(200).json(inventoryResponse);
    }

    create = async (req: ApiRequest<CreateInventorySchema>, res: ApiResponse<CreateInventorySchema>) => {
        const body: CreateInventorySchema["body"] = req.body;
        const inventoryResponse: inventoryResponseDto = await this.createInventoryUseCase.execute(body);
        return res.status(201).json(inventoryResponse);
    }

    update = async (req: ApiRequest<UpdateInventorySchema>, res: ApiResponse<UpdateInventorySchema>) => {
        const { id }: UpdateInventorySchema["params"] = req.params;
        const body: UpdateInventorySchema["body"] = req.body;
        const inventoryResponse: inventoryResponseDto = await this.updateInventoryUseCase.execute(Number(id), body);
        return res.status(200).json(inventoryResponse);
    }

    delete = async (req: ApiRequest<DeleteInventorySchema>, res: ApiResponse<DeleteInventorySchema>) => {
        const { id }: DeleteInventorySchema["params"] = req.params;
        await this.deleteInventoryUseCase.execute(Number(id));
        return res.status(200).json(null);
    }
};

